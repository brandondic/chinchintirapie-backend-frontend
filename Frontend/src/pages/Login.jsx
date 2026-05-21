import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPasswordStrength, isPasswordValid } from '../utils/passwordStrength';

// ── Barra de fuerza ──────────────────────────────────────────────────────────
const LEVEL_CONFIG = {
  weak:   { bars: 1, color: 'var(--rojo)',    label: 'Débil'     },
  medium: { bars: 2, color: '#f39c12',        label: 'Media'     },
  strong: { bars: 3, color: '#27ae60',        label: 'Fuerte' },
};

function StrengthBar({ value }) {
  if (!value) return null;
  const { score, level, rules } = getPasswordStrength(value);
  const { bars, color, label } = LEVEL_CONFIG[level];

  return (
    <div style={{ marginTop: '.5rem' }}>
      {/* Barras */}
      <div style={{ display: 'flex', gap: 4, marginBottom: '.3rem' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            flex: 1, height: 5, borderRadius: 3,
            background: i < bars ? color : '#e0d5cc',
            transition: 'background .3s',
          }} />
        ))}
      </div>

      {/* Etiqueta nivel */}
      <span style={{ fontSize: '.75rem', fontWeight: 800, color }}>
        {label}
      </span>

      {/* Chips de requisitos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', marginTop: '.4rem' }}>
        {[
          { key: 'len',    text: '8+ chars' },
          { key: 'letter', text: 'letra'    },
          { key: 'num',    text: 'número'   },
          { key: 'sym',    text: 'símbolo'  },
        ].map(({ key, text }) => (
          <span key={key} style={{
            fontSize: '.72rem', fontWeight: 700,
            padding: '.15rem .45rem', borderRadius: 20,
            background: rules[key] ? '#e8f5e9' : '#f1f1f1',
            color:      rules[key] ? '#27ae60' : '#aaa',
            transition: 'all .2s',
          }}>
            {rules[key] ? '✓ ' : ''}{text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Campo contraseña con ojo ──────────────────────────────────────────────────
function PasswordInput({ value, onChange, placeholder = '••••••••', error, disabled, id }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '.75rem 2.8rem .75rem 1rem',
          borderRadius: 10,
          border: `2px solid ${error ? 'var(--rojo)' : 'rgba(44,26,14,.15)'}`,
          fontFamily: 'Nunito, sans-serif',
          fontSize: '.95rem',
          background: '#fdfaf5',
          color: 'var(--oscuro)',
          outline: 'none',
          marginTop: '.3rem',
          boxSizing: 'border-box',
        }}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        style={{
          position: 'absolute',
          right: '.7rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.1rem',
          color: '#999',
          padding: 0,
          lineHeight: 1,
        }}
        aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      >
        {show ? '🙈' : '👁️'}
      </button>
    </div>
  );
}

// ── Login principal ───────────────────────────────────────────────────────────
export default function Login() {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', nombre: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setServerSuccess('');

    const errs = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Correo no válido';

    if (tab === 'register') {
      if (!form.nombre.trim()) errs.nombre = 'Ingresa tu nombre';
      if (!isPasswordValid(form.password))
        errs.password = 'Debe tener 8+ caracteres, una letra, un número y un símbolo';
      if (form.password !== form.confirm) errs.confirm = 'Las contraseñas no coinciden';
    } else {
      if (form.password.length < 6) errs.password = 'Mínimo 6 caracteres';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      if (tab === 'register') {
        const data = await register(form.nombre.trim(), form.email, form.password);
        setServerSuccess(data.message || '¡Cuenta creada exitosamente!');
        setTab('login');
        setForm((f) => ({ ...f, password: '', confirm: '' }));
      } else {
        await login(form.email, form.password);
        setTimeout(() => navigate('/'), 600);
      }
    } catch (err) {
      setServerError(err.message || 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '.75rem 1rem',
    borderRadius: 10,
    border: `2px solid ${errors[field] ? 'var(--rojo)' : 'rgba(44,26,14,.15)'}`,
    fontFamily: 'Nunito, sans-serif',
    fontSize: '.95rem',
    background: '#fdfaf5',
    color: 'var(--oscuro)',
    outline: 'none',
    marginTop: '.3rem',
    boxSizing: 'border-box',
  });

  const switchTab = (key) => {
    setTab(key);
    setErrors({});
    setServerError('');
    setServerSuccess('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--morado-o) 0%, #1a0820 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
    }}>
      <div style={{
        background: '#fff', borderRadius: 24, padding: '2.5rem 2rem',
        width: '100%', maxWidth: 420, boxShadow: '0 30px 80px rgba(0,0,0,.4)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img src="/img/logo-chinchitirapie.webp" alt="Logo"
            style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: '.5rem' }} />
          <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: '1.8rem', letterSpacing: 3, color: 'var(--morado-o)' }}>
            Chinchintirapie
          </h1>
          <p style={{ color: '#6f6259', fontSize: '.85rem' }}>Portal de la Escuela Carnavalera</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '2px solid rgba(44,26,14,.1)', marginBottom: '1.5rem' }}>
          {[['login', 'Ingresar'], ['register', 'Registrarse']].map(([key, label]) => (
            <button key={key} onClick={() => switchTab(key)} style={{
              flex: 1, padding: '.6rem', border: 'none', background: 'transparent',
              fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '.95rem', cursor: 'pointer',
              color: tab === key ? 'var(--rojo)' : '#999',
              borderBottom: `3px solid ${tab === key ? 'var(--rojo)' : 'transparent'}`,
              marginBottom: -2, transition: 'all .2s',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Mensajes servidor */}
        {serverError && (
          <div style={{ background: '#fdecea', border: '1px solid var(--rojo)', borderRadius: 10, padding: '.7rem 1rem', marginBottom: '1rem', color: 'var(--rojo)', fontSize: '.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <span>⚠️</span> {serverError}
          </div>
        )}
        {serverSuccess && (
          <div style={{ background: '#e8f5e9', border: '1px solid var(--verde)', borderRadius: 10, padding: '.7rem 1rem', marginBottom: '1rem', color: '#2e7d32', fontSize: '.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <span>✅</span> {serverSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {tab === 'register' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Nombre completo</label>
              <input type="text" value={form.nombre} onChange={handleChange('nombre')} placeholder="Tu nombre" style={inputStyle('nombre')} disabled={loading} />
              {errors.nombre && <span style={{ color: 'var(--rojo)', fontSize: '.75rem' }}>{errors.nombre}</span>}
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Correo Electrónico</label>
            <input type="email" value={form.email} onChange={handleChange('email')} placeholder="tu@email.com" style={inputStyle('email')} disabled={loading} />
            {errors.email && <span style={{ color: 'var(--rojo)', fontSize: '.75rem' }}>{errors.email}</span>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Contraseña</label>
            <PasswordInput
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
              disabled={loading}
            />
            {/* Barra de fuerza solo en registro */}
            {tab === 'register' && <StrengthBar value={form.password} />}
            {errors.password && <span style={{ color: 'var(--rojo)', fontSize: '.75rem', display: 'block', marginTop: '.3rem' }}>{errors.password}</span>}
          </div>

          {tab === 'register' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Confirmar contraseña</label>
              <PasswordInput
                value={form.confirm}
                onChange={handleChange('confirm')}
                error={errors.confirm}
                disabled={loading}
              />
              {errors.confirm && <span style={{ color: 'var(--rojo)', fontSize: '.75rem', display: 'block', marginTop: '.3rem' }}>{errors.confirm}</span>}
            </div>
          )}

          {tab === 'login' && (
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
              <button type="button" onClick={() => {}} style={{ background: 'none', border: 'none', color: 'var(--rojo)', fontSize: '.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', padding: 0 }}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '.85rem',
            background: loading ? '#8e6b8f' : 'var(--morado-o)', color: 'var(--amarillo-e)',
            border: 'none', borderRadius: 12, fontFamily: 'Nunito, sans-serif',
            fontWeight: 800, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: 1, transition: 'background .2s', opacity: loading ? 0.7 : 1,
          }}>
            {loading ? '⏳ Procesando...' : tab === 'login' ? '🎭 Ingresar' : '🥁 Crear cuenta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.85rem', color: '#999' }}>
          <Link to="/" style={{ color: 'var(--rojo)', fontWeight: 700 }}>← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}