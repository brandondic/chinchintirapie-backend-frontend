import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import { Link, useNavigate } from 'react-router-dom';
import MediaThumbnail from '../components/MediaThumbnail';
import multimediaService from '../services/multimediaService';
import { DOWNLOADS, TOPICS, STATS } from '../data/cedocData';
import '../styles/Cedoc.css';


export default function CEDOC() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const showQuickDownloads = false; // cambiar a true si se reutiliza pronto
  const navigate = useNavigate();
  useReveal([articles, loading, searchTerm, selectedCategory]);

  useEffect(() => {
    const fetchCedoc = async () => {
      try {
        const data = await multimediaService.fetchByType('CEDOC');
        setArticles(data);
        // Extraer categorías únicas de los artículos devueltos
        const uniqueCategories = Array.from(new Set(data.flatMap(a => a.categories || []))).sort();
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCedoc();
  }, []);

  // Filtrado client-side: búsqueda + categoría (AND lógico)
  const filteredArticles = articles.filter((a) => {
    const hayBusqueda = searchTerm && searchTerm.trim() !== '';
    const text = `${a.title || ''} ${a.description || ''} ${(a.categories || []).join(' ')}`.toLowerCase();
    const matchesSearch = !hayBusqueda || text.includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || (a.categories && a.categories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

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
              <div className="cedoc-controls reveal">
                <input
                  type="search"
                  placeholder="Buscar en CEDOC por título o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="cedoc-search"
                />
                {categories.length > 0 && (
                  <div className="cedoc-categories">
                    {categories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`meta-tag topic-pill${selectedCategory === c ? ' selected' : ''}`}
                        onClick={() => setSelectedCategory(selectedCategory === c ? null : c)}
                      >
                        {c}
                      </button>
                    ))}
                    {selectedCategory && (
                      <button
                        type="button"
                        className="meta-tag topic-pill topic-clear"
                        onClick={() => setSelectedCategory(null)}
                      >
                        ✕ Limpiar
                      </button>
                    )}
                  </div>
                )}
              </div>
              <h2>✦ Artículos Destacados</h2>
              {loading && <p>Cargando artículos...</p>}
              {error && <p className="error">{error}</p>}
              {!loading && !error && articles.length === 0 && <p>No hay artículos disponibles.</p>}
              {!loading && !error && filteredArticles.map((a) => (
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
            {showQuickDownloads && (
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
            )}

            {/* Widget 'Temas de Investigación' removido a petición */}

            <div className="sidebar-widget reveal sidebar-widget--dark">
              <h3>✉ Envía tu Investigación</h3>
              <p>
                ¿Tienes una investigación sobre carnaval y cultura popular? El CEDOC recibe colaboraciones externas.
              </p>
              <button type="button" className="download-btn download-btn--solid" onClick={() => navigate('/contacto')}>
                📨 Enviar propuesta
              </button>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
