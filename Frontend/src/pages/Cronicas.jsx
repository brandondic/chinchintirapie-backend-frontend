import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import MediaThumbnail from '../components/MediaThumbnail';
import articuloService from '../services/articuloService';
import '../styles/Cronica.css';

export default function Cronicas() {
  const [cronicas, setCronicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useReveal([cronicas, loading]);

  useEffect(() => {
    const fetchCronicas = async () => {
      try {
        const data = await articuloService.fetchByType('CRONICA');
        setCronicas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCronicas();
  }, []);

  return (
    <>
      <Ticker text="📰 Crónicas · Relatos vivos · Historia contada desde adentro · Escuela Carnavalera" />
      <PageHero badge="📰 Periodismo Carnavalero" title="Crónicas" description="Relatos, entrevistas y notas que cuentan la historia viva de la escuela y sus protagonistas en las calles." />

      <section className="cronicas-section">
        <div className="cronicas-list">
          {loading && <p>Cargando crónicas...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && cronicas.length === 0 && <p>No hay crónicas disponibles.</p>}
          {!loading && !error && cronicas.map((c) => (
            <article key={c.id} className="cronica-card reveal">
              <div className="cronica-card-media" style={c.urlPhoto ? { padding: 0, overflow: 'hidden' } : {}}>
                <MediaThumbnail url={c.urlPhoto} alt={c.title} typeEmoji="📰" />
              </div>
              <div className="cronica-card-body">
                <span className="cronica-card-tag">Crónica</span>
                <h3>{c.title}</h3>
                <p>{c.description || (c.body ? c.body.substring(0, 100) + '...' : '')}</p>
                <Link to={`/cronicas/${c.id}`} className="link-reset">
                  <button>Ver crónica</button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
