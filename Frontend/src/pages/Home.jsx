import { Link } from 'react-router-dom';
import Ticker from '../components/Ticker';
import { useReveal } from '../hooks/useReveal';
import '../styles/Home.css';

const CARDS = [
  {
    img: 'card-img-1',
    emoji: '📂',
    tag: 'Archivo',
    title: 'Repositorio Documental',
    desc: 'Fotografías, audiovisuales y documentos de todas las ediciones del carnaval, desde los primeros ensayos hasta los últimos desfiles.',
    link: '/repositorio',
    linkText: 'Explorar →',
  },
  {
    img: 'card-img-2',
    emoji: '📰',
    tag: 'Crónicas',
    title: 'Noticias y Crónicas',
    desc: 'Relatos, entrevistas y notas periodísticas que cuentan la historia viva de la escuela y sus protagonistas en las calles.',
    link: '/cronicas',
    linkText: 'Leer más →',
  },
  {
    img: 'card-img-3',
    emoji: '✍️',
    tag: 'Ensayos',
    title: 'CEDOC – Ensayos',
    desc: 'Centro de documentación con ensayos académicos y reflexiones culturales sobre el carnaval como arte y práctica comunitaria.',
    link: '/cedoc',
    linkText: 'Consultar →',
  },
];

const STATS = [
  { num: '500+', label: 'Estudiantes' },
  { num: '20',   label: 'Años' },
  { num: '4',    label: 'Talleres' },
  { num: '∞',    label: 'Fiesta' },
];

const TALLERES = [
  { img: '/public/img/Taller-baile.webp', title: 'Baile',    phrase: 'Cuerpo en movimiento' },
  { img: '/public/img/Taller-banda.webp', title: 'Banda',    phrase: 'Pulso de la calle' },
  { img: '/public/img/Taller-figurines.webp', title: 'Figurines', phrase: 'Color y memoria' },
];

export default function Home() {
  useReveal();

  return (
      <>
        <Ticker text="🥁 ¡20 años haciendo carnaval en la calle!   ·   🎺 Próximas fechas: 19 horas · 23 feb · 23 mar   ·   Nuevas inscripciones abiertas para Figurines   ·   Proyectos comunitarios activos en toda la ciudad   ·   Baile · Diseño de figurines · banda" />

        {/* HERO */}
        <section className="hero" id="inicio">
          <div className="hero-bg" style={{
            background: `
                linear-gradient(
                  to bottom,
                  rgba(190,0,60,0.70) 0%,
                  rgba(190,0,60,0.62) 20%,
                  rgba(190,0,60,0.40) 30%,
                  rgba(190,0,60,0.10) 40%
                ),
                url('/img/chinchintirapie-banner-index.webp') center/cover no-repeat
              `
          }} />
          <div className="hero-content">
            <div className="hero-badge">
              · Escuela Carnavalera Chinchintirapié ·
            </div>
            <h1 className="hero-title">
              <em className="hero-title-em">20 años </em>de Carnaval y educación popular
            </h1>

            <div className="hero-btns">
              <Link to="/historia" className="btn btn-primary">Historia</Link>
              <Link to="/repositorio" className="btn btn-secondary">Archivo</Link>
            </div>
          </div>
          <div className="scroll-hint">Descubrir</div>
        </section>

        {/* CARDS */}
        <section className="cards-section" id="hitos">
          <div className="section-header reveal">
            <h2>Lo que hace <span>vibrar</span> la escuela</h2>
            <div className="deco-line"><span>🎶</span></div>
            <p>Archivo, crónicas y ensayos que documentan 20 años de fiesta comunitaria.</p>
          </div>
          <div className="cards-grid">
            {CARDS.map((c) => (
                <div className="card reveal" key={c.title}>
                  <div className={`card-img ${c.img}`}>
                    <div className="card-img-inner">{c.emoji}</div>
                    <span className="card-tag">{c.tag}</span>
                  </div>
                  <div className="card-body">
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    <Link to={c.link} className="card-link">{c.linkText}</Link>
                  </div>
                </div>
            ))}
          </div>
        </section>

        {/* 20 AÑOS */}
        <section className="años-section" id="historia">
          <div className="años-inner">
            <div className="años-visual reveal">
              <div className="años-number">20</div>
              <div className="años-badge-ring">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path id="circ" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" fill="none" />
                  <text style={{ fontFamily: 'var(--font-titulo)', fill: 'var(--rojo)' }} fontSize="14" letterSpacing="4">
                    <textPath href="#circ">★ CHINCHINTIRAPIÉ ★ ESCUELA CARNAVALERA ★ DESDE 2004 ★ </textPath>
                  </text>
                </svg>
              </div>
            </div>
            <div className="años-text reveal">
              <h2>Dos décadas haciendo <span>carnaval</span> con el barrio</h2>
              <p>
                Chinchintirapié nació en las calles como una apuesta por recuperar la cultura popular
                latinoamericana a través del cuerpo, el ritmo y la comunidad. En 20 años hemos formado
                cientos de artistas, construido redes comunitarias y llevado el carnaval a cada rincón de la ciudad.
              </p>
              <p>
                Nuestra misión es que la fiesta sea de todos: sin importar edad, origen o experiencia previa.
                La escuela es un espacio de encuentro, creación y transformación social.
              </p>
              <div className="stats-row">
                {STATS.map(({ num, label }) => (
                    <div className="stat-box" key={label}>
                      <span className="num">{num}</span>
                      <span className="label">{label}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TALLERES */}
        <section className="talleres-section" id="talleres">
          <div className="section-header reveal">
            <h2 style={{ color: 'var(--blanco)' }}>Nuestros <span style={{ color: 'var(--amarillo)' }}>Talleres</span></h2>
            <div className="deco-line"><span></span></div>
            <p>Descubre los tres pilares fundamentales de nuestra escuela.</p>
          </div>
          <div className="talleres-mini-grid">
            {TALLERES.map(({ img, title, phrase }) => (
             <div className="taller-mini-card reveal" key={title}>
              <div className="taller-icon">
                <img src={img} alt={title} />
              </div>
              <div className="taller-info">
                <h3>{title}</h3>
                <p>{phrase}</p>
              </div>
            </div>
          ))}
          </div>
          <div className="talleres-action reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/organizacion#los-tres-cuerpos" className="btn btn-primary">Ver Organización</a>
          </div>
        </section>

        {/* EVENTOS */}

      </>
  );
}
