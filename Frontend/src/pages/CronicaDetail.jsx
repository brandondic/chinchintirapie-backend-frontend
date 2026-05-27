import { useParams, Link } from 'react-router-dom';
import { CRONICAS } from '../data/cronicasData';
import PageHero from '../components/PageHero';
import '../styles/CronicaDetail.css';

export default function CronicaDetail() {
  const { id } = useParams();
  const cronica = CRONICAS.find((c) => c.id === id);

  if (!cronica) {
    return (
      <div className="cronica-detail__not-found">
        <h2>Crónica no encontrada</h2>
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
        description={`Por ${cronica.author} | ${cronica.date}`}
      />

      <div className="cronica-detail__container">
        <Link to="/cronicas" className="cronica-detail__back-link">
          ← Volver a Crónicas
        </Link>

        <div className="cronica-detail__card">
          <div className="cronica-detail__emoji">{cronica.emoji}</div>

          <div className="cronica-detail__tags">
            {cronica.tags.map((t) => (
              <span key={t} className="cronica-detail__tag">
                {t}
              </span>
            ))}
          </div>

          <div className="cronica-detail__content">
            <p>{cronica.body}</p>
          </div>
        </div>
      </div>
    </>
  );
}