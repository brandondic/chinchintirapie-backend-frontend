import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import { Link } from 'react-router-dom';
import MediaThumbnail from '../components/MediaThumbnail';
import multimediaService from '../services/multimediaService';
import { TIMELINE, DOWNLOADS, TOPICS, STATS } from '../data/cedocData';
import '../styles/Cedoc.css';


export default function CEDOC() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useReveal([articles]);

  useEffect(() => {
    const fetchCedoc = async () => {
      try {
        const data = await multimediaService.fetchByType('CEDOC');
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCedoc();
  }, []);

  return (
    <>
      <Ticker text="📚 Centro de Documentación e Investigación · Ensayos · Investigaciones culturales · Documentos descargables" />

      <PageHero
        badge="📚 Investigación & Documentación"
        titleEm="CEDOC"
        title="Carnavalero"
        description="Centro de documentación e investigación sobre banda, baile y figura. Ensayos, investigaciones y reflexiones culturales."
      />

      {/* Stats */}
      <div className="stats-strip">
        {STATS.map(({ num, label }) => (
          <div className="strip-stat" key={label}>
            <span className="s-num">{num}</span>
            <span className="s-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <main>
        <div className="cedoc-layout">
          {/* Artículos */}
          <div className="cedoc-main">
            <section>
              <h2>✦ Artículos Destacados</h2>
              {loading && <p>Cargando artículos...</p>}
              {error && <p className="error">{error}</p>}
              {!loading && !error && articles.length === 0 && <p>No hay artículos disponibles.</p>}
              {!loading && !error && articles.map((a) => (
                <Link to={`/cedoc/${a.id}`} key={a.id} className="link-reset">
                  <div className="article-card reveal">
                    <div className="article-icon" style={a.url ? { padding: 0, overflow: 'hidden', background: 'transparent', borderRadius: '12px' } : { background: 'linear-gradient(135deg, var(--purpura), var(--azul))' }}>
                      <MediaThumbnail url={a.url} thumbnailUrl={a.thumbnailUrl} alt={a.title} typeEmoji="📚" />
                    </div>
                    <div className="article-body">
                      <h3>{a.title}</h3>
                      <p>{a.description}</p>
                      <div className="article-meta">
                        {a.categories && a.categories.map((t) => <span className="meta-tag" key={t}>{t}</span>)}
                        <span className="meta-tag">CEDOC</span>
                      </div>
                      <button type="button" className="download-btn">⬇ Ver artículo completo</button>
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="cedoc-sidebar">
            <div className="sidebar-widget reveal">
              <h3>📄 Descargas Rápidas</h3>
              <div className="download-list">
                {DOWNLOADS.map(({ emoji, label, size, gold }) => (
                  <button key={label} type="button" className={`download-btn${gold ? ' download-btn--gold' : ''}`}>
                    <span>{emoji} {label}</span>
                    <span className="download-meta">{size}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-widget reveal">
              <h3>🏷 Temas de Investigación</h3>
              <div className="tag-row">
                {TOPICS.map((t) => (
                  <span key={t} className="meta-tag topic-pill">{t}</span>
                ))}
              </div>
            </div>

            <div className="sidebar-widget reveal sidebar-widget--dark">
              <h3>✉ Envía tu Investigación</h3>
              <p>
                ¿Tienes una investigación sobre carnaval y cultura popular? El CEDOC recibe colaboraciones externas.
              </p>
              <a href="mailto:chinchintirapie@gmail.com" className="download-btn download-btn--solid">
                📨 Enviar propuesta
              </a>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
