import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import articuloService from '../../services/articuloService';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Admin.css';

function NoticiasAdmin() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const noticiaAEditar = location.state?.noticia;

    const [form, setForm] = useState({
        title: '',
        body: '',
        author: '',
        urlPhoto: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const [toast, setToast] = useState({ show: false, title: '', message: '' });

    useEffect(() => {
        if (noticiaAEditar) {
            setForm({
                title: noticiaAEditar.title || '',
                body: noticiaAEditar.body || '',
                author: noticiaAEditar.author || '',
                urlPhoto: noticiaAEditar.urlPhoto || ''
            });
        }
    }, [noticiaAEditar]);

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast({ show: false, title: '', message: '' });
                navigate('/admin/noticias/editar');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show, navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        const payload = {
            ...form,
            type: 'NOTICIA',
            authorId: user?.id || 1,
            description: form.body.substring(0, 100)
        };

        try {
            if (noticiaAEditar?.id) {
                // PUT
                await articuloService.update(noticiaAEditar.id, payload);
                setToast({ show: true, title: 'Noticia actualizada', message: 'Los cambios se guardaron correctamente' });
            } else {
                // POST
                await articuloService.create(payload);
                setToast({ show: true, title: 'Noticia creada', message: 'La noticia se guardó correctamente' });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const closeToastAndNavigate = () => {
        setToast({ show: false, title: '', message: '' });
        navigate('/admin/noticias/editar');
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro que deseas eliminar esta noticia?")) return;
        setLoading(true);
        try {
            await articuloService.delete(noticiaAEditar.id);
            navigate('/admin/noticias/editar'); // Volver a la lista
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Administrar Noticias</h1>

            <h2>{noticiaAEditar ? 'Editar noticia' : 'Crear nueva noticia'}</h2>

            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
            {successMsg && <p style={{ color: 'green', marginBottom: '1rem' }}>{successMsg}</p>}

            <form onSubmit={handleSubmit} className="admin-form">

                <input
                    type="text"
                    name="title"
                    value={form.title}
                    placeholder="Título"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="body"
                    value={form.body}
                    placeholder="Contenido de la noticia"
                    onChange={handleChange}
                    required
                    style={{ minHeight: '150px' }}
                />

                <input
                    type="text"
                    name="author"
                    value={form.author}
                    placeholder="Autor (ej. Nombre)"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="urlPhoto"
                    value={form.urlPhoto}
                    placeholder="URL de la imagen (temporal)"
                    onChange={handleChange}
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" disabled={loading} style={{ background: 'var(--purpura)', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none', fontWeight: 'bold' }}>
                        {loading ? 'Guardando...' : (noticiaAEditar ? 'Guardar Cambios' : 'Publicar')}
                    </button>

                    {noticiaAEditar && (
                        <button 
                            type="button" 
                            disabled={loading} 
                            onClick={handleDelete}
                            style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Eliminar Noticia
                        </button>
                    )}
                </div>

            </form>

            {toast.show && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                }}>
                    <div style={{
                        backgroundColor: '#1c1c1c',
                        borderRadius: '16px',
                        padding: '3rem 2.5rem',
                        textAlign: 'center',
                        maxWidth: '280px',
                        width: '100%',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                    }}>
                        {/* Círculo con check */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            border: '4px solid #f59e0b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem auto',
                        }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>

                        {/* Título */}
                        <div style={{
                            color: '#f59e0b',
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            marginBottom: '0.75rem',
                            fontFamily: 'var(--font-titulo, sans-serif)'
                        }}>
                            ¡Guardado!
                        </div>

                        {/* Mensaje */}
                        <div style={{
                            color: '#a3a3a3',
                            fontSize: '0.95rem',
                            lineHeight: '1.5',
                            marginBottom: '2rem',
                        }}>
                            {toast.message}
                        </div>

                        {/* Botón */}
                        <button
                            onClick={closeToastAndNavigate}
                            style={{
                                background: '#f59e0b',
                                color: '#1c1c1c',
                                border: 'none',
                                padding: '10px 28px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                            }}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default NoticiasAdmin;