import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Login.css';

export default function RecuperarPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Correo no válido');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.forgotPassword(email);
      setSuccess(data.message || 'Se ha enviado un correo con las instrucciones.');
    } catch (err) {
      setError(err.message || 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="login-brand">
          <img src="/img/logo-chinchitirapie.webp" alt="Logo" className="login-logo" />
          <h1 className="login-title">Recuperar Contraseña</h1>
          <p className="login-subtitle">Ingresa tu correo para recibir un enlace de recuperación</p>
        </div>

        {error && (
          <div className="login-alert login-alert--error">
            <span>⚠️</span> {error}
          </div>
        )}
        {success && (
          <div className="login-alert login-alert--success">
            <span>✅</span> {success}
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Correo Electrónico</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="tu@email.com" 
                className={`login-input ${error ? 'error' : ''}`} 
                disabled={loading} 
              />
            </div>

            <button type="submit" disabled={loading} className={`submit-btn ${loading ? 'loading' : ''}`}>
              {loading ? '⏳ Procesando...' : '📩 Enviar enlace'}
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
