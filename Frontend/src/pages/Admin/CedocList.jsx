import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import multimediaService from '../../services/multimediaService';

function CedocList() {
    const location = useLocation();
    const navigate = useNavigate();
    const esEditar = location.pathname.includes('editar');

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await multimediaService.fetchCedoc();
                setItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleEditar = (item) => {
        navigate('/admin/cedoc', { state: { item } });
    };

    if (loading) return <div className="admin-container"><p>Cargando CEDOC...</p></div>;
    if (error) return <div className="admin-container"><p>Error: {error}</p></div>;

    return (
        <div className="admin-container">
            <h2>Listado de CEDOC</h2>
            {items.length === 0 && <p>No hay items en CEDOC.</p>}

            {items.map((item) => (
                <div key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <p><strong>{item.title}</strong></p>
                    <p>Autor: {item.author}</p>
                    <p>Año: {item.year}</p>

                    {esEditar && (
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button className="btn btn-primary" onClick={() => handleEditar(item)}>
                                Editar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CedocList;
