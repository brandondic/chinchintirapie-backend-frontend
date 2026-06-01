import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Perfil.css';

export default function Perfil() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return (
      <div className="perfil-page">
        <div className="perfil-card" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>Debes iniciar sesión para ver tu perfil.</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  const roleLabel =
    user?.role === 'admin' || user?.role === 'ADMIN'
      ? 'Admin'
      : user?.role === 'client' || user?.role === 'CLIENT'
        ? 'Cliente'
        : 'Usuario';

  const initial = user?.fullName?.charAt(0)?.toUpperCase() || '?';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="perfil-page">
      <div className="perfil-card">

        {/* Avatar */}
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user.fullName}
            className="perfil-avatar"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="perfil-avatar-placeholder">{initial}</div>
        )}

        {/* Nombre */}
        <h1 className="perfil-name">{user?.fullName}</h1>

        {/* Etiqueta del rol */}
        <span className="perfil-role">{roleLabel}</span>

        {/* Info */}
        <div className="perfil-info">
          <div className="perfil-info-row">
            <span className="perfil-info-label">Correo</span>
            <span className="perfil-info-value">{user?.email}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-info-label">Rol</span>
            <span className="perfil-info-value">{roleLabel}</span>
          </div>
        </div>

        {/* Salir */}
        <button className="btn btn-primary perfil-logout-btn" onClick={handleLogout}>
          Salir
        </button>

      </div>
    </div>
  );
}
