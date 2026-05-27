import { useParams, Link } from 'react-router-dom';
import { EDU_ITEMS } from '../data/educativoData';
import PageHero from '../components/PageHero';
import '../styles/MaterialEducativoDetail.css';

export default function MaterialEducativoDetail() {
  const { id } = useParams();
  const item = EDU_ITEMS.find((e) => e.id === id);

  if (!item) return (
    <div className="page-empty">
      <h2>Material no encontrado</h2>
      <Link to="/material-educativo" className="back-link">Volver</Link>
    </div>
  );

  return (
    <>
      <PageHero badge={`📚 ${item.type}`} title={item.title} description={`Nivel: ${item.level} | ${item.pages}`} />
      <div className="educativo-detail">
        <Link to="/material-educativo" className="back-link">← Volver a Material Educativo</Link>
        <div className="educativo-card">
          <div className="educativo-icon">{item.emoji}</div>
          <h3 className="educativo-title">{item.title}</h3>
          <p className="educativo-copy">Este material es de libre distribución para fines pedagógicos.</p>
          <button className="download-btn material-download-btn">⬇ Descargar gratis (PDF)</button>
        </div>
      </div>
    </>
  );
}
