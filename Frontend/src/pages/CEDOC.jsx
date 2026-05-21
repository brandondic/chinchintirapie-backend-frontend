import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';

const ARTICLES = [
  {
    icon: '🎺',
    iconStyle: {},
    title: 'La murga chilena y sus raíces rioplatenses',
    desc: 'Ensayo comparativo sobre los orígenes de la murga en el Cono Sur y su adaptación a la realidad barrial santiaguina. Analiza ritmos, instrumentación y prácticas colectivas desde 1980.',
    tags: ['banda', 'historia', '2024', '22 págs.'],
    status: 'published',
  },
  {
    icon: '💃',
    iconStyle: { background: 'linear-gradient(135deg,var(--turquesa),var(--verde))' },
    title: 'Cuerpo, ritmo y comunidad: el baile en el carnaval popular',
    desc: 'Investigación etnográfica sobre el rol del cuerpo en el carnaval callejero. Entrevistas con 30 bailarinas y bailarines sobre su experiencia y transformación personal.',
    tags: ['baile', 'figura', 'comunidad', '2023'],
    status: 'published',
  },
  {
    icon: '🎭',
    iconStyle: { background: 'linear-gradient(135deg,var(--amarillo),var(--dorado))' },
    title: 'La figura carnavalera como dispositivo político',
    desc: 'Reflexión teórica sobre cómo el vestuario, la máscara y el personaje carnavalero operan como formas de crítica social y subversión cultural en el espacio público.',
    tags: ['figura', 'historia', '2022', '18 págs.'],
    status: 'published',
  },
  {
    icon: '🏘️',
    iconStyle: { background: 'linear-gradient(135deg,#8e44ad,#6c3483)' },
    title: 'Carnaval y transformación barrial: 20 años en Nono 380',
    desc: 'Estudio de caso sobre el impacto comunitario de Chinchintirapie. Mapeo de redes sociales, participación vecinal y transformación del espacio urbano.',
    tags: ['comunidad', 'historia', '2024', '35 págs.'],
    status: 'published',
  },
  {
    icon: '🥁',
    iconStyle: { background: 'linear-gradient(135deg,var(--naranja),var(--rojo))' },
    title: 'Percusión colectiva: el bombo como articulador social',
    desc: 'Análisis musicológico y social del rol del bombo en la murga popular. Incluye transcripciones rítmicas y reflexiones sobre la escucha colectiva.',
    tags: ['banda', 'baile', '2021', '28 págs.'],
    status: 'published',
  },
  {
    icon: '📝',
    iconStyle: { background: 'linear-gradient(135deg,#2c3e50,#34495e)' },
    title: 'Memoria corporal y transmisión oral en la danza andina',
    desc: 'Investigación en desarrollo sobre cómo se transmite el conocimiento coreográfico. Metodología participante con registro en video.',
    tags: ['baile', 'figura', '2025–2026', 'En proceso'],
    status: 'in-progress',
  },
  {
    icon: '🌍',
    iconStyle: { background: 'linear-gradient(135deg,var(--verde),#0e6655)' },
    title: 'Carnaval latinoamericano en diáspora: redes y territorios',
    desc: 'Mapeo de escuelas carnavaleras en Chile, Argentina, Uruguay y Colombia. Análisis de intercambios e identidad latinoamericana.',
    tags: ['comunidad', 'banda', '2025', 'En proceso'],
    status: 'in-progress',
  },
];

const TIMELINE = [
  { year: '2004', text: 'Fundación de Chinchintirapie. Primeros ensayos en Nono 380 con 12 integrantes.' },
  { year: '2007', text: 'Primer desfile callejero oficial. Nace el formato de carnaval barrial con tres cuerpos.' },
  { year: '2010', text: 'Se formaliza la escuela con talleres permanentes de percusión, danza y vestuario.' },
  { year: '2012', text: 'Primera investigación académica sobre la murga. Alianza con universidad local.' },
  { year: '2015', text: 'Décimo aniversario. Gran desfile con 200 participantes y primer cuaderno de la escuela.' },
  { year: '2018', text: 'Nace el CEDOC como espacio de documentación y reflexión sistemática.' },
  { year: '2020', text: 'Carnaval virtual durante pandemia. Adaptación digital y producción de podcasts.' },
  { year: '2022', text: 'Retorno a la calle. Primer Festival Internacional de Murga.' },
  { year: '2024', text: 'Veinte aniversario. Publicación del libro "20 años de carnaval en la calle".' },
  { year: '2026', text: 'Temporada actual. Nuevas investigaciones en curso y ampliación del archivo digital.' },
];

const DOWNLOADS = [
  { emoji: '📗', label: 'Cuaderno de la Escuela Vol. 1', size: 'PDF · 4.2MB' },
  { emoji: '📘', label: 'Cuaderno de la Escuela Vol. 2', size: 'PDF · 5.8MB' },
  { emoji: '📙', label: 'Glosario Carnavalero',          size: 'PDF · 1.1MB', gold: true },
  { emoji: '📕', label: 'Libro 20 Aniversario',          size: 'PDF · 12MB' },
  { emoji: '🗺',  label: 'Mapa de Escuelas Latam',        size: 'PDF · 2.3MB' },
];

const TOPICS = ['Murga', 'Percusión', 'Danza Andina', 'Vestuario', 'Teatro Callejero', 'Memoria', 'Comunidad', 'Identidad', 'Género', 'Territorio', 'Oralidad', 'Corporalidad'];

const FILTERS = ['all', 'banda', 'baile', 'figura', 'historia', 'comunidad'];

const STATS = [
  { num: '48', label: 'Investigaciones' },
  { num: '120', label: 'Documentos' },
  { num: '15', label: 'Autores' },
  { num: '3', label: 'Líneas temáticas' },
];

export default function CEDOC() {
  const [activeFilter, setActiveFilter] = useState('all');
  useReveal();

  const visibleArticles = activeFilter === 'all'
    ? ARTICLES
    : ARTICLES.filter((a) => a.tags.some((t) => t.toLowerCase() === activeFilter));

  return (
    <>
      <Ticker text="📚 Centro de Documentación e Investigación · Ensayos · Investigaciones culturales · Documentos descargables" />

      <PageHero
        badge="📚 Investigación & Documentación"
        titleEm="CEDOC"
        title="Carnavalero"
        description="Centro de documentación e investigación sobre banda, baile y figura. Ensayos, investigaciones y reflexiones culturales."
      />

      {/* Stats */}
      <div className="stats-strip">
        {STATS.map(({ num, label }) => (
          <div className="strip-stat" key={label}>
            <span className="s-num">{num}</span>
            <span className="s-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-tab${activeFilter === f ? ' active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f === 'all' ? 'Todos' : f === 'banda' ? '🎺 Banda' : f === 'baile' ? '💃 Baile'
              : f === 'figura' ? '🎭 Figura' : f === 'historia' ? '📜 Historia' : '🏘️ Comunidad'}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <main>
        <div className="cedoc-layout">
          {/* Artículos */}
          <div className="cedoc-main">
            <section>
              <h2>✦ Artículos Destacados</h2>
              {visibleArticles.filter((a) => a.status === 'published').map((a) => (
                <div className="article-card reveal" key={a.title}>
                  <div className="article-icon" style={a.iconStyle}>{a.icon}</div>
                  <div className="article-body">
                    <h3>{a.title}</h3>
                    <p>{a.desc}</p>
                    <div className="article-meta">
                      {a.tags.map((t) => <span className="meta-tag" key={t}>{t}</span>)}
                    </div>
                    <button type="button" className="download-btn">⬇ Descargar PDF</button>
                  </div>
                </div>
              ))}
            </section>

            <section>
              <h2>🔬 Investigaciones en Curso</h2>
              {visibleArticles.filter((a) => a.status === 'in-progress').map((a) => (
                <div className="article-card reveal" key={a.title}>
                  <div className="article-icon" style={a.iconStyle}>{a.icon}</div>
                  <div className="article-body">
                    <h3>{a.title}</h3>
                    <p>{a.desc}</p>
                    <div className="article-meta">
                      {a.tags.map((t) => <span className="meta-tag" key={t}>{t}</span>)}
                    </div>
                    <button type="button" className="download-btn" style={{ background: 'var(--dorado)', color: 'var(--oscuro)' }}>👁 Ver avance</button>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="cedoc-sidebar">
            <div className="sidebar-widget reveal">
              <h3>⏳ Línea de Tiempo</h3>
              <div className="timeline">
                {TIMELINE.map(({ year, text }) => (
                  <div className="timeline-item" key={year}>
                    <div className="timeline-year">{year}</div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-widget reveal">
              <h3>📄 Descargas Rápidas</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
                {DOWNLOADS.map(({ emoji, label, size, gold }) => (
                  <button key={label} type="button" className="download-btn"
                    style={{
                      justifyContent: 'space-between',
                      ...(gold ? { background: 'var(--dorado)', color: 'var(--oscuro)' } : {}),
                    }}>
                    <span>{emoji} {label}</span>
                    <span style={{ fontSize: '.7rem', opacity: .7 }}>{size}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-widget reveal">
              <h3>🏷 Temas de Investigación</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                {TOPICS.map((t) => (
                  <span key={t} className="meta-tag" style={{ fontSize: '.82rem', padding: '.3rem .7rem' }}>{t}</span>
                ))}
              </div>
            </div>

            <div className="sidebar-widget reveal" style={{ background: 'var(--oscuro)', border: '2px solid var(--dorado)' }}>
              <h3 style={{ color: 'var(--amarillo)' }}>✉ Envía tu Investigación</h3>
              <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.6, marginBottom: '1rem' }}>
                ¿Tienes una investigación sobre carnaval y cultura popular? El CEDOC recibe colaboraciones externas.
              </p>
              <a href="mailto:cedoc@chinchintirapie.cl" className="download-btn"
                style={{ background: 'var(--rojo)', color: '#fff', display: 'block', textAlign: 'center' }}>
                📨 Enviar propuesta
              </a>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
