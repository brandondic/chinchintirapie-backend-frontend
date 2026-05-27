import '../styles/PageHero.css';

export default function PageHero({ badge, title, titleEm, description, variant = 'default' }) {
  return (
    <div className={`page-hero page-hero--${variant}`}>
      {badge && <div className="page-hero-badge">{badge}</div>}
      <h1>
        {titleEm && <em>{titleEm} </em>}
        {title}
      </h1>
      {description && <p>{description}</p>}
    </div>
  );
}
