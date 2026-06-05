import { useState, useEffect } from 'react';
import Ticker from '../components/Ticker';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import MediaThumbnail from '../components/MediaThumbnail';
import articuloService from '../services/articuloService';
import '../styles/Noticias.css';

const CAROUSEL_SLIDES = [
  { src: '/img/img1.webp', caption: 'Homenaje Victor Jara' },
  { src: '/img/img2.webp', caption: 'Conmemoración Hermanos Vergara Toledo' },
  { src: '/img/img3.webp', caption: 'Aniversario Violeta Parra' },
];

export default function Noticias() {
  const [slide, setSlide] = useState(0);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useReveal([noticias, loading]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const data = await articuloService.fetchByType('NOTICIA');
        setNoticias(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticias();
  }, []);

  return (
    <>
      <Ticker text="📰 Hitos Recientes · Carnaval · Talleres · Audiovisual · Archivo · Comunidad" />

      <div className="noticias-header">
        <div>
          <h1>Hitos Recientes</h1>
          <p>Actividades, encuentros y memoria viva de la Escuela Carnavalera.</p>
        </div>
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
          {loading && <p>Cargando noticias...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && noticias.length === 0 && <p>No hay noticias disponibles.</p>}
          {!loading && !error && noticias.map((item) => (
            <article key={item.id} className="noticias-card reveal">
              <div className="noticias-card-media" style={item.urlPhoto ? { padding: 0, overflow: 'hidden' } : {}}>
                <MediaThumbnail url={item.urlPhoto} alt={item.title} typeEmoji="📰" />
              </div>
              <div className="noticias-card-body">
                <span className="noticias-card-tag">Noticia</span>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
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
