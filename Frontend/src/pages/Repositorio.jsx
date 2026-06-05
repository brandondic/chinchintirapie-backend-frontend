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
  useReveal([items, loading, search]);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const data = await multimediaService.fetchByType('REPOSITORIO');
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, []);

  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Ticker text="📂 Repositorio Documental · Fotografías · Videos · Audios · Documentos históricos" />
      <PageHero badge="📂 Archivo Digital" title="Repositorio Documental" description="Fotografías, audiovisuales y documentos de todas las ediciones del carnaval, desde los primeros ensayos hasta los últimos desfiles." />
      <div className="search-bar-wrap">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar en el repositorio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍 Buscar</button>
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
