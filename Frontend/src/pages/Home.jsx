import { Link } from 'react-router-dom';
import Ticker from '../components/Ticker';
import { useState, useEffect } from "react";
import articuloService from '../services/articuloService';
import multimediaService from '../services/multimediaService';
import MultimediaCard from '../components/MultimediaCard';
import ArticuloCard from '../components/ArticuloCard.jsx';
import MediaThumbnail from '../components/MediaThumbnail';
import { useReveal } from '../hooks/useReveal';
import '../styles/Noticias.css';
import '../styles/Home.css';



const STATS = [
  { num: '500+', label: 'Estudiantes' },
  { num: '20',   label: 'Años' },
  { num: '4',    label: 'Talleres' },
  { num: '∞',    label: 'Fiesta' },
];

const TALLERES = [
  { img: '/img/Taller-baile.webp', title: 'Baile',    phrase: 'Cuerpo en movimiento' },
  { img: '/img/Taller-banda.webp', title: 'Banda',    phrase: 'Pulso de la calle' },
  { img: '/img/Taller-figurines.webp', title: 'Figurines', phrase: 'Color y memoria' },
];

export default function Home() {
  useReveal();
  const [noticiasRecientes, setNoticiasRecientes] = useState([]);
  const [cronicaReciente, setCronicaReciente] = useState(null);
  const [reposDestacados, setReposDestacados] = useState([]);
  const [cedocDestacado, setCedocDestacado] = useState(null);

  useEffect(() => {
    const cargarContenido = async () => {
      try {
        // Artículos: 2 noticias + 1 crónica más recientes
        const articulos = await articuloService.fetchAll();
        const ordenados = articulos.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const noticias = ordenados
          .filter((a) => a.type === 'NOTICIA')
          .slice(0, 2);
        setNoticiasRecientes(noticias);

        const cronica = ordenados
          .filter((a) => a.type === 'CRONICA')
          .slice(0, 1);
        setCronicaReciente(cronica[0] || null);

        // Multimedia: 2 repos + 1 CEDOC más recientes
        const multimedia = await multimediaService.fetchAll();
        const multOrdenada = multimedia.sort(
          (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
        );

        const repos = multOrdenada
          .filter((m) => m.type === 'REPOSITORIO')
          .slice(0, 2);
        setReposDestacados(repos);

        const cedoc = multOrdenada
          .filter((m) => m.type === 'CEDOC')
          .slice(0, 1);
        setCedocDestacado(cedoc[0] || null);
      } catch (error) {
        console.error('Error cargando contenido:', error);
      }
    };

    cargarContenido();
  }, []);


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

        {/* LO QUE HACE VIBRAR — Unified Section */}
        <section className="cards-section" id="hitos">
          <div className="section-header reveal">
            <h2>Lo que hace <span>vibrar</span> la escuela</h2>
            <div className="deco-line"><span>🎶</span></div>
            <p>Archivo, crónicas y ensayos que documentan 20 años de fiesta comunitaria.</p>
          </div>

          {/* ── Noticias Recientes ── */}
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="home-subsection-header reveal">
              <div className="home-subsection-label">📰 Noticias Recientes</div>
              <div className="home-subsection-line"></div>
              <div className="home-subsection-actions">
                <Link to="/noticias" className="btn-ghost">Todas las Noticias</Link>
                <Link to="/cronicas" className="btn-ghost">Crónicas</Link>
              </div>
            </div>
          </div>

          <div className="home-vibrar-grid reveal">
            {/* Hero: Noticia principal */}
            {noticiasRecientes[0] && (
              <Link to={`/noticias/${noticiasRecientes[0].id}`} className="home-vibrar-hero">
                <div className="home-vibrar-hero-img">
                  <img
                    src={noticiasRecientes[0].urlPhoto}
                    alt={noticiasRecientes[0].title}
                  />
                </div>
                <div className="home-vibrar-hero-overlay">
                  <span className="noticias-card-tag">{noticiasRecientes[0].type}</span>
                  <h3>{noticiasRecientes[0].title}</h3>
                  {noticiasRecientes[0].description && (
                    <p>{noticiasRecientes[0].description}</p>
                  )}
                  <span className="hero-read-more">Leer más →</span>
                </div>
              </Link>
            )}

            {/* Side: 2ª noticia + crónica */}
            <div className="home-vibrar-side">
              {noticiasRecientes[1] && (
                <ArticuloCard key={noticiasRecientes[1].id} articulo={noticiasRecientes[1]} />
              )}
              {cronicaReciente && (
                <ArticuloCard key={cronicaReciente.id} articulo={cronicaReciente} />
              )}
            </div>
          </div>

          {/* ── Multimedias Destacados ── */}
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="home-subsection-header reveal">
              <div className="home-subsection-label">📂 Multimedias Destacados</div>
              <div className="home-subsection-line"></div>
              <div className="home-subsection-actions">
                <Link to="/repositorio" className="btn-ghost">Repositorio Audiovisual</Link>
                <Link to="/cedoc" className="btn-ghost">Cedoc</Link>
              </div>
            </div>
          </div>

          <div className="home-vibrar-bottom reveal">
            {reposDestacados.map((item) => (
              <MultimediaCard key={item.id} multimedia={item} />
            ))}

            {cedocDestacado && (
              <article className="noticias-card">
                <div className="noticias-card-media">
                  <MediaThumbnail
                    url={cedocDestacado.url}
                    thumbnailUrl={cedocDestacado.thumbnailUrl}
                    alt={cedocDestacado.title}
                    typeEmoji="📚"
                  />
                </div>
                <div className="noticias-card-body">
                  <span className="noticias-card-tag">📚 Investigación</span>
                  <h3>{cedocDestacado.title}</h3>
                  {cedocDestacado.description && (
                    <p>{cedocDestacado.description}</p>
                  )}
                  <Link to={`/cedoc/${cedocDestacado.id}`} className="link-reset">
                    <button>Ver investigación</button>
                  </Link>
                </div>
              </article>
            )}
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
