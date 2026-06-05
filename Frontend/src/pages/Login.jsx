import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
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

  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Escuchar el fragmento de la URL (hash) para capturar el token que devuelve Google tras el inicio de sesión
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleGoogleCallback = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes('id_token=')) {
        const params = new URLSearchParams(hash.substring(1));
        const idToken = params.get('id_token');

        if (idToken) {
          setServerError('');
          setLoading(true);
          try {
            const role = await loginWithGoogle(idToken);
            const normalizedRole = role ? role.toUpperCase() : '';
            // Limpiar el hash de la URL para que quede limpia la barra de direcciones
            window.history.replaceState(null, null, ' ');
            navigate(normalizedRole === 'ADMIN' ? '/admin' : '/');
          } catch (err) {
            setServerError(err.message || 'Error al iniciar sesión con Google');
          } finally {
            setLoading(false);
          }
        }
      }
    };

    handleGoogleCallback();
  }, [loginWithGoogle, navigate]);

  const handleGoogleLogin = async () => {
    setServerError('');
    setLoading(true);
    try {
      // 1. Obtiene el Client ID del backend al hacer click
      const clientId = await authService.getGoogleClientId();

      if (!clientId) {
        setServerError('No se pudo obtener el Client ID de Google desde el servidor.');
        setLoading(false);
        return;
      }

      // 2. Construye la URL de redirección hacia Google OAuth 2.0 (Implicit Flow)
      const redirectUri = window.location.origin + '/login';
      const state = Math.random().toString(36).substring(2);
      const nonce = Math.random().toString(36).substring(2);

      const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth` +
        `?client_id=${clientId}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=id_token` +
        `&scope=openid%20email%20profile` +
        `&state=${state}` +
        `&nonce=${nonce}`;

      // 3. Redirige al flujo de Google
      window.location.href = oauthUrl;
    } catch (err) {
      console.error("Error al iniciar Google Auth:", err);
      setServerError('Error al conectar con el servidor para obtener las credenciales de Google. Asegúrese de que el backend esté ejecutándose.');
      setLoading(false);
    }
  };

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
        const data = await login(form.email, form.password);
        const userRole = data?.role ? data.role.toUpperCase() : '';
        setTimeout(() => navigate(userRole === 'ADMIN' ? '/admin' : '/'), 600);
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
            {loading ? '⏳ Procesando...' : tab === 'login' ? 'Ingresar' : 'Crear cuenta'}
          </button>
        </form>

        <div className="google-divider">
          <span>o continúa con</span>
        </div>

        <div style={{ marginTop: '1.5rem', width: '100%' }}>
          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            {loading ? 'Procesando...' : 'Continuar con Google'}
          </button>
        </div>

        <p className="login-footer">
          <Link to="/" className="login-back-link">← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}