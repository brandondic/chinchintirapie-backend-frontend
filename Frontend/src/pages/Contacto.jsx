import { useEffect, useState } from 'react';
import Ticker from '../components/Ticker';
import PageHero from '../components/PageHero';
import contactoService from '../services/contactoService';
import '../styles/Contacto.css';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

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
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setServerError('');
    setLoading(true);
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
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleChip = (chip) => {
    setSelectedChip(chip);
    setForm((prev) => ({ ...prev, asunto: chip }));
    setErrors((prev) => ({ ...prev, asunto: undefined }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setSelectedChip('');
    setErrors({});
    setSubmitted(false);
  };

  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <>
      <Ticker text="🎭 Contáctanos · Súmate al carnaval · Ritmo, comunidad y fiesta · Chinchintirapie" />

      <PageHero
        badge="✉ Escríbenos"
        titleEm="Contacto"
        title=""
        description="¿Quieres inscribirte, participar o conocernos? Escríbenos y te respondemos con alegría carnavalera."
      />

      <div className="contacto-wrapper">
        <div className="contacto-container">

          {/* ── Carrusel ── */}
          <div className="contacto-carousel">
            <div className="carousel-frame">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
              />
              <div className="carousel-caption">
                <h3>{slides[currentSlide].title}</h3>
                <p>{slides[currentSlide].text}</p>
                <div className="carousel-controls">
                  <button type="button" className="carousel-btn" onClick={prevSlide} aria-label="Anterior">‹</button>
                  <button
                    type="button"
                    className="carousel-btn pause"
                    onClick={() => setAutoPlay((p) => !p)}
                    aria-label={autoPlay ? 'Pausar' : 'Reanudar'}
                  >
                    {autoPlay ? '❚❚' : '▶'}
                  </button>
                  <button type="button" className="carousel-btn" onClick={nextSlide} aria-label="Siguiente">›</button>
                </div>
                <div className="carousel-dots">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`carousel-dot${currentSlide === idx ? ' active' : ''}`}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Ir a imagen ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Formulario ── */}
          {submitted ? (
            <div className="success-screen">
              <span className="success-icon">🎉</span>
              <h3>¡Tu mensaje ya está bailando con nosotros!</h3>
              <p>Gracias por escribir a Chinchintirapie. Te responderemos pronto.</p>
              <button type="button" className="btn-reset" onClick={resetForm}>
                ✉ Enviar otro mensaje
              </button>
            </div>
          ) : (
            <div className="contacto-panel">
              <h2 className="contacto-title">
                <span>Háblanos</span> de ti
              </h2>
              <p className="contacto-subtitle">
                📧 <a href="mailto:chinchintirapie@gmail.com">chinchintirapie@gmail.com</a>
              </p>

              {/* Chips de asunto */}
              <div className="chips-wrap">
                {CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={`chip${selectedChip === chip ? ' active' : ''}`}
                    onClick={() => handleChip(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <form className="contacto-form" onSubmit={handleSubmit} noValidate>
                {serverError && (
                  <div className="server-error">⚠️ {serverError}</div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label>¿Cómo te llamas? <span className="required">*</span></label>
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={handleChange('nombre')}
                      placeholder="Tu nombre completo"
                      className={errors.nombre ? 'error' : ''}
                    />
                    {errors.nombre && <span className="field-error">⚠ {errors.nombre}</span>}
                  </div>
                  <div className="form-group">
                    <label>¿Dónde te respondemos? <span className="required">*</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="tu@email.com"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="field-error">⚠ {errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Teléfono de contacto <span className="required">*</span></label>
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={handleChange('telefono')}
                    placeholder="+56 9 1234 5678"
                    className={errors.telefono ? 'error' : ''}
                  />
                  {errors.telefono && <span className="field-error">⚠ {errors.telefono}</span>}
                </div>

                <div className="form-group">
                  <label>Asunto <span className="required">*</span></label>
                  <input
                    type="text"
                    value={form.asunto}
                    onChange={handleChange('asunto')}
                    placeholder="Selecciona un chip arriba o escribe tu asunto"
                    className={errors.asunto ? 'error' : ''}
                  />
                  {errors.asunto && <span className="field-error">⚠ {errors.asunto}</span>}
                </div>

                <div className="form-group">
                  <label>Tu mensaje <span className="required">*</span></label>
                  <textarea
                    value={form.mensaje}
                    onChange={handleChange('mensaje')}
                    rows={5}
                    placeholder="Escríbenos tu mensaje y te responderemos con alegría carnavalera..."
                    className={errors.mensaje ? 'error' : ''}
                  />
                  {errors.mensaje && <span className="field-error">⚠ {errors.mensaje}</span>}
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? '🎭 Enviando...' : '🎭 Enviar Mensaje'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
