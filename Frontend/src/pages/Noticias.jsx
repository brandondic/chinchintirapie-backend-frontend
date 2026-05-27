import { useState } from 'react';
import Ticker from '../components/Ticker';
import { Link } from 'react-router-dom';
import { NEWS_ITEMS } from '../data/noticiasData';
import '../styles/Noticias.css';

const CAROUSEL_SLIDES = [
  { src: '/img/img1.webp', caption: 'Homenaje Victor Jara' },
  { src: '/img/img2.webp', caption: 'Conmemoración Hermanos Vergara Toledo' },
  { src: '/img/img3.webp', caption: 'Aniversario Violeta Parra' },
];

const CATEGORIES = ['Todas', 'Carnaval', 'Audiovisual', 'Talleres', 'Pedagogía', 'Eventos', 'Archivo'];

export default function Noticias() {
  const [slide, setSlide] = useState(0);
  const [filter, setFilter] = useState('Todas');

  const filtered = filter === 'Todas'
    ? NEWS_ITEMS
    : NEWS_ITEMS.filter((n) => n.category.toLowerCase() === filter.toLowerCase());

  return (
    <>
      <Ticker text="📰 Hitos Recientes · Carnaval · Talleres · Audiovisual · Archivo · Comunidad" />

      <div className="noticias-header">
        <div>
          <h1>Hitos Recientes</h1>
          <p>Actividades, encuentros y memoria viva de la Escuela Carnavalera.</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="noticias-filter"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="noticias-carousel">
        <img
          src={CAROUSEL_SLIDES[slide].src}
          alt={CAROUSEL_SLIDES[slide].caption}
        />
        <div className="noticias-carousel-overlay">
          <h2>{CAROUSEL_SLIDES[slide].caption}</h2>
        </div>
        <button
          onClick={() => setSlide((s) => (s - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)}
          className="noticias-carousel-button left"
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          onClick={() => setSlide((s) => (s + 1) % CAROUSEL_SLIDES.length)}
          className="noticias-carousel-button right"
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>

      <section className="noticias-grid">
        <div className="noticias-grid-inner">
          {filtered.map((item) => (
            <article key={item.title} className="noticias-card">
              {item.video ? (
                <video autoPlay muted loop playsInline className="noticias-card-media">
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : (
                <img src={item.img} alt={item.title} className="noticias-card-media" loading="lazy" />
              )}
              <div className="noticias-card-body">
                <span className="noticias-card-tag">{item.category}</span>
                <h3>{item.title}</h3>
                {item.desc && <p>{item.desc}</p>}
                <Link to={`/noticias/${item.id}`} className="link-reset">
                  <button>Ver noticia</button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
