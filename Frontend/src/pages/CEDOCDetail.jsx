import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import multimediaService from '../services/multimediaService';
import '../styles/CedocDetail.css';

export default function CEDOCDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await multimediaService.fetchById(id);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return (
    <div className="cd-empty">
      <span className="cd-empty__icon">🥁</span>
      <p>Cargando documento...</p>
    </div>
  );

  if (error || !article) return (
    <div className="cd-empty">
      <span className="cd-empty__icon">🎭</span>
      <h2>Documento no encontrado</h2>
      <p>{error}</p>
      <Link to="/cedoc" className="cd-back">← Volver al CEDOC</Link>
    </div>
  );

  const esVideo = article.url && (article.url.includes('youtube') || article.url.includes('youtu.be'));
  const esPDF   = article.url && !esVideo;

  const fecha = article.uploadedAt
    ? new Date(article.uploadedAt).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div className="cd-root">

      {/* ── SIDEBAR ── */}
      <aside className="cd-sidebar">

        <Link to="/cedoc" className="cd-back">← Volver al CEDOC</Link>

        {/* Thumbnail */}
        <div className="cd-thumb">
          {article.thumbnailUrl
            ? <img src={article.thumbnailUrl} alt={article.title} />
            : <span className="cd-thumb__placeholder">📚</span>
          }
        </div>

        {/* Badge */}
        <div className="cd-badge">CEDOC</div>

        {/* Título */}
        <h1 className="cd-title">{article.title}</h1>

        {/* Meta */}
        {(article.author || fecha) && (
          <p className="cd-meta">
            {article.author && <span>Por <strong>{article.author}</strong></span>}
            {article.author && fecha && ' · '}
            {fecha && <span>{fecha}</span>}
          </p>
        )}

        {/* Descripción */}
        {article.description && (
          <p className="cd-description">{article.description}</p>
        )}

        {/* Categorías */}
        {article.categories && article.categories.length > 0 && (
          <div className="cd-tags">
            {article.categories.map(t => (
              <span key={t} className="cd-tag">{t}</span>
            ))}
          </div>
        )}

        {/* Acciones */}
        {article.url && (
          <div className="cd-actions">
            {esPDF && (
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="cd-btn cd-btn--download"
              >
                ⬇ Descargar PDF
              </a>
            )}
            {esVideo && (
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="cd-btn cd-btn--video"
              >
                🎥 Ver video
              </a>
            )}
          </div>
        )}
      </aside>

      {/* ── VIEWER ── */}
      <main className="cd-viewer">
        {esPDF ? (
          <iframe
            src={article.url}
            title={article.title}
            className="cd-iframe"
          />
        ) : esVideo ? (
          <div className="cd-video-wrap">
            <iframe
              src={article.url
                .replace('watch?v=', 'embed/')
                .replace('youtu.be/', 'www.youtube.com/embed/')}
              title={article.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="cd-iframe"
            />
          </div>
        ) : (
          <div className="cd-no-preview">
            <span>📄</span>
            <p>Sin previsualización disponible</p>
          </div>
        )}
      </main>

    </div>
  );
}