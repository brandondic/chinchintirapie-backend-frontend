import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import multimediaService from '../services/multimediaService';
import PageHero from '../components/PageHero';
import '../styles/MaterialEducativoDetail.css';

export default function MaterialEducativoDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return (
    <div className="page-empty">
      <h2>Cargando...</h2>
    </div>
  );

  if (error || !item) return (
    <div className="page-empty">
      <h2>Material no encontrado</h2>
      <p>{error}</p>
      <Link to="/material-educativo" className="back-link">Volver</Link>
    </div>
  );

  return (
    <>
      <PageHero badge="📚 Material Educativo" title={item.title} description={item.author ? `Por ${item.author}` : ''} />
      <div className="educativo-detail">
        <Link to="/material-educativo" className="back-link">← Volver a Material Educativo</Link>
        <div className="educativo-card">
          <div className="educativo-icon" style={item.thumbnailUrl || item.url ? { background: 'transparent', overflow: 'hidden' } : {}}>
            {item.thumbnailUrl ? (
              <img src={item.thumbnailUrl} alt={item.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px' }} />
            ) : item.url && (item.url.includes('youtube.com/embed/')) ? (
              <iframe src={item.url} style={{ width: '100%', height: '400px', borderRadius: '12px', border: 'none' }} allowFullScreen title={item.title} />
            ) : item.url && (item.url.includes('youtube.com/watch?v=') || item.url.includes('youtu.be/')) ? (
              <iframe src={item.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} style={{ width: '100%', height: '400px', borderRadius: '12px', border: 'none' }} allowFullScreen title={item.title} />
            ) : item.url && (item.url.toLowerCase().endsWith('.jpg') || item.url.toLowerCase().endsWith('.png')) ? (
              <img src={item.url} alt={item.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px' }} />
            ) : (
              "📚"
            )}
          </div>
          <h3 className="educativo-title">{item.title}</h3>
          <p className="educativo-copy">{item.description || 'Este material es de libre distribución para fines pedagógicos.'}</p>
          {item.url && (
            <div style={{ marginTop: '20px', marginBottom: '10px' }}>
              <a href={item.url} target="_blank" rel="noreferrer" className="download-btn download-btn--solid" style={{ textDecoration: 'none', display: 'inline-block', background: 'var(--naranja)', color: 'white', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
                {item.url.includes('youtube') || item.url.includes('youtu.be') ? '🎥 Ver Video' : '⬇ Leer / Descargar Archivo'}
              </a>
            </div>
          )}
          <p style={{ color: '#999', fontSize: '.9rem' }}>
            {item.author && `Por ${item.author}`}
            {item.uploadedAt && ` · ${new Date(item.uploadedAt).toLocaleDateString()}`}
          </p>
        </div>
      </div>
    </>
  );
}
