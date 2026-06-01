import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import { Link } from 'react-router-dom';
import '../styles/Organizacion.css';

const CUERPOS = [
  {
    img: '/img/cuerpo_banda.webp',
    title: 'Cuerpo de Banda',
    category: 'Música y Ritmo',
    color: 'var(--verde-agua, #20B2AA)',
    desc: 'El motor percusivo y melódico de nuestra identidad. Son la base rítmica implacable que marca el pulso de la calle en cada presentación.',
    contenidos: ['Percusión', 'Vientos', 'Arreglos'],
    miembros: 45,
  },
  {
    img: '/img/cuerpo_baile.webp',
    title: 'Cuerpo de Baile',
    category: 'Movimiento',
    color: 'var(--coral, #FF7F50)',
    desc: 'La manifestación física de nuestro sonido. Transforman el ritmo en movimiento vibrante, conectando con la emoción y energía del público.',
    contenidos: ['Coreografía', 'Expresión Corporal', 'Danzas Afro'],
    miembros: 60,
  },
  {
    img: '/img/cuerpo_figurines.webp',
    title: 'Cuerpo de Figurines',
    category: 'Diseño y Mística',
    color: 'var(--violeta, #8A2BE2)',
    desc: 'Los guardianes de la mística, la sátira y la memoria. Encarnan el alma histórica de La Chinchin a través del diseño de personajes.',
    contenidos: ['Vestuario', 'Maquillaje', 'Personajes'],
    miembros: 15,
  },
];

const ENGRANAJES = [
  {
    title: 'Equipo de Autogestión',
    desc: 'El motor de nuestra independencia. Diseñan las estrategias financieras y logísticas que aseguran la viabilidad del colectivo.',
    area: 'autogestion',
  },
  {
    title: 'Equipo de Investigación',
    desc: 'Los arqueólogos de nuestra cultura. Rescatan, analizan y documentan saberes mediante metodologías propias.',
    area: 'investigacion',
  },
  {
    title: 'Equipo de Pedagogía',
    desc: 'La academia de la calle. A través de sistemas de enseñanza exclusivos, forman a las nuevas generaciones.',
    area: 'pedagogia',
  },
  {
    title: 'Equipo de Diseño',
    desc: 'Los arquitectos de nuestra identidad visual. Traducen nuestro sonido y furia en colores, formas y estéticas.',
    area: 'diseno',
  },
  {
    title: 'Equipo de Comunicaciones',
    desc: 'La voz del colectivo. Proyectan nuestra narrativa hacia el mundo, conectando a La Chinchin con festivales.',
    area: 'comunicaciones',
  },
  {
    title: 'Equipo de Protocolo',
    desc: 'Encargado de redactar y mantener los estatutos de convivencia, promoviendo el respeto, la organización y el buen funcionamiento dentro de la agrupación.',
    area: 'protocolo',
  },
  {
    title: 'Equipo de Cariñitos',
    desc: 'El corazón de La Chinchin. Equipo de bienestar interno dedicado a cuidar nuestra gente y mejorar la convivencia.',
    area: 'carinitos',
  },
];

export default function Organizacion() {
  useReveal();

  return (
    <>
      <Ticker text="⚙️ Ecosistema vivo · Tres cuerpos · Autogestión · Maquinaria cultural · Disciplina colectiva" />
      <PageHero
        badge="Ecosistema Vivo"
        title="ecosistema: la maquinaria detrás del latido"
        titleEm="Nuestro"
        description="Conoce cómo nos organizamos para sostener el arte, la autogestión y la disciplina colectiva."
        variant="purple"
      />

      <main className="organizacion-page">
        <section className="organizacion-intro reveal">
          <div className="organizacion-intro-grid">
            <p className="organizacion-text">
              En la calle nacimos y en la calle vibramos. Lo que el público experimenta como una explosión
              visceral de energía es el resultado de una maquinaria cultural perfectamente engranada.{' '}
              <strong>La Chinchin no es solo una agrupación; es un ecosistema vivo.</strong>{' '}
              La autogestión, cuando se hace con disciplina, crea un modelo de trabajo capaz de inspirar
              a cualquier colectivo artístico.
            </p>
            <img
              src="/img/organizacion-.webp"
              alt="Miembros de Chinchintirapie reunidos"
              className="organizacion-hero-img"
            />
          </div>
        </section>

        <section className="organizacion-body">
          <div className="section-header reveal">
            <h2>Los tres <span>cuerpos</span></h2>
            <div className="deco-line"><span>🎭</span></div>
            <p>El frente de acción que da vida a nuestra identidad en el espacio público.</p>
          </div>
          <div className="organizacion-card-grid">
            {CUERPOS.map(({ img, title, desc, category, color, contenidos, miembros }) => (
              <article key={title} className="organizacion-card-expanded reveal">
                <div className="card-header">
                  <img src={img} alt={title} loading="lazy" className="card-header-img" />
                  <div className="card-header-overlay">
                    <h3 className="card-title">{title}</h3>
                    <span className="card-category" style={{ backgroundColor: color }}>{category}</span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-desc">{desc}</p>
                  
                  <div className="card-section">
                    <h4>Contenidos</h4>
                    <div className="pill-container">
                      {contenidos.map((pill, i) => (
                        <span key={i} className="pill" style={{ borderColor: color, color: color }}>{pill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="card-section">
                    <h4>Equipo</h4>
                    <div className="avatar-group">
                      <div className="avatar" style={{ backgroundColor: color }}>M</div>
                      <div className="avatar" style={{ backgroundColor: color }}>A</div>
                      <div className="avatar" style={{ backgroundColor: color }}>R</div>
                      <div className="avatar-count">+{miembros}</div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <p>¿Te interesa sumarte?</p>
                    <Link to="/contacto" className="btn-inscripcion" style={{ backgroundColor: color }}>Ver inscripción</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="organizacion-gear-section">
          <div className="section-header reveal">
            <h2>El engranaje <span>interno</span></h2>
            <div className="deco-line"><span>⚙️</span></div>
            <p>Para que el arte explote en la calle, el trabajo en la sombra debe ser impecable.</p>
          </div>
          <div className="organizacion-gear-grid">
            {ENGRANAJES.map(({ title, desc, area }) => (
              <article key={title} className={`organizacion-gear-card reveal area-${area}`}>
                <div className="organizacion-gear-content">
                  <h3 className="organizacion-gear-title">{title}</h3>
                  <p className="organizacion-gear-desc">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
