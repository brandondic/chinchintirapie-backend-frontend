import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import MediaThumbnail from '../components/MediaThumbnail';
import multimediaService from '../services/multimediaService';
import '../styles/MaterialEducativo.css';

export default function MaterialEducativo() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useReveal([items, loading, search, selectedCategory]);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const data = await multimediaService.fetchByType('MATERIAL_EDUCATIVO');
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
    fetchMaterial();
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
      <Ticker text="📚 Material Educativo · Guías · Manuales · Cuadernos · Para todos los niveles" />
      <PageHero badge="📚 Recursos Pedagógicos" title="Material Educativo" description="Guías, manuales, partituras y cuadernos pedagógicos desarrollados por la escuela para compartir el saber carnavalero." />

      <div className="material-controls-wrap">
        <div className="material-controls">
          <div className="material-search-bar">
            <input
              type="text"
              placeholder="Buscar material educativo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>🔍 Buscar</button>
          </div>
          {categories.length > 0 && (
            <div className="material-categories">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`mat-cat-pill${selectedCategory === c ? ' selected' : ''}`}
                  onClick={() => setSelectedCategory(selectedCategory === c ? null : c)}
                >
                  {c}
                </button>
              ))}
              {selectedCategory && (
                <button
                  type="button"
                  className="mat-cat-pill mat-cat-clear"
                  onClick={() => setSelectedCategory(null)}
                >
                  ✕ Limpiar
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="material-section">
        <div className="material-grid">
          {loading && <p>Cargando material...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && filtered.length === 0 && <p>No hay material educativo disponible.</p>}
          {!loading && !error && filtered.map((item) => (
            <Link to={`/material-educativo/${item.id}`} key={item.id} className="material-link">
              <article className="edu-card reveal">
                <div className="edu-card-top" style={item.url ? { padding: 0, overflow: 'hidden', background: 'transparent' } : {}}>
                  <MediaThumbnail url={item.url} thumbnailUrl={item.thumbnailUrl} alt={item.title} typeEmoji="✏️" />
                </div>
                <div className="edu-card-body">
                  <span className="media-tag">Material Educativo</span>
                  <h3>{item.title}</h3>
                  {item.categories && item.categories.length > 0 && (
                    <div className="edu-card-cats">
                      {item.categories.map((cat) => (
                        <span key={cat} className="media-cat-badge">{cat}</span>
                      ))}
                    </div>
                  )}
                  <p className="edu-card-meta">
                    {item.author && `Por ${item.author}`}
                    {item.year && ` · ${item.year}`}
                  </p>
                  <button type="button" className="download-btn material-download-btn">⬇ Ver Detalles</button>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

