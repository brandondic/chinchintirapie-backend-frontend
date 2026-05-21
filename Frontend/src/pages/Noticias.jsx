import { useState } from 'react';
import Ticker from '../components/Ticker';

const NEWS_ITEMS = [
  {
    img: '/img/img1.webp',
    category: 'DESTACADO',
    title: 'Homenaje Popular en las Calles',
    desc: 'Registro audiovisual de la intervención artística realizada por la comunidad carnavalera.',
    featured: true,
  },
  {
    img: '/img/img6.webp',
    category: 'CARNAVAL',
    title: 'Conmemoración Hermanos Vergara Toledo',
    desc: 'Jornada cultural comunitaria con música y danza popular.',
  },
  {
    img: '/img/img3.webp',
    category: 'TALLERES',
    title: 'Nuevos talleres abiertos a la comunidad',
    desc: 'Espacios de formación artística para niñas, niños y adultos.',
  },
  {
    video: '/Video Project.mp4',
    category: 'AUDIOVISUAL',
    title: 'Ensayo nocturno de comparsa',
    desc: 'Video documental del proceso de ensayo.',
    featured: true,
  },
  {
    img: '/img/img4.webp',
    category: 'ARCHIVO',
    title: 'Recuperación de registros históricos',
    desc: 'Material audiovisual comunitario incorporado al repositorio.',
  },
];

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

      {/* Encabezado */}
      <div style={{
        background: 'var(--morado-o)',
        padding: '3rem 2rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '4px solid var(--cian)',
      }}>
        <div>
          <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--amarillo-e)', letterSpacing: 3, lineHeight: 1 }}>
            Hitos Recientes
          </h1>
          <p style={{ color: 'rgba(255,255,255,.7)', marginTop: '.4rem' }}>
            Actividades, encuentros y memoria viva de la Escuela Carnavalera.
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '.6rem 1.2rem',
            borderRadius: 8,
            border: '2px solid var(--cian)',
            background: 'var(--morado-o)',
            color: '#fff',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700,
            fontSize: '.9rem',
            cursor: 'pointer',
          }}
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Mini Carrusel */}
      <div style={{ position: 'relative', maxHeight: 400, overflow: 'hidden' }}>
        <img
          src={CAROUSEL_SLIDES[slide].src}
          alt={CAROUSEL_SLIDES[slide].caption}
          style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 60%)',
          display: 'flex', alignItems: 'flex-end', padding: '2rem',
        }}>
          <h2 style={{ fontFamily: 'Bangers, cursive', fontSize: '2rem', color: '#fff', letterSpacing: 2 }}>
            {CAROUSEL_SLIDES[slide].caption}
          </h2>
        </div>
        <button onClick={() => setSlide((s) => (s - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)}
          style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 44, height: 44, cursor: 'pointer', fontSize: '1.2rem' }}>
          ‹
        </button>
        <button onClick={() => setSlide((s) => (s + 1) % CAROUSEL_SLIDES.length)}
          style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 44, height: 44, cursor: 'pointer', fontSize: '1.2rem' }}>
          ›
        </button>
      </div>

      {/* Grid de Noticias */}
      <section style={{ padding: '4rem 2rem', background: 'var(--crema)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          {filtered.map((item) => (
            <article key={item.title} style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,.08)',
              transition: 'transform .3s',
              position: 'relative',
            }}>
              {item.video ? (
                <video autoPlay muted loop playsInline style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}>
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : (
                <img src={item.img} alt={item.title} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} loading="lazy" />
              )}
              <div style={{ padding: '1.2rem' }}>
                <span style={{
                  background: 'var(--rojo)', color: '#fff',
                  borderRadius: 20, padding: '.2rem .7rem',
                  fontSize: '.72rem', fontWeight: 800, letterSpacing: 1.5,
                  textTransform: 'uppercase', display: 'inline-block', marginBottom: '.5rem',
                }}>
                  {item.category}
                </span>
                <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.2rem', color: 'var(--oscuro)', marginBottom: '.3rem' }}>{item.title}</h3>
                {item.desc && <p style={{ color: '#5a3e2b', fontSize: '.88rem', lineHeight: 1.5, marginBottom: '.8rem' }}>{item.desc}</p>}
                <button style={{
                  background: 'var(--morado-o)', color: 'var(--amarillo-e)',
                  border: 'none', borderRadius: 8, padding: '.4rem 1rem',
                  fontFamily: 'Nunito, sans-serif', fontWeight: 800, cursor: 'pointer',
                  fontSize: '.85rem',
                }}>
                  Ver noticia
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
