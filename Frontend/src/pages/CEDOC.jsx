import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';

import { Link } from 'react-router-dom';
import { ARTICLES, TIMELINE, DOWNLOADS, TOPICS, FILTERS, STATS } from '../data/cedocData';
import '../styles/Cedoc.css';


export default function CEDOC() {
  const [activeFilter, setActiveFilter] = useState('all');
  useReveal();

  const visibleArticles = activeFilter === 'all'
    ? ARTICLES
    : ARTICLES.filter((a) => a.tags.some((t) => t.toLowerCase() === activeFilter));

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

      {/* Filtros */}
      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-tab${activeFilter === f ? ' active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f === 'all' ? 'Todos' : f === 'banda' ? '🎺 Banda' : f === 'baile' ? '💃 Baile'
              : f === 'figura' ? '🎭 Figura' : f === 'historia' ? '📜 Historia' : '🏘️ Comunidad'}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <main>
        <div className="cedoc-layout">
          {/* Artículos */}
          <div className="cedoc-main">
            <section>
              <h2>✦ Artículos Destacados</h2>
              {visibleArticles.filter((a) => a.status === 'published').map((a) => (
                <Link to={`/cedoc/${a.id}`} key={a.id} className="link-reset">
                  <div className="article-card reveal">
                    <div className="article-icon" style={a.iconStyle}>{a.icon}</div>
                    <div className="article-body">
                      <h3>{a.title}</h3>
                      <p>{a.desc}</p>
                      <div className="article-meta">
                        {a.tags.map((t) => <span className="meta-tag" key={t}>{t}</span>)}
                      </div>
                      <button type="button" className="download-btn">⬇ Ver artículo completo</button>
                    </div>
                  </div>
                </Link>
              ))}
            </section>

            <section>
              <h2>🔬 Investigaciones en Curso</h2>
              {visibleArticles.filter((a) => a.status === 'in-progress').map((a) => (
                <Link to={`/cedoc/${a.id}`} key={a.id} className="link-reset">
                  <div className="article-card reveal">
                    <div className="article-icon" style={a.iconStyle}>{a.icon}</div>
                    <div className="article-body">
                      <h3>{a.title}</h3>
                      <p>{a.desc}</p>
                      <div className="article-meta">
                        {a.tags.map((t) => <span className="meta-tag" key={t}>{t}</span>)}
                      </div>
                      <button type="button" className="download-btn download-btn--gold">👁 Ver avance completo</button>
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="cedoc-sidebar">
            <div className="sidebar-widget reveal">
              <h3>⏳ Línea de Tiempo</h3>
              <div className="timeline">
                {TIMELINE.map(({ year, text }) => (
                  <div className="timeline-item" key={year}>
                    <div className="timeline-year">{year}</div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>

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
