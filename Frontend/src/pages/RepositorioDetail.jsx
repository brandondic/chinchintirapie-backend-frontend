import { useParams, Link } from 'react-router-dom';
import { REPO_ITEMS } from '../data/repositorioData';
import PageHero from '../components/PageHero';
import './styles/RepositorioDetail.css';

export default function RepositorioDetail() {
  const { id } = useParams();
  const item = REPO_ITEMS.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="repo-detail-empty">
        <h2>Archivo no encontrado</h2>
        <Link to="/repositorio" className="repo-detail-back-link">
          Volver
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        badge={`📂 ${item.type}`}
        title={item.title}
        description={`${item.year} · ${item.count}`}
      />

      <div className="repo-detail-wrap">
        <Link to="/repositorio" className="repo-detail-back-link repo-detail-back-link--top">
          ← Volver al Repositorio
        </Link>

        <div className="repo-detail-preview">
          <div className="repo-detail-emoji">{item.emoji}</div>
          <h3>Previsualización no disponible</h3>
          <p className="repo-detail-text">
            El archivo se encuentra en los registros históricos del repositorio.
          </p>
          <button className="download-btn repo-detail-access-btn">
            Solicitar Acceso
          </button>
        </div>
      </div>
    </>
  );
}