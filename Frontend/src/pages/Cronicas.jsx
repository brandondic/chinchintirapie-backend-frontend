import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import { CRONICAS } from '../data/cronicasData';
import '../styles/Cronica.css';

export default function Cronicas() {
  useReveal();
  return (
    <>
      <Ticker text="📰 Crónicas · Relatos vivos · Historia contada desde adentro · Escuela Carnavalera" />
      <PageHero badge="📰 Periodismo Carnavalero" title="Crónicas" description="Relatos, entrevistas y notas que cuentan la historia viva de la escuela y sus protagonistas en las calles." />

      <section className="cronicas-section">
        <div className="cronicas-list">
          {CRONICAS.map(({ id, emoji, date, title, body, author, tags }) => (
            <Link to={`/cronicas/${id}`} key={id} className="cronica-link">
              <article className="cronica-card reveal">
                <div className="cronica-emoji">{emoji}</div>
                <div>
                  <p className="cronica-date">{date}</p>
                  <h3>{title}</h3>
                  <p className="cronica-body">{body}</p>
                  <div className="cronica-footer">
                    <div className="cronica-tags">
                      {tags.map((t) => <span key={t} className="meta-tag">{t}</span>)}
                    </div>
                    <span className="cronica-author">Por {author}</span>
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
