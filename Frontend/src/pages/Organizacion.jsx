import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';

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

      <main style={{ background: 'var(--crema)' }}>
        {/* INTRO */}
        <section style={{ padding: '4rem 2rem', maxWidth: 1100, margin: '0 auto' }} className="reveal">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <p style={{ color: '#5a3e2b', lineHeight: 1.9, fontSize: '1rem' }}>
              En la calle nacimos y en la calle vibramos. Lo que el público experimenta como una explosión
              visceral de energía es el resultado de una maquinaria cultural perfectamente engranada.{' '}
              <strong>La Chinchin no es solo una agrupación; es un ecosistema vivo.</strong>{' '}
              La autogestión, cuando se hace con disciplina, crea un modelo de trabajo capaz de inspirar
              a cualquier colectivo artístico.
            </p>
            <img
              src="/img/organizacion-.webp"
              alt="Miembros de Chinchintirapie reunidos"
              style={{ width: '100%', borderRadius: 20, boxShadow: '0 8px 24px rgba(0,0,0,.08)' }}
            />
          </div>
        </section>

        {/* LOS TRES CUERPOS */}
        <section style={{ padding: '4rem 2rem' }}>
          <div className="section-header reveal">
            <h2>Los tres <span>cuerpos</span></h2>
            <div className="deco-line"><span>🎭</span></div>
            <p>El frente de acción que da vida a nuestra identidad en el espacio público.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: 1100, margin: '0 auto', padding: '0 0' }}>
            {CUERPOS.map(({ img, title, desc }) => (
              <article key={title} className="reveal" style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 10px 30px rgba(0,0,0,.08)',
                transition: 'transform .3s',
              }}>
                <img src={img} alt={title} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'Bangers, cursive', fontSize: '1.6rem', letterSpacing: 2, color: 'var(--oscuro)', marginBottom: '.5rem' }}>{title}</h3>
                  <p style={{ color: '#5a3e2b', lineHeight: 1.6, fontSize: '.95rem' }}>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* EL ENGRANAJE INTERNO */}
        <section style={{ background: 'var(--morado-o)', padding: '5rem 2rem' }}>
          <div className="section-header reveal">
            <h2 style={{ color: '#fff' }}>El engranaje <span style={{ color: 'var(--cian)' }}>interno</span></h2>
            <div className="deco-line"><span>⚙️</span></div>
            <p style={{ color: 'rgba(255,255,255,.7)' }}>Para que el arte explote en la calle, el trabajo en la sombra debe ser impecable.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            maxWidth: 1100,
            margin: '0 auto',
          }}>
            {ENGRANAJES.map(({ icon, title, desc }) => (
              <article key={title} className="reveal" style={{
                background: 'rgba(255,255,255,.06)',
                border: '2px solid rgba(0,251,207,.15)',
                borderRadius: 16,
                padding: '1.5rem',
                color: '#fff',
                transition: 'background .3s, border-color .3s',
              }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '.5rem' }}>{icon}</span>
                <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.2rem', color: 'var(--amarillo-e)', marginBottom: '.4rem' }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '.88rem', lineHeight: 1.6 }}>{desc}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
