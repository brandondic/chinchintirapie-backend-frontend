import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import '../styles/Organizacion.css';

const CUERPOS = [
  {
    img: '/img/cuerpo_banda.webp',
    title: 'Cuerpo de Banda',
    desc: 'El motor percusivo y melódico de nuestra identidad. Son la base rítmica implacable que marca el pulso de la calle.',
  },
  {
    img: '/img/cuerpo_baile.webp',
    title: 'Cuerpo de Baile',
    desc: 'La manifestación física de nuestro sonido. Transforman el ritmo en movimiento vibrante, conectando con la emoción del público.',
  },
  {
    img: '/img/cuerpo_figurines.webp',
    title: 'Cuerpo de Figurines',
    desc: 'Los guardianes de la mística, la sátira y la memoria. Encarnan el alma histórica de La Chinchin.',
  },
];

const ENGRANAJES = [
  { icon: '💰', title: 'Equipo de Autogestión',     desc: 'El motor de nuestra independencia. Diseñan las estrategias financieras y logísticas que aseguran la viabilidad del colectivo.' },
  { icon: '🔍', title: 'Equipo de Investigación',   desc: 'Los arqueólogos de nuestra cultura. Rescatan, analizan y documentan saberes mediante metodologías propias.' },
  { icon: '🎓', title: 'Equipo de Pedagogía',       desc: 'La academia de la calle. A través de sistemas de enseñanza exclusivos, forman a las nuevas generaciones.' },
  { icon: '🎨', title: 'Equipo de Diseño',          desc: 'Los arquitectos de nuestra identidad visual. Traducen nuestro sonido y furia en colores, formas y estéticas.' },
  { icon: '📢', title: 'Equipo de Comunicaciones',  desc: 'La voz del colectivo. Proyectan nuestra narrativa hacia el mundo, conectando a La Chinchin con festivales.' },
  { icon: '📋', title: 'Equipo de Protocolo', desc: 'Encargado de redactar y mantener los estatutos de convivencia, promoviendo el respeto, la organización y el buen funcionamiento dentro de la agrupación.' },
  { icon: '❤️', title: 'Equipo de Cariñitos',       desc: 'El corazón de La Chinchin. Equipo de bienestar interno dedicado a cuidar nuestra gente y mejorar la convivencia.' },
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
            {CUERPOS.map(({ img, title, desc }) => (
              <article key={title} className="organizacion-card reveal">
                <img src={img} alt={title} loading="lazy" />
                <div className="organizacion-card-content">
                  <h3 className="organizacion-card-title">{title}</h3>
                  <p className="organizacion-card-desc">{desc}</p>
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
            {ENGRANAJES.map(({ icon, title, desc }) => (
              <article key={title} className="organizacion-gear-card reveal">
                <span className="organizacion-gear-icon">{icon}</span>
                <h3 className="organizacion-gear-title">{title}</h3>
                <p className="organizacion-gear-desc">{desc}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
