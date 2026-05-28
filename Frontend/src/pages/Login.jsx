import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPasswordStrength, isPasswordValid } from '../utils/passwordStrength';
import '../styles/Login.css';

// ── Barra de fuerza ──────────────────────────────────────────────────────────
const LEVEL_CONFIG = {
  weak:   { bars: 1, color: 'var(--rojo)',    label: 'Débil'     },
  medium: { bars: 2, color: '#f39c12',        label: 'Media'     },
  strong: { bars: 3, color: '#27ae60',        label: 'Fuerte' },
};

function StrengthBar({ value }) {
  if (!value) return null;
  const { level, rules } = getPasswordStrength(value);
  const { bars, label } = LEVEL_CONFIG[level] || LEVEL_CONFIG.weak;

  return (
    <div className={`strength-bar strength-bar--${level}`}>
      <div className="strength-bar__bars">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`strength-bar__segment ${i < bars ? 'is-active' : ''}`} />
        ))}
      </div>
      <span className="strength-level">{label}</span>
      <div className="strength-rules">
        {[
          { key: 'len',    text: '8+ chars' },
          { key: 'letter', text: 'letra' },
          { key: 'num',    text: 'número' },
          { key: 'sym',    text: 'símbolo' },
        ].map(({ key, text }) => (
          <span key={key} className={`strength-rule ${rules[key] ? 'is-valid' : ''}`}>
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
    <div className="password-input-wrapper">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`password-input ${error ? 'error' : ''}`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="password-toggle"
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

  const inputClass = (field) => `login-input ${errors[field] ? 'error' : ''}`;

  const switchTab = (key) => {
    setTab(key);
    setErrors({});
    setServerError('');
    setServerSuccess('');
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        {/* Logo */}
        <div className="login-brand">
          <img src="/img/logo-chinchitirapie.webp" alt="Logo" className="login-logo" />
          <h1 className="login-title">Chinchintirapie</h1>
          <p className="login-subtitle">Portal de la Escuela Carnavalera</p>
        </div>

        {/* Tabs */}
        <div className="login-tabs">
          {[['login', 'Ingresar'], ['register', 'Registrarse']].map(([key, label]) => (
            <button key={key} type="button" onClick={() => switchTab(key)} className={`login-tab ${tab === key ? 'active' : ''}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Mensajes servidor */}
        {serverError && (
          <div className="login-alert login-alert--error">
            <span>⚠️</span> {serverError}
          </div>
        )}
        {serverSuccess && (
          <div className="login-alert login-alert--success">
            <span>✅</span> {serverSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {tab === 'register' && (
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input type="text" value={form.nombre} onChange={handleChange('nombre')} placeholder="Tu nombre" className={inputClass('nombre')} disabled={loading} />
              {errors.nombre && <span className="form-error">{errors.nombre}</span>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" value={form.email} onChange={handleChange('email')} placeholder="tu@email.com" className={inputClass('email')} disabled={loading} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <PasswordInput
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
              disabled={loading}
            />
            {tab === 'register' && <StrengthBar value={form.password} />}
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          {tab === 'register' && (
            <div className="form-group">
              <label className="form-label">Confirmar contraseña</label>
              <PasswordInput
                value={form.confirm}
                onChange={handleChange('confirm')}
                error={errors.confirm}
                disabled={loading}
              />
              {errors.confirm && <span className="form-error">{errors.confirm}</span>}
            </div>
          )}

          {tab === 'login' && (
            <div className="form-group login-forgot-container">
              <Link to="/recuperar-password" className="login-forgot">¿Olvidaste tu contraseña?</Link>
            </div>
          )}

          <button type="submit" disabled={loading} className={`submit-btn ${loading ? 'loading' : ''}`}>
            {loading ? '⏳ Procesando...' : tab === 'login' ? '🎭 Ingresar' : '🥁 Crear cuenta'}
          </button>
        </form>

        <p className="login-footer">
          <Link to="/" className="login-back-link">← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}