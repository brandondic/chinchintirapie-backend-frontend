import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';

const CRONICAS = [
  {
    emoji: '📰', date: 'Diciembre 2023',
    title: 'El carnaval que resistió el frío',
    body: 'Crónica del desfile de invierno donde más de 150 personas tomaron las calles de Santiago con bombos y trajes de papel maché. Una jornada que demostró que el carnaval no tiene estación.',
    author: 'Claudia Fierro',
    tags: ['Carnaval', 'Crónica', '2023'],
  },
  {
    emoji: '🎺', date: 'Agosto 2023',
    title: 'La murga que aprendió sola',
    body: 'Reportaje sobre el proceso de formación autónoma del cuerpo de banda de Chinchintirapie. Entrevistas con percusionistas que nunca habían tocado antes de entrar a la escuela.',
    author: 'Roberto Núñez',
    tags: ['Banda', 'Formación', '2023'],
  },
  {
    emoji: '💃', date: 'Junio 2023',
    title: 'Cuerpos que dicen lo que la voz no puede',
    body: 'Reflexión sobre el papel del cuerpo en el carnaval callejero. La danza como lenguaje de resistencia y alegría en barrios periféricos de Santiago.',
    author: 'Marcela Godoy',
    tags: ['Danza', 'Reflexión', '2023'],
  },
  {
    emoji: '🎭', date: 'Marzo 2023',
    title: '20 años de máscaras y verdades',
    body: 'Repaso histórico de los personajes que han habitado el carnaval de Chinchintirapie. Desde el primer figurín hasta las creaciones colectivas del aniversario.',
    author: 'Equipo CEDOC',
    tags: ['Historia', 'Figurines', '2023'],
  },
];

export function Cronicas() {
  useReveal();
  return (
    <>
      <Ticker text="📰 Crónicas · Relatos vivos · Historia contada desde adentro · Escuela Carnavalera" />
      <PageHero badge="📰 Periodismo Carnavalero" title="Crónicas" description="Relatos, entrevistas y notas que cuentan la historia viva de la escuela y sus protagonistas en las calles." />
      <section style={{ padding: '4rem 2rem', background: 'var(--crema)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {CRONICAS.map(({ emoji, date, title, body, author, tags }) => (
            <article key={title} className="reveal" style={{
              background: '#fff',
              borderRadius: 20,
              padding: '2rem',
              boxShadow: '0 8px 24px rgba(0,0,0,.07)',
              display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12, flexShrink: 0,
                background: 'linear-gradient(135deg, var(--morado-o), var(--purpura))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
              }}>{emoji}</div>
              <div>
                <p style={{ color: '#999', fontSize: '.78rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '.3rem' }}>{date}</p>
                <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.4rem', color: 'var(--oscuro)', marginBottom: '.5rem' }}>{title}</h3>
                <p style={{ color: '#5a3e2b', lineHeight: 1.7, fontSize: '.95rem', marginBottom: '.8rem' }}>{body}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '.5rem' }}>
                  <div style={{ display: 'flex', gap: '.5rem' }}>
                    {tags.map((t) => <span key={t} className="meta-tag">{t}</span>)}
                  </div>
                  <span style={{ color: '#999', fontSize: '.82rem' }}>Por {author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

const REPO_ITEMS = [
  { emoji: '📷', title: 'Carnaval 2023 – Galería fotográfica', type: 'Foto', year: '2023', count: '120 fotos' },
  { emoji: '🎬', title: 'Desfile de Carnaval 2022 – Video completo', type: 'Video', year: '2022', count: '48 min' },
  { emoji: '🎵', title: 'Grabaciones de ensayo 2021', type: 'Audio', year: '2021', count: '12 pistas' },
  { emoji: '📄', title: 'Documentos fundacionales 2006–2010', type: 'Documento', year: '2006', count: '23 archivos' },
  { emoji: '📷', title: 'Carnaval 2019 – Archivo fotográfico', type: 'Foto', year: '2019', count: '87 fotos' },
  { emoji: '🎬', title: 'Mil Tambores 2018 – Registro en video', type: 'Video', year: '2018', count: '1h 12 min' },
];

export function Repositorio() {
  const [search, setSearch] = useState('');
  useReveal();

  const filtered = REPO_ITEMS.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Ticker text="📂 Repositorio Documental · Fotografías · Videos · Audios · Documentos históricos" />
      <PageHero badge="📂 Archivo Digital" title="Repositorio Documental" description="Fotografías, audiovisuales y documentos de todas las ediciones del carnaval, desde los primeros ensayos hasta los últimos desfiles." />
      <div className="search-bar-wrap">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar en el repositorio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍 Buscar</button>
        </div>
      </div>
      <section style={{ padding: '4rem 2rem', background: 'var(--crema)' }}>
        <div className="media-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {filtered.map(({ emoji, title, type, year, count }) => (
            <div key={title} className="media-card reveal">
              <div className="media-thumb" style={{ background: `linear-gradient(135deg, var(--morado-o), var(--purpura))` }}>
                <span>{emoji}</span>
                <div className="play-icon">▶</div>
              </div>
              <div className="media-info">
                <span className="media-tag">{type}</span>
                <h4>{title}</h4>
                <p>{year} · {count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const EDU_ITEMS = [
  { emoji: '📖', title: 'Guía de Percusión para Principiantes', type: 'Guía', level: 'Básico', pages: '24 págs.' },
  { emoji: '🎭', title: 'Manual de Teatro Callejero', type: 'Manual', level: 'Intermedio', pages: '48 págs.' },
  { emoji: '👗', title: 'Técnicas de Vestuario Carnavalero', type: 'Tutorial', level: 'Avanzado', pages: '36 págs.' },
  { emoji: '💃', title: 'Cuaderno de Danza Andina Vol. 1', type: 'Cuaderno', level: 'Básico', pages: '30 págs.' },
  { emoji: '🥁', title: 'Partituras de Murga – Selección', type: 'Partitura', level: 'Intermedio', pages: '18 págs.' },
  { emoji: '🌍', title: 'Historia del Carnaval Latinoamericano', type: 'Ensayo', level: 'Todos', pages: '52 págs.' },
];

export function MaterialEducativo() {
  useReveal();
  return (
    <>
      <Ticker text="📚 Material Educativo · Guías · Manuales · Cuadernos · Para todos los niveles" />
      <PageHero badge="📚 Recursos Pedagógicos" title="Material Educativo" description="Guías, manuales, partituras y cuadernos pedagógicos desarrollados por la escuela para compartir el saber carnavalero." />
      <section style={{ padding: '4rem 2rem', background: 'var(--crema)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
          maxWidth: 1100,
          margin: '0 auto',
        }}>
          {EDU_ITEMS.map(({ emoji, title, type, level, pages }) => (
            <article key={title} className="reveal" style={{
              background: '#fff',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,.07)',
            }}>
              <div style={{
                height: 120, background: 'linear-gradient(135deg, var(--oscuro), #5a3e2b)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem',
              }}>{emoji}</div>
              <div style={{ padding: '1.2rem' }}>
                <span className="media-tag">{type}</span>
                <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.1rem', color: 'var(--oscuro)', margin: '.4rem 0' }}>{title}</h3>
                <p style={{ fontSize: '.8rem', color: '#7a5c40', marginBottom: '.8rem' }}>Nivel: {level} · {pages}</p>
                <button type="button" className="download-btn" style={{ width: '100%', justifyContent: 'center' }}>⬇ Descargar gratis</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
