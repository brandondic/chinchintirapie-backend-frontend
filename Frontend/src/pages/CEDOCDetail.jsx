import { useParams, Link } from 'react-router-dom';
import { ARTICLES } from '../data/cedocData';
import PageHero from '../components/PageHero';
import '../styles/CedocDetail.css';

export default function CEDOCDetail() {
  const { id } = useParams();
  const article = ARTICLES.find((a) => a.id === id);

  if (!article) return (
    <div className="page-empty-state">
      <h2>Artículo no encontrado</h2>
      <Link to="/cedoc" className="page-back-link">Volver</Link>
    </div>
  );

  return (
    <>
      <PageHero badge={article.status === 'published' ? '📄 Artículo' : '🔬 Investigación en proceso'} title={article.title} description="" />
      <div className="page-container">
        <Link to="/cedoc" className="page-back-link">← Volver al CEDOC</Link>
        <div className="detail-page-row">
          <div className="article-icon detail-article-icon" style={{ ...article.iconStyle }}>{article.icon}</div>
          <div>
            <div className="tag-row">
              {article.tags.map((t) => <span key={t} className="meta-tag topic-pill">{t}</span>)}
            </div>
            <p className="detail-article-description">{article.desc}</p>
            {article.status === 'published' ? (
              <button className="download-btn">⬇ Descargar Documento Completo (PDF)</button>
            ) : (
              <button className="download-btn download-btn--gold">👁 Solicitar Avance de Investigación</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
