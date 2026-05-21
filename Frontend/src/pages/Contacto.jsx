import { useEffect, useState } from 'react';
import Ticker from '../components/Ticker';
import contactoService from '../services/contactoService';
import './Contacto.css';

const CHIPS = [
  '🎪 Quiero inscribirme',
  '🥁 Quiero una cotización',
  '🗓️ Quiero asistir a un evento',
  '👥 Quiero participar con mi comunidad',
  '🎭 Quiero información de talleres',
  '🎨 Colaboración artística',
  '❤️ Donaciones y apoyo',
];

const initialForm = {
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: '',
};

const slides = [
  {
    image: '/img/1.webp',
    title: 'Carnaval en movimiento',
    text: 'La calle, el ritmo y la comunidad se encuentran en cada presentación.',
  },
  {
    image: '/img/2.webp',
    title: 'Talleres con identidad',
    text: 'Aprender desde el cuerpo, la música y la fiesta colectiva.',
  },
  {
    image: '/img/3.webp',
    title: 'Fiesta para tu evento',
    text: 'Llevamos comparsas, talleres e intervenciones a distintos espacios.',
  },
];

export default function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [selectedChip, setSelectedChip] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 960);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'Por favor, escribe tu nombre completo.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Ingresa un correo válido.';
    if (!form.telefono.trim()) e.telefono = 'Por favor, ingresa tu teléfono.';
    if (!form.asunto.trim()) e.asunto = 'Selecciona o escribe un asunto.';
    if (!form.mensaje.trim()) e.mensaje = 'Cuéntanos un poco más en tu mensaje.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setServerError('');
    setLoading(true);

    // Convertir campos vacíos a null para una mejor integración con la base de datos
    const payload = Object.keys(form).reduce((acc, key) => {
      const val = form[key];
      acc[key] = (typeof val === 'string' && val.trim() === '') ? null : val;
      return acc;
    }, {});

    try {
      await contactoService.enviarMensaje(payload);
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || 'Error al enviar el mensaje. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleChip = (chip) => {
    setSelectedChip(chip);
    setForm((prev) => ({
      ...prev,
      asunto: chip,
    }));
    setErrors({});
  };

  const resetForm = () => {
    setForm(initialForm);
    setSelectedChip('');
    setErrors({});
    setSubmitted(false);
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '.8rem 1rem',
    borderRadius: 12,
    border: `2px solid ${errors[field] ? 'var(--rojo)' : 'rgba(44,26,14,.15)'}`,
    fontFamily: 'Nunito, sans-serif',
    fontSize: '.95rem',
    background: '#fffaf4',
    color: 'var(--oscuro)',
    outline: 'none',
    transition: 'all .2s ease',
    marginTop: '.35rem',
    boxSizing: 'border-box',
  });
  const labelStyle = {
    fontWeight: 800,
    fontSize: '.9rem',
    color: 'var(--oscuro)',
  };
  const errorStyle = {
    color: 'var(--rojo)',
    fontSize: '.78rem',
    marginTop: '.25rem',
    display: 'block',
  };

  return (
    <>
      <Ticker text="🎭 Contáctanos · Súmate al carnaval · Ritmo, comunidad y fiesta · Chinchintirapie" />
      <div className="contacto-container">
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '2rem', alignItems: 'stretch' }}>
          {/* Carrusel de fotos */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 520, alignSelf: 'center' }}>
            <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,.10)' }}>
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,.32)', color: '#fff', padding: '1.2rem 1.2rem 1.5rem', borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}>
                <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.5rem', margin: 0 }}>{slides[currentSlide].title}</h3>
                <p style={{ fontSize: '.98rem', margin: '.3rem 0 0' }}>{slides[currentSlide].text}</p>
                <div style={{ marginTop: '.8rem', display: 'flex', gap: '.5rem', justifyContent: 'center' }}>
                  <button type="button" onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))} aria-label="Anterior" style={{ background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>‹</button>
                  <button type="button" onClick={() => setAutoPlay((prev) => !prev)} aria-label={autoPlay ? 'Pausar carrusel' : 'Reanudar carrusel'} style={{ background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: '1rem', cursor: 'pointer' }}>{autoPlay ? '❚❚' : '▶'}</button>
                  <button type="button" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} aria-label="Siguiente" style={{ background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>›</button>
                </div>
                <div style={{ marginTop: '.7rem', display: 'flex', gap: '.3rem', justifyContent: 'center' }}>
                  {slides.map((_, idx) => (
                    <button key={idx} type="button" onClick={() => setCurrentSlide(idx)} aria-label={`Ir a la imagen ${idx + 1}`} style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', cursor: 'pointer', background: currentSlide === idx ? '#ffd166' : 'rgba(255,255,255,.45)' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Formulario de contacto */}
          <div style={{ flex: 1.2, minWidth: 320 }}>
            <h2 className="contacto-title">Contáctanos</h2>
            <div className="contacto-info" style={{ marginBottom: '1.2rem' }}>
              📧 Correo: <a href="mailto:chinchintirapie@gmail.com" style={{ color: 'var(--rojo)', fontWeight: 800 }}>chinchintirapie@gmail.com</a>
            </div>
            {submitted ? (
              <div style={{ background: '#fff', borderRadius: 18, padding: '2.5rem 1.5rem', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,.08)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.5rem', color: 'var(--oscuro)', marginBottom: '.6rem' }}>¡Tu mensaje ya está bailando con nosotros!</h3>
                <p style={{ color: '#6f6259' }}>Gracias por escribir a Chinchintirapie. Te responderemos pronto.</p>
                <button type="button" onClick={resetForm} style={{ marginTop: '1.5rem', padding: '.8rem 1.4rem', background: 'var(--rojo)', color: '#fff', border: 'none', borderRadius: 12, fontFamily: 'Nunito, sans-serif', fontWeight: 800, cursor: 'pointer' }}>Enviar otro mensaje</button>
              </div>
            ) : (
              <form className="contacto-form" onSubmit={handleSubmit} noValidate>
                {serverError && (
                  <div style={{
                    background: '#fde8e8',
                    color: 'var(--rojo)',
                    padding: '.75rem 1rem',
                    borderRadius: 10,
                    marginBottom: '1rem',
                    fontSize: '.88rem',
                    border: '1px solid rgba(192,57,43,.2)',
                    fontFamily: 'Nunito, sans-serif',
                  }}>
                    ⚠️ {serverError}
                  </div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '1.2rem', justifyContent: 'center' }}>
                  {CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleChip(chip)}
                      style={{
                        fontSize: '.82rem',
                        fontWeight: 800,
                        padding: '.45rem .85rem',
                        borderRadius: 999,
                        border: `1px solid ${selectedChip === chip ? 'rgba(192,57,43,.45)' : 'rgba(63,45,34,.15)'}`,
                        background: selectedChip === chip ? 'linear-gradient(135deg, rgba(192,57,43,.14), rgba(255,193,7,.16))' : '#fffaf5',
                        color: selectedChip === chip ? 'var(--rojo)' : '#6f6259',
                        cursor: 'pointer',
                        transition: 'all 140ms',
                        fontFamily: 'Nunito, sans-serif',
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>¿Cómo te llamas? <span style={{ color: 'var(--rojo)' }}>*</span></label>
                    <input type="text" value={form.nombre} onChange={handleChange('nombre')} placeholder="Tu nombre completo" style={inputStyle('nombre')} />
                    {errors.nombre && <span style={errorStyle}>{errors.nombre}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>¿Dónde te respondemos? <span style={{ color: 'var(--rojo)' }}>*</span></label>
                    <input type="email" value={form.email} onChange={handleChange('email')} placeholder="tu@email.com" style={inputStyle('email')} />
                    {errors.email && <span style={errorStyle}>{errors.email}</span>}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Teléfono de contacto <span style={{ color: 'var(--rojo)' }}>*</span></label>
                  <input type="tel" value={form.telefono} onChange={handleChange('telefono')} placeholder="+56 9 1234 5678" style={inputStyle('telefono')} />
                  {errors.telefono && <span style={errorStyle}>{errors.telefono}</span>}
                </div>
                <div>
                  <label style={labelStyle}>Asunto <span style={{ color: 'var(--rojo)' }}>*</span></label>
                  <input type="text" value={form.asunto} onChange={handleChange('asunto')} placeholder="Selecciona un chip o escribe tu asunto" style={{ ...inputStyle('asunto'), background: selectedChip ? '#f7efe6' : '#fffaf4' }} />
                  {errors.asunto && <span style={errorStyle}>{errors.asunto}</span>}
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Tu mensaje <span style={{ color: 'var(--rojo)' }}>*</span></label>
                  <textarea value={form.mensaje} onChange={handleChange('mensaje')} rows={5} placeholder="Escríbenos tu mensaje y te responderemos con alegría carnavalera..." style={{ ...inputStyle('mensaje'), resize: 'vertical' }} />
                  {errors.mensaje && <span style={errorStyle}>{errors.mensaje}</span>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '.95rem',
                    background: loading ? 'rgba(192,57,43,.6)' : 'linear-gradient(135deg, var(--rojo), #d35400)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 14,
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 900,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    letterSpacing: '.03em',
                    boxShadow: '0 8px 18px rgba(192,57,43,.22)',
                  }}
                >
                  {loading ? '🎭 Enviando...' : '🎭 Enviar Mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
