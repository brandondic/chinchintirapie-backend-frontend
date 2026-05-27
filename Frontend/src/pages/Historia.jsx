import { useReveal } from '../hooks/useReveal';
import Ticker from '../components/Ticker';
import '../styles/Historia.css';

const STORY_CARDS = [
  {
    title: 'Origen y rebeldía',
    body: 'Lo que hoy ves estallar en la calle con challa y sudor, nació de un susurro ancestral y un acto de rebeldía en la Plaza de Armas en 2005. Allí, entre el asfalto y la bota policial, Rosita Jiménez entendió que el Chinchín no era un accesorio; era el Tambor Callejero Original y Genuino de este país.',
    className: 'story-card-feature',
  },
  {
    title: 'De la resistencia a la escuela',
    body: 'Fundada oficialmente el 23 de julio de 2006, la Escuela Carnavalera Chinchintirapié no nació para ser una academia, sino una trinchera de creación social. Somos una organización autogestionada y sin fines de lucro que decidió que la cultura no se pide, se toma.',
    className: '',
  },
  {
    title: 'Aprender-haciendo la fiesta',
    body: 'No buscamos virtuosos, buscamos comunidad. Nuestra propuesta musical no imita ritmos ajenos; construye sobre el latido del Chinchín. Resignificamos la cueca, la cumbia y el huaino para devolverle al pueblo su derecho a la fiesta.',
    className: 'accent-card',
  },
  {
    title: '20 años de identidad innegociable',
    body: 'Desde la Pincoya hasta el Paseo Ahumada, desde los Mil Tambores hasta la Población El Volcán, hemos regado la ciudad con una verdad incómoda para el sistema: somos dueños de nuestra alegría. Somos una escuela sin paredes.',
    className: 'wide-card',
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
        <section className="hero-history">
          <div className="hero-history-inner">
            <div>
              <p className="hero-history-tagline">Escuela carnavalera · 2006–2026</p>
              <h1 className="hero-history-title">Nuestra historia suena en la calle.</h1>
              <p className="hero-history-copy">
                Dos décadas de memoria, autogestión y tambor primario convertidas en escuela, comunidad y fiesta popular.
              </p>
              <div className="hero-history-actions">
                <a href="#historia" className="btn btn-primary">Leer historia</a>
                <a href="#galeria" className="btn btn-secondary">Ver fotos</a>
              </div>
            </div>
            <aside className="hero-history-aside">
              <p className="hero-history-quote">"Me contaron los abuelos que hace tiempo..."</p>
              <p className="hero-history-copy">
                Lo que hoy estalla con challa y sudor nació como un gesto de resistencia cultural y se volvió una escuela sin paredes.
              </p>
              <small className="hero-history-note">Tambor callejero original y genuino</small>
            </aside>
          </div>
        </section>

        {/* HISTORIA EDITORIAL */}
        <section className="story-section section-crema" id="historia">
          <div className="section-inner">
            <div className="section-header">
              <p>Memoria viva</p>
              <h2>CHINCHINTIRAPIÉ: LA MAQUINARIA DEL TAMBOR PRIMARIO</h2>
            </div>
            <div className="story-grid">
              {STORY_CARDS.map(({ title, body, className }) => (
                <article key={title} className={`story-card ${className}`}>
                  <h3 className="story-card-title">{title}</h3>
                  <p className="story-card-copy">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MISIÓN Y VISIÓN */}
        <section className="mission-section">
          <div className="section-inner">
            <div className="section-header">
              <p>Horizonte colectivo</p>
              <h2>Misión y visión</h2>
            </div>
            <div className="mission-grid">
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
                <article key={tag} className="mission-card">
                  <span className="mission-badge">{tag}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GALERÍA / CARRUSEL SIMPLE */}
        <section className="gallery-section section-crema" id="galeria">
          <div className="section-inner">
            <div className="section-header">
              <p>Archivo visual</p>
              <h2>Galería fotográfica</h2>
            </div>
            <div className="gallery-grid">
              {CAROUSEL_IMAGES.map(({ src, caption, desc }) => (
                <figure key={src} className="gallery-card">
                  <img src={src} alt={caption} className="gallery-img" loading="lazy" />
                  <figcaption className="gallery-caption">
                    <strong className="gallery-caption-title">{caption}</strong>
                    <span className="gallery-caption-desc">{desc}</span>
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
