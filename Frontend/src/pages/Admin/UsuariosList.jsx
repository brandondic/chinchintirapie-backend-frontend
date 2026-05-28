import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userService from '../../services/userService';

function UsuariosList() {
    const location = useLocation();
    const navigate = useNavigate();
    const esListar = location.pathname.includes('listar');

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await userService.fetchAll();
                setUsuarios(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    const handleEditar = (usuario) => {
        navigate('/admin/usuarios', { state: { usuario } });
    };

    if (loading) return <div className="admin-container"><p>Cargando usuarios...</p></div>;
    if (error) return (
        <div className="admin-container">
            <h2>Listado de usuarios</h2>
            <div style={{ padding: '1rem', background: '#fff3f3', border: '1px solid #f5c6c6', borderRadius: '8px', color: '#c0392b', marginTop: '1rem' }}>
                <strong>⚠ Error al obtener datos</strong>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>{error}</p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#888' }}>
                    Asegúrate de que el backend esté activo y que tu sesión no haya expirado.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    style={{ marginTop: '0.75rem', padding: '6px 16px', borderRadius: '5px', border: 'none', background: '#c0392b', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Reintentar
                </button>
            </div>
        </div>
    );

    return (
        <div className="admin-container">
            <h2>Listado de usuarios</h2>
            {usuarios.length === 0 && <p>No hay usuarios registrados.</p>}

            {usuarios.map((usuario) => (
                <div key={usuario.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <p><strong>{usuario.fullName}</strong></p>
                    <p>Correo: {usuario.email}</p>
                    <p>Rol: {usuario.role === 'ADMIN' ? 'Admin' : 'Cliente'}</p>

                    {esListar && (
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button className="btn btn-primary" onClick={() => handleEditar(usuario)}>
                                Editar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UsuariosList;
