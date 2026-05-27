import { useParams, Link } from 'react-router-dom';
import { NEWS_ITEMS } from '../data/noticiasData';
import PageHero from '../components/PageHero';
import '../styles/NoticiaDetail.css';

export default function NoticiaDetail() {
  const { id } = useParams();
  const noticia = NEWS_ITEMS.find((n) => n.id === id);

  if (!noticia) return (
    <div className="page-empty">
      <h2>Noticia no encontrada</h2>
      <Link to="/noticias" className="back-link">Volver</Link>
    </div>
  );

  return (
    <>
      <PageHero badge={noticia.category} title={noticia.title} description="" />
      <div className="noticia-detail">
        <Link to="/noticias" className="back-link">← Volver a Noticias</Link>
        {noticia.video ? (
          <video controls className="noticia-media">
            <source src={noticia.video} type="video/mp4" />
          </video>
        ) : (
          <img src={noticia.img} alt={noticia.title} className="noticia-media" />
        )}
        <p className="noticia-desc">{noticia.desc}</p>
      </div>
    </>
  );
}
