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
  { img: '/img/Taller-card-baile.webp', title: 'Baile',    desc: 'Expresión corporal y coreografías colectivas inspiradas en el carnaval y la cultura popular.' },
  { img: '/img/Taller-card-banda.webp', title: 'Banda',    desc: 'Formación musical con ritmos carnavaleros, percusión y trabajo en conjunto.' },
  { img: '/img/Taller-card-figurines.webp', title: 'Figurines', desc: 'Diseño y creación de vestuarios, accesorios y personajes para presentaciones carnavaleras.' },
];

const EVENTOS = [
  { fecha: '19 hrs',  nombre: 'Ensayo General – Nono 380' },
  { fecha: '23 Feb',  nombre: 'Desfile de Carnaval – Nono 380' },
  { fecha: '23 Mar',  nombre: 'Cierre de Temporada – Nono 380' },
];

export default function Home() {
  useReveal();

  return (
      <>
        <Ticker text="🥁 ¡20 años haciendo carnaval en la calle!   ·   🎺 Próximas fechas: 19 horas · 23 feb · 23 mar   ·   Nuevas inscripciones abiertas para Figurines   ·   Proyectos comunitarios activos en toda la ciudad   ·   Baile · Diseño de figurines · banda" />

        {/* HERO */}
        <section className="hero" id="inicio">
          <div className="hero-bg" style={{
            background: `linear-gradient(to right, rgba(190,0,60,.85) 0%, rgba(190,0,60,.45) 50%, rgba(190,0,60,.05) 100%), url('/img/chinchintirapie-banner-index.webp') center/cover no-repeat`,
          }} />
          <div className="hero-content">
            <div className="hero-badge" style={{ color: '#000', fontSize: '1.6rem', padding: '.5rem 1.5rem' }}>
              · Escuela Carnavalera Chinchintirapié ·
            </div>
            <h1 className="hero-title">
              <em style={{ color: 'var(--naranja)', fontStyle: 'italic' }}>20 años </em>de Carnaval
              <br />y educación popular
            </h1>
            <p className="hero-sub">
              Donde la música, el baile y la cultura latinoamericana se encuentran para transformar
              la ciudad en una fiesta viva.
            </p>
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
                  <text fontFamily="Bangers,cursive" fontSize="14" fill="#C0392B" letterSpacing="4">
                    <textPath href="#circ">★ CHINCHINTIRAPIE ★ ESCUELA CARNAVALERA ★ DESDE 2004 ★ </textPath>
                  </text>
                </svg>
              </div>
            </div>
            <div className="años-text reveal">
              <h2>Dos décadas haciendo <span>carnaval</span> con el barrio</h2>
              <p>
                Chinchintirapie nació en las calles como una apuesta por recuperar la cultura popular
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
            <h2 style={{ color: '#fff' }}>Nuestros <span style={{ color: 'var(--amarillo)' }}>Talleres</span></h2>
            <div className="deco-line"><span>🥁</span></div>
            <p>Tres disciplinas que forman el corazón de la escuela carnavalera.</p>
          </div>
          <div className="talleres-grid">
            {TALLERES.map(({ img, title, desc }) => (
                <div className="taller-card reveal" key={title}>
                  <img
                      src={img}
                      alt={title}
                      style={{
                        width: '100%',
                        height: '220px',
                        objectFit: 'cover',
                        borderRadius: '16px',
                        marginBottom: '1.5rem',
                        display: 'block',
                      }}
                  />
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
            ))}
          </div>
        </section>

        {/* EVENTOS */}

      </>
  );
}
