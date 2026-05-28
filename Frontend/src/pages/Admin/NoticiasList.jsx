import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import articuloService from '../../services/articuloService';

function NoticiasList() {
    const location = useLocation();
    const navigate = useNavigate();
    const esEditar = location.pathname.includes('editar');

    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const data = await articuloService.fetchNoticias();
                setNoticias(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNoticias();
    }, []);

    const handleEditar = (noticia) => {
        navigate('/admin/noticias', { state: { noticia } });
    };

    if (loading) return <div className="admin-container"><p>Cargando noticias...</p></div>;
    if (error) return <div className="admin-container"><p>Error: {error}</p></div>;

    return (
        <div className="admin-container">
            <h2>Listado de noticias</h2>
            {noticias.length === 0 && <p>No hay noticias publicadas.</p>}

            {noticias.map((noticia) => (
                <div key={noticia.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <p><strong>{noticia.title}</strong></p>
                    <p>Autor: {noticia.author}</p>
                    <p>Fecha: {new Date(noticia.createdAt).toLocaleDateString()}</p>

                    {esEditar && (
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button className="btn btn-primary" onClick={() => handleEditar(noticia)}>
                                Editar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default NoticiasList;