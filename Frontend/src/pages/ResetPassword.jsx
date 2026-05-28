import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

export default function ResetPassword() {
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setServerError('Token inválido o no proporcionado.');
    }
  }, [location]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (serverError && serverError !== 'Token inválido o no proporcionado.') setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setServerSuccess('');

    if (!token) {
      setServerError('Token inválido o no proporcionado.');
      return;
    }

    const errs = {};
    if (!isPasswordValid(form.password))
      errs.password = 'Debe tener 8+ caracteres, una letra, un número y un símbolo';
    if (form.password !== form.confirm) errs.confirm = 'Las contraseñas no coinciden';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const data = await authService.resetPassword(token, form.password);
      setServerSuccess(data.message || 'Contraseña restablecida exitosamente.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setServerError(err.message || 'Error al restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="login-brand">
          <img src="/img/logo-chinchitirapie.webp" alt="Logo" className="login-logo" />
          <h1 className="login-title">Nueva Contraseña</h1>
          <p className="login-subtitle">Ingresa tu nueva contraseña para acceder a tu cuenta</p>
        </div>

        {serverError && (
          <div className="login-alert login-alert--error">
            <span>⚠️</span> {serverError}
          </div>
        )}
        {serverSuccess && (
          <div className="login-alert login-alert--success">
            <span>✅</span> {serverSuccess} <br/> Redirigiendo al login...
          </div>
        )}

        {!serverSuccess && (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Nueva Contraseña</label>
              <PasswordInput
                value={form.password}
                onChange={handleChange('password')}
                error={errors.password}
                disabled={loading || !token}
              />
              <StrengthBar value={form.password} />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirmar contraseña</label>
              <PasswordInput
                value={form.confirm}
                onChange={handleChange('confirm')}
                error={errors.confirm}
                disabled={loading || !token}
              />
              {errors.confirm && <span className="form-error">{errors.confirm}</span>}
            </div>

            <button type="submit" disabled={loading || !token} className={`submit-btn ${loading ? 'loading' : ''}`}>
              {loading ? '⏳ Procesando...' : '💾 Guardar Contraseña'}
            </button>
          </form>
        )}

        <p className="login-footer">
          <Link to="/login" className="login-back-link">← Volver al login</Link>
        </p>
      </div>
    </div>
  );
}
