import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import MediaThumbnail from '../components/MediaThumbnail';
import multimediaService from '../services/multimediaService';
import '../styles/Repositorio.css';

export default function Repositorio() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useReveal([items, loading, search, selectedCategory]);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const data = await multimediaService.fetchByType('REPOSITORIO');
        setItems(data);
        // Extraer categorías únicas de los items devueltos
        const uniqueCategories = Array.from(new Set(data.flatMap(i => i.categories || []))).sort();
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, []);

  const filtered = items.filter((i) => {
    const hayBusqueda = search && search.trim() !== '';
    const text = `${i.title || ''} ${i.description || ''} ${(i.categories || []).join(' ')}`.toLowerCase();
    const matchesSearch = !hayBusqueda || text.includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || (i.categories && i.categories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Ticker text="📂 Repositorio Documental · Fotografías · Videos · Audios · Documentos históricos" />
      <PageHero badge="📂 Archivo Digital" title="Repositorio Documental" description="Fotografías, audiovisuales y documentos de todas las ediciones del carnaval, desde los primeros ensayos hasta los últimos desfiles." />
      <div className="search-bar-wrap">
        <div className="repo-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar en el repositorio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>🔍 Buscar</button>
          </div>
          {categories.length > 0 && (
            <div className="repo-categories">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`repo-cat-pill${selectedCategory === c ? ' selected' : ''}`}
                  onClick={() => setSelectedCategory(selectedCategory === c ? null : c)}
                >
                  {c}
                </button>
              ))}
              {selectedCategory && (
                <button
                  type="button"
                  className="repo-cat-pill repo-cat-clear"
                  onClick={() => setSelectedCategory(null)}
                >
                  ✕ Limpiar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <section className="repositorio-section">
        <div className="media-grid repositorio-media-grid">
          {loading && <p>Cargando repositorio...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && filtered.length === 0 && <p>No hay archivos disponibles.</p>}
          {!loading && !error && filtered.map((item) => (
            <Link to={`/repositorio/${item.id}`} key={item.id} className="repositorio-link-reset">
              <div className="media-card reveal">
                <div className="media-thumb" style={item.url ? { padding: 0, overflow: 'hidden', background: 'transparent' } : {}}>
                  <MediaThumbnail url={item.url} thumbnailUrl={item.thumbnailUrl} alt={item.title} typeEmoji="📂" />
                </div>
                <div className="media-info">
                  <span className="media-tag">Repositorio</span>
                  <h4>{item.title}</h4>
                  {item.categories && item.categories.length > 0 && (
                    <div className="media-categories">
                      {item.categories.map((cat) => (
                        <span key={cat} className="media-cat-badge">{cat}</span>
                      ))}
                    </div>
                  )}
                  <p>
                    {item.year && `${item.year} · `}
                    {item.author && `Por ${item.author}`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

