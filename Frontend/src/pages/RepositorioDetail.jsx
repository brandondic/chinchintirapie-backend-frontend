import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import multimediaService from '../services/multimediaService';
import PageHero from '../components/PageHero';
import '../styles/RepositorioDetail.css';

export default function RepositorioDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await multimediaService.fetchById(id);
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="repo-detail-empty">
        <h2>Cargando...</h2>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="repo-detail-empty">
        <h2>Archivo no encontrado</h2>
        <p>{error}</p>
        <Link to="/repositorio" className="repo-detail-back-link">
          Volver
        </Link>
      </div>
    );
  }

  const gallery = item.galleryUrls || [];
  const hasGallery = gallery.length > 0;
  // Detectar si la URL principal es solo el fallback de la galería
  const isGalleryOnly = hasGallery && item.url === gallery[0];

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  const nextImage = () => setLightboxIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));

  return (
    <>
      <PageHero
        badge="📂 Repositorio"
        title={item.title}
        description={`${item.year || ''} · Por ${item.author || 'Desconocido'}`}
      />

      <div className="repo-detail-wrap">
        <Link to="/repositorio" className="repo-detail-back-link repo-detail-back-link--top">
          ← Volver al Repositorio
        </Link>

        <div className="repo-detail-preview">
          {!isGalleryOnly && item.url ? (
            item.url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video controls src={item.url} style={{ width: '100%', maxHeight: '500px', borderRadius: '16px', marginBottom: '1.5rem', background: '#000' }} />
            ) : item.url.includes('youtube.com/embed/') ? (
              <iframe src={item.url} style={{ width: '100%', height: '400px', borderRadius: '16px', marginBottom: '1.5rem', border: 'none' }} allowFullScreen title={item.title} />
            ) : item.url.includes('youtube.com/watch?v=') || item.url.includes('youtu.be/') ? (
              <iframe src={item.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} style={{ width: '100%', height: '400px', borderRadius: '16px', marginBottom: '1.5rem', border: 'none' }} allowFullScreen title={item.title} />
            ) : item.url.toLowerCase().endsWith('.pdf') || item.url.toLowerCase().includes('.doc') ? (
              item.thumbnailUrl ? (
                <img src={item.thumbnailUrl} alt={item.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem' }} />
              ) : (
                <div className="repo-detail-emoji" style={{ marginBottom: '1.5rem' }}>📄</div>
              )
            ) : (
              <img src={item.thumbnailUrl || item.url} alt={item.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem' }} />
            )
          ) : (
            !hasGallery && <div className="repo-detail-emoji">📂</div>
          )}
          
          <h3>{item.title}</h3>
          <p className="repo-detail-text">
            {item.description || 'El archivo se encuentra en los registros históricos del repositorio.'}
          </p>
          

          <p style={{ color: '#999', fontSize: '.9rem', marginTop: '.5rem' }}>
            {item.author && `Por ${item.author}`}
            {item.uploadedAt && ` · ${new Date(item.uploadedAt).toLocaleDateString()}`}
          </p>
        </div>

        {/* ── Galería de Imágenes ── */}
        {hasGallery && (
          <div className="repo-gallery-section">

            <div className="repo-gallery-grid">
              {gallery.map((url, idx) => (
                <button key={idx} type="button" className="repo-gallery-item" onClick={() => openLightbox(idx)}>
                  <img src={url} alt={`${item.title} - Foto ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <div className="repo-lightbox-overlay" onClick={closeLightbox}>
          <div className="repo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="repo-lightbox-close" onClick={closeLightbox}>✕</button>
            {gallery.length > 1 && (
              <button className="repo-lightbox-nav repo-lightbox-prev" onClick={prevImage}>‹</button>
            )}
            <img src={gallery[lightboxIdx]} alt={`${item.title} - Foto ${lightboxIdx + 1}`} className="repo-lightbox-img" />
            {gallery.length > 1 && (
              <button className="repo-lightbox-nav repo-lightbox-next" onClick={nextImage}>›</button>
            )}
            <p className="repo-lightbox-counter">{lightboxIdx + 1} / {gallery.length}</p>
          </div>
        </div>
      )}
    </>
  );
}