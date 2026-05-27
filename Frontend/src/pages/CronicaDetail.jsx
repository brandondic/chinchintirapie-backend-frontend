import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import articuloService from '../services/articuloService';
import PageHero from '../components/PageHero';
import '../styles/CronicaDetail.css';

export default function CronicaDetail() {
  const { id } = useParams();
  const [cronica, setCronica] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCronica = async () => {
      try {
        const data = await articuloService.fetchById(id);
        setCronica(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCronica();
  }, [id]);

  if (loading) {
    return (
      <div className="cronica-detail__not-found">
        <h2>Cargando...</h2>
      </div>
    );
  }

  if (error || !cronica) {
    return (
      <div className="cronica-detail__not-found">
        <h2>Crónica no encontrada</h2>
        <p>{error}</p>
        <Link to="/cronicas" className="cronica-detail__back-link">
          ← Volver a Crónicas
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        badge="📰 Crónica"
        title={cronica.title}
        description={`Por ${cronica.author} | ${cronica.createdAt ? new Date(cronica.createdAt).toLocaleDateString() : ''}`}
      />

      <div className="cronica-detail__container">
        <Link to="/cronicas" className="cronica-detail__back-link">
          ← Volver a Crónicas
        </Link>

        <div className="cronica-detail__card">
          <div className="cronica-detail__emoji">📰</div>

          <div className="cronica-detail__tags">
              <span className="cronica-detail__tag">Crónica</span>
          </div>

          <div className="cronica-detail__content">
            <p>{cronica.body}</p>
          </div>
        </div>
      </div>
    </>
  );
}