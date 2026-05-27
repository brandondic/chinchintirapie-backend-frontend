import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import articuloService from '../services/articuloService';
import '../styles/Cronica.css';

export default function Cronicas() {
  useReveal();
  const [cronicas, setCronicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            <Link to={`/cronicas/${c.id}`} key={c.id} className="cronica-link">
              <article className="cronica-card reveal">
                <div className="cronica-emoji">📰</div>
                <div>
                  <p className="cronica-date">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}
                  </p>
                  <h3>{c.title}</h3>
                  <p className="cronica-body">{c.description || c.body.substring(0, 100) + '...'}</p>
                  <div className="cronica-footer">
                    <div className="cronica-tags">
                      <span className="meta-tag">Crónica</span>
                    </div>
                    <span className="cronica-author">Por {c.author}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
