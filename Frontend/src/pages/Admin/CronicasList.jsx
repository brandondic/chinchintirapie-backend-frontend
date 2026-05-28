import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import articuloService from '../../services/articuloService';

function CronicasList() {
    const location = useLocation();
    const navigate = useNavigate();
    const esEditar = location.pathname.includes('editar');

    const [cronicas, setCronicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCronicas = async () => {
            try {
                const data = await articuloService.fetchCronicas();
                setCronicas(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCronicas();
    }, []);

    const handleEditar = (cronica) => {
        navigate('/admin/cronicas', { state: { cronica } });
    };

    if (loading) return <div className="admin-container"><p>Cargando crónicas...</p></div>;
    if (error) return <div className="admin-container"><p>Error: {error}</p></div>;

    return (
        <div className="admin-container">
            <h2>Listado de crónicas</h2>
            {cronicas.length === 0 && <p>No hay crónicas publicadas.</p>}

            {cronicas.map((cronica) => (
                <div key={cronica.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <p><strong>{cronica.title}</strong></p>
                    <p>Autor: {cronica.author}</p>
                    <p>Fecha: {new Date(cronica.createdAt).toLocaleDateString()}</p>

                    {esEditar && (
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button className="btn btn-primary" onClick={() => handleEditar(cronica)}>
                                Editar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CronicasList;