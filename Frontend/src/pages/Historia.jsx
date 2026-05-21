import { useReveal } from '../hooks/useReveal';
import Ticker from '../components/Ticker';

const STORY_CARDS = [
  {
    title: 'Origen y rebeldía',
    body: 'Lo que hoy ves estallar en la calle con challa y sudor, nació de un susurro ancestral y un acto de rebeldía en la Plaza de Armas en 2005. Allí, entre el asfalto y la bota policial, Rosita Jiménez entendió que el Chinchín no era un accesorio; era el Tambor Callejero Original y Genuino de este país.',
    className: 'story-card story-card-feature',
  },
  {
    title: 'De la resistencia a la escuela',
    body: 'Fundada oficialmente el 23 de julio de 2006, la Escuela Carnavalera Chinchintirapié no nació para ser una academia, sino una trinchera de creación social. Somos una organización autogestionada y sin fines de lucro que decidió que la cultura no se pide, se toma.',
    className: 'story-card',
  },
  {
    title: 'Aprender-haciendo la fiesta',
    body: 'No buscamos virtuosos, buscamos comunidad. Nuestra propuesta musical no imita ritmos ajenos; construye sobre el latido del Chinchín. Resignificamos la cueca, la cumbia y el huaino para devolverle al pueblo su derecho a la fiesta.',
    className: 'story-card accent-card',
  },
  {
    title: '20 años de identidad innegociable',
    body: 'Desde la Pincoya hasta el Paseo Ahumada, desde los Mil Tambores hasta la Población El Volcán, hemos regado la ciudad con una verdad incómoda para el sistema: somos dueños de nuestra alegría. Somos una escuela sin paredes.',
    className: 'story-card wide-card',
  },
];

const CAROUSEL_IMAGES = [
  { src: '/img/1.webp', caption: 'Ensayos y escuela en movimiento', desc: 'Formación, comunidad y trabajo colectivo.' },
  { src: '/img/2.webp', caption: 'La calle como escenario', desc: 'Comparsas, desfiles, challa y presencia territorial.' },
  { src: '/img/3.webp', caption: 'Memoria, archivo y futuro', desc: 'Hitos, retratos de integrantes y celebraciones importantes.' },
];

export default function Historia() {
  useReveal();

  return (
    <>
      <Ticker text="📜 Historia · Memoria viva · 2006–2026 · Escuela Carnavalera · Autogestión · Comunidad" />

      <main id="contenido">
        {/* HERO */}
        <section className="hero-history" style={{
          background: 'linear-gradient(135deg, var(--morado-o) 0%, #1a0820 100%)',
          padding: '5rem 2rem',
          color: '#fff'
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--cian)', fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', marginBottom: '1rem', fontSize: '.85rem' }}>
                Escuela carnavalera · 2006–2026
              </p>
              <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: 3, lineHeight: 1, marginBottom: '1rem', textShadow: '4px 4px 0 var(--rojo)' }}>
                Nuestra historia suena en la calle.
              </h1>
              <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 500 }}>
                Dos décadas de memoria, autogestión y tambor primario convertidas en escuela, comunidad y fiesta popular.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#historia" className="btn btn-primary">Leer historia</a>
                <a href="#galeria" className="btn btn-secondary">Ver fotos</a>
              </div>
            </div>
            <aside style={{
              background: 'rgba(255,255,255,.07)',
              border: '2px solid rgba(0,251,207,.3)',
              borderRadius: 20,
              padding: '2rem',
            }}>
              <p style={{ color: 'var(--cian)', fontStyle: 'italic', marginBottom: '.5rem', fontSize: '1.05rem' }}>
                "Me contaron los abuelos que hace tiempo..."
              </p>
              <p style={{ color: 'rgba(255,255,255,.8)', lineHeight: 1.7 }}>
                Lo que hoy estalla con challa y sudor nació como un gesto de resistencia cultural y se volvió una escuela sin paredes.
              </p>
              <small style={{ color: 'rgba(255,255,255,.4)', display: 'block', marginTop: '1rem' }}>
                Tambor callejero original y genuino
              </small>
            </aside>
          </div>
        </section>

        {/* HISTORIA EDITORIAL */}
        <section style={{ padding: '5rem 2rem', background: 'var(--crema)' }} id="historia">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="section-header">
              <p style={{ color: 'var(--rojo)', fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', fontSize: '.85rem' }}>
                Memoria viva
              </p>
              <h2 style={{ fontFamily: 'Bangers, cursive', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: 3 }}>
                CHINCHINTIRAPIÉ: LA MAQUINARIA DEL TAMBOR PRIMARIO
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              {STORY_CARDS.map(({ title, body, className }) => (
                <article key={title} style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '2rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,.07)',
                }}>
                  <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.3rem', color: 'var(--oscuro)', marginBottom: '.7rem' }}>{title}</h3>
                  <p style={{ color: '#5a3e2b', lineHeight: 1.7, fontSize: '.95rem' }}>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MISIÓN Y VISIÓN */}
        <section style={{ background: 'var(--morado-o)', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="section-header">
              <p style={{ color: 'var(--cian)', fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', fontSize: '.85rem' }}>Horizonte colectivo</p>
              <h2 style={{ fontFamily: 'Bangers, cursive', color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: 3 }}>Misión y visión</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              {[
                {
                  tag: 'Misión',
                  title: 'El latido que organiza',
                  body: 'Nuestra misión es rescatar, fortalecer y proyectar el Chinchín como expresión viva de identidad popular, formando comunidad a través del arte callejero. Defendemos la autogestión cultural como un acto de dignidad.',
                },
                {
                  tag: 'Visión',
                  title: 'El futuro suena a calle',
                  body: 'Proyectamos un Chile donde el Chinchín y la cultura carnavalera sean reconocidos como patrimonio vivo, presente en cada barrio, población y territorio. Una ciudad donde el ritmo no sea silenciado.',
                },
              ].map(({ tag, title, body }) => (
                <article key={tag} style={{
                  background: 'rgba(255,255,255,.06)',
                  border: '2px solid rgba(0,251,207,.2)',
                  borderRadius: 20,
                  padding: '2.5rem',
                  color: '#fff',
                }}>
                  <span style={{ background: 'var(--dorado)', color: 'var(--oscuro)', borderRadius: 20, padding: '.2rem .9rem', fontSize: '.78rem', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
                  <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.4rem', marginBottom: '.7rem', color: 'var(--amarillo-e)' }}>{title}</h3>
                  <p style={{ color: 'rgba(255,255,255,.75)', lineHeight: 1.7 }}>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GALERÍA / CARRUSEL SIMPLE */}
        <section style={{ padding: '5rem 2rem', background: 'var(--crema)' }} id="galeria">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="section-header">
              <p style={{ color: 'var(--rojo)', fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', fontSize: '.85rem' }}>Archivo visual</p>
              <h2 style={{ fontFamily: 'Bangers, cursive', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: 3 }}>Galería fotográfica</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              {CAROUSEL_IMAGES.map(({ src, caption, desc }) => (
                <figure key={src} style={{ margin: 0, borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,.07)' }}>
                  <img src={src} alt={caption} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} loading="lazy" />
                  <figcaption style={{ background: 'var(--oscuro)', color: '#fff', padding: '1rem 1.2rem' }}>
                    <strong style={{ display: 'block', fontFamily: 'Boogaloo, cursive', fontSize: '1.1rem', marginBottom: '.3rem' }}>{caption}</strong>
                    <span style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.6)' }}>{desc}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
