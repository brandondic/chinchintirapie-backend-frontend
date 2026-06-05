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
  useReveal([items, loading]);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const data = await multimediaService.fetchByType('MATERIAL_EDUCATIVO');
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterial();
  }, []);

  return (
    <>
      <Ticker text="📚 Material Educativo · Guías · Manuales · Cuadernos · Para todos los niveles" />
      <PageHero badge="📚 Recursos Pedagógicos" title="Material Educativo" description="Guías, manuales, partituras y cuadernos pedagógicos desarrollados por la escuela para compartir el saber carnavalero." />
      <section className="material-section">
        <div className="material-grid">
          {loading && <p>Cargando material...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && items.length === 0 && <p>No hay material educativo disponible.</p>}
          {!loading && !error && items.map((item) => (
            <Link to={`/material-educativo/${item.id}`} key={item.id} className="material-link">
              <article className="edu-card reveal">
                <div className="edu-card-top" style={item.url ? { padding: 0, overflow: 'hidden', background: 'transparent' } : {}}>
                  <MediaThumbnail url={item.url} thumbnailUrl={item.thumbnailUrl} alt={item.title} typeEmoji="✏️" />
                </div>
                <div className="edu-card-body">
                  <span className="media-tag">Material Educativo</span>
                  <h3>{item.title}</h3>
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
