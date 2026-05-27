import { Link, useNavigate } from 'react-router-dom';
import '../styles/Footer.css';
import { FOOTER_LINKS, SOCIAL_LINKS } from '../data/navigation';

const ICONS = {
  Facebook: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
  ),
  Instagram: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
  ),
  YouTube: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
  ),
  Twitter: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
  ),
};

function FooterLink({ label, to, href }) {
  const navigate = useNavigate();

  if (href) {
    return <a href={href}>{label}</a>;
  }

  // Handle hash links like "/#talleres" or "/tienda#donaciones"
  if (to && to.includes('#')) {
    const [path, hash] = to.split('#');
    const handleClick = (e) => {
      e.preventDefault();
      const targetPath = path || '/';
      navigate(targetPath);
      // Wait for navigation and DOM to update, then scroll
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    };
    return <a href={to} onClick={handleClick}>{label}</a>;
  }

  return <Link to={to}>{label}</Link>;
}

export default function Footer() {
  return (
      <footer>
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <span className="brand-name">Chinchintirapié</span>
            <p>
              Escuela carnavalera comprometida con la cultura popular latinoamericana.
              Veinte años haciendo la fiesta en la calle junto a la comunidad.
            </p>
            <div className="social-row">
              {SOCIAL_LINKS.map(({ href, label }) => (

                <a key={label}
                className="social-btn"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: '#fff' }}
                >
              {ICONS[label]}
                </a>
                ))}
            </div>
          </div>

          {/* Escuela */}
          <div className="footer-col">
            <h4>Escuela</h4>
            <ul>
              {FOOTER_LINKS.escuela.map(({ label, to, href }) => (
                  <li key={label}>
                    <FooterLink label={label} to={to} href={href} />
                  </li>
              ))}
            </ul>
          </div>

          {/* Archivo */}
          <div className="footer-col">
            <h4>Archivo</h4>
            <ul>
              {FOOTER_LINKS.archivo.map(({ label, to, href }) => (
                  <li key={label}>
                    <FooterLink label={label} to={to} href={href} />
                  </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              {FOOTER_LINKS.contacto.map(({ label, href, to }) => (
                  <li key={label}>
                    <FooterLink label={label} to={to} href={href} />
                  </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Chinchintirapie – Escuela Carnavalera · Hecho con 🎭 y ritmo</p>
        </div>
      </footer>
  );
}