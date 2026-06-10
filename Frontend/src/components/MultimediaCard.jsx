import { Link } from 'react-router-dom';
import MediaThumbnail from './MediaThumbnail';

export default function MultimediaCard({ multimedia }) {
    console.log("MultimediaCard renderizada:", multimedia.title);
    return (
        <article className="noticias-card">

            <div className="noticias-card-media">
                <MediaThumbnail
                    url={multimedia.url}
                    thumbnailUrl={multimedia.thumbnailUrl}
                    alt={multimedia.title}
                    typeEmoji="📂"
                />
            </div>

            <div className="noticias-card-body">

                <span className="noticias-card-tag">
                    {multimedia.type}
                </span>

                <h3>{multimedia.title}</h3>

                {multimedia.description && (
                    <p>{multimedia.description}</p>
                )}

                <Link
                    to={`/multimedia/${multimedia.id}`}
                    className="link-reset"
                >
                    <button>
                        Ver contenido
                    </button>
                </Link>

            </div>

        </article>
    );
}