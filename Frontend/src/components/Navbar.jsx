import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { NAV_LINKS } from '../data/navigation';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const toggleDropdown = (label, e) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="navbar" ref={navRef} role="navigation" aria-label="Navegación principal">
      <Link to="/" className="logo-wrap" onClick={() => setMobileOpen(false)}>
        <div className="logo-img">
          <img src="/img/logo-chinchitirapie.webp" alt="Logo Chinchintirapie" />
        </div>
        <div className="logo-text">
          <span className="logo-name">Chinchintirapie</span>
          <span className="logo-sub">Escuela Carnavalera</span>
        </div>
      </Link>

      <button
        className="hamburger"
        aria-label="Menú"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      <ul className={`nav-links${mobileOpen ? ' mobile-open' : ''}`} id="navLinks">
        {NAV_LINKS.map((item) =>
          item.children ? (
            <li
              key={item.label}
              className={`has-dropdown${openDropdown === item.label ? ' open' : ''}`}
            >
              <button onClick={(e) => toggleDropdown(item.label, e)}>
                {item.label} <span className="caret">▾</span>
              </button>
              <div className="dropdown">
                {item.children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    onClick={() => { setOpenDropdown(null); setMobileOpen(false); }}
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </li>
          ) : (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) => isActive ? 'active-link' : ''}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          )
        )}
        <li>
          <NavLink to="/tienda" className="nav-cta" onClick={() => setMobileOpen(false)}>
            Tienda&nbsp;/&nbsp;Donaciones
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacto" onClick={() => setMobileOpen(false)}>Contacto</NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <span style={{
                color: 'var(--amarillo-e)',
                fontWeight: 800,
                fontSize: '.85rem',
                maxWidth: 120,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                👤 {user?.fullName?.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="nav-login-btn"
                style={{ cursor: 'pointer' }}
              >
                Salir
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="nav-login-btn" onClick={() => setMobileOpen(false)}>
              Ingresar
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
