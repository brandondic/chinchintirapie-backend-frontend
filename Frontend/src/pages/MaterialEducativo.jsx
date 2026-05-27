import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import { EDU_ITEMS } from '../data/educativoData';
import '../styles/MaterialEducativo.css';

export default function MaterialEducativo() {
  useReveal();
  return (
    <>
      <Ticker text="📚 Material Educativo · Guías · Manuales · Cuadernos · Para todos los niveles" />
      <PageHero badge="📚 Recursos Pedagógicos" title="Material Educativo" description="Guías, manuales, partituras y cuadernos pedagógicos desarrollados por la escuela para compartir el saber carnavalero." />
      <section className="material-section">
        <div className="material-grid">
          {EDU_ITEMS.map(({ id, emoji, title, type, level, pages }) => (
            <Link to={`/material-educativo/${id}`} key={id} className="material-link">
              <article className="edu-card reveal">
                <div className="edu-card-top">{emoji}</div>
                <div className="edu-card-body">
                  <span className="media-tag">{type}</span>
                  <h3>{title}</h3>
                  <p className="edu-card-meta">Nivel: {level} · {pages}</p>
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
