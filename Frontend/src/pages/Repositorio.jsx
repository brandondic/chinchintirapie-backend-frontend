import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import { REPO_ITEMS } from '../data/repositorioData';
import '../styles/Repositorio.css';

export default function Repositorio() {
  const [search, setSearch] = useState('');
  useReveal();

  const filtered = REPO_ITEMS.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.type.toLowerCase().includes(search.toLowerCase())
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
          {filtered.map(({ id, emoji, title, type, year, count }) => (
            <Link to={`/repositorio/${id}`} key={id} className="repositorio-link-reset">
              <div className="media-card reveal">
                <div className="media-thumb">
                  <span>{emoji}</span>
                  <div className="play-icon">▶</div>
                </div>
                <div className="media-info">
                  <span className="media-tag">{type}</span>
                  <h4>{title}</h4>
                  <p>{year} · {count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
