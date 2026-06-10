import { Link } from 'react-router-dom';
export default function ArticuloCard({ articulo }) {
    return (
        <article className="noticias-card">

            <div className="noticias-card-media">
                <img
                    src={articulo.urlPhoto}
                    alt={articulo.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>

            <div className="noticias-card-body">
                <span className="noticias-card-tag">{articulo.type}</span>

                <h3>{articulo.title}</h3>

                {articulo.description && (
                    <p>{articulo.description}</p>
                )}

                <Link
                    to={`/noticias/${articulo.id}`}
                    className="link-reset"
                >
                    <button>
                        Leer más
                    </button>
                </Link>
            </div>

        </article>
    );
}