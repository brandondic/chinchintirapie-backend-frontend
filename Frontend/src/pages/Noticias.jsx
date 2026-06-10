import { useState, useEffect } from 'react';
import Ticker from '../components/Ticker';
import { useReveal } from '../hooks/useReveal';
import ArticuloCard from '../components/ArticuloCard.jsx';
import articuloService from '../services/articuloService';
import '../styles/Noticias.css';

export default function Noticias() {
  const [slide, setSlide] = useState(0);
  const [noticias, setNoticias] = useState([]);
  const carouselSlides = [...noticias]
      .sort(
          (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
      )
      .slice(0, 3);
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

  useEffect(() => {
    if (carouselSlides.length === 0) return;

    const interval = setInterval(() => {
      setSlide((prev) =>
          (prev + 1) % carouselSlides.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  return (
    <>
      <Ticker text="📰 Hitos Recientes · Carnaval · Talleres · Audiovisual · Archivo · Comunidad" />

      <div className="noticias-header">
        <div>
          <h1>Hitos Recientes</h1>
          <p>Actividades, encuentros y memoria viva de la Escuela Carnavalera.</p>
        </div>
      </div>

      {carouselSlides.length > 0 && (
          <div className="noticias-carousel">

            <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${slide * 100}%)`
                }}
            >
              {carouselSlides.map((item) => (
                  <div
                      className="carousel-slide"
                      key={item.id}
                  >
                    <img
                        src={item.urlPhoto}
                        alt={item.title}
                    />

                    <div className="noticias-carousel-overlay">
                      <h2>{item.title}</h2>
                    </div>
                  </div>
              ))}
            </div>

            <button
                onClick={() =>
                    setSlide(
                        (s) =>
                            (s - 1 + carouselSlides.length) %
                            carouselSlides.length
                    )
                }
                className="noticias-carousel-button left"
                aria-label="Anterior"
            >
              ‹
            </button>

            <button
                onClick={() =>
                    setSlide(
                        (s) =>
                            (s + 1) %
                            carouselSlides.length
                    )
                }
                className="noticias-carousel-button right"
                aria-label="Siguiente"
            >
              ›
            </button>

          </div>
      )}

      <section className="noticias-grid">
        <div className="noticias-grid-inner">
          {loading && <p>Cargando noticias...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && noticias.length === 0 && <p>No hay noticias disponibles.</p>}
          {!loading && !error && noticias.map((item) => (
              <ArticuloCard
                  key={item.id}
                  articulo={item}
              />
          ))}
        </div>
      </section>
    </>
  );
}
