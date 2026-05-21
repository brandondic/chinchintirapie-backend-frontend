import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FOOTER_LINKS, SOCIAL_LINKS } from '../data/navigation';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <span className="brand-name">Chinchintirapie</span>
          <p>
            Escuela carnavalera comprometida con la cultura popular latinoamericana.
            Veinte años haciendo la fiesta en la calle junto a la comunidad.
          </p>
          <div className="social-row">
            {SOCIAL_LINKS.map(({ emoji, href, label }) => (
              <a key={label} className="social-btn" href={href} aria-label={label}>
                {emoji}
              </a>
            ))}
          </div>
        </div>

        {/* Escuela */}
        <div className="footer-col">
          <h4>Escuela</h4>
          <ul>
            {FOOTER_LINKS.escuela.map(({ label, to }) => (
              <li key={label}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Archivo */}
        <div className="footer-col">
          <h4>Archivo</h4>
          <ul>
            {FOOTER_LINKS.archivo.map(({ label, to }) => (
              <li key={label}>
                <Link to={to}>{label}</Link>
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
                {href ? (
                  <a href={href}>{label}</a>
                ) : (
                  <Link to={to}>{label}</Link>
                )}
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
