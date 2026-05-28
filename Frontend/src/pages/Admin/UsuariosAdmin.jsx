import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import authService from '../../services/authService';
import '../../styles/Admin.css';

function UsuariosAdmin() {
    const location = useLocation();
    const navigate = useNavigate();
    const usuarioAEditar = location.state?.usuario;

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'CLIENT'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const [toast, setToast] = useState({ show: false, title: '', message: '' });

    useEffect(() => {
        if (usuarioAEditar) {
            setForm({
                fullName: usuarioAEditar.fullName || '',
                email: usuarioAEditar.email || '',
                password: '', // No mostrar la contraseña al editar
                role: usuarioAEditar.role || 'CLIENT'
            });
        }
    }, [usuarioAEditar]);

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast({ show: false, title: '', message: '' });
                navigate('/admin/usuarios/listar');
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

        try {
            if (usuarioAEditar?.id) {
                // PUT - Solo enviar password si fue modificado
                const payload = {
                    fullName: form.fullName,
                    email: form.email,
                    role: form.role
                };
                if (form.password) {
                    payload.password = form.password;
                }
                
                await userService.update(usuarioAEditar.id, payload);
                setToast({ show: true, title: 'Usuario actualizado', message: 'Los cambios se guardaron correctamente' });
            } else {
                // POST - Registro básico (luego se tendría que actualizar el rol si register no lo permite, pero asumimos lo básico por ahora o requerir otro endpoint)
                if (!form.password) {
                    throw new Error("La contraseña es obligatoria para crear un usuario");
                }
                await authService.register(form.fullName, form.email, form.password);
                setToast({ show: true, title: 'Usuario creado', message: 'El usuario se guardó correctamente' });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const closeToastAndNavigate = () => {
        setToast({ show: false, title: '', message: '' });
        navigate('/admin/usuarios/listar');
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
        setLoading(true);
        try {
            await userService.delete(usuarioAEditar.id);
            navigate('/admin/usuarios/listar');
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Administrar Usuarios</h1>

            <h2>{usuarioAEditar ? 'Editar usuario' : 'Crear nuevo usuario'}</h2>

            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
            {successMsg && <p style={{ color: 'green', marginBottom: '1rem' }}>{successMsg}</p>}

            <form onSubmit={handleSubmit} className="admin-form">

                <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    placeholder="Nombre Completo"
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Correo Electrónico"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={form.password}
                    placeholder={usuarioAEditar ? "Nueva Contraseña (dejar en blanco para mantener la actual)" : "Contraseña"}
                    onChange={handleChange}
                    required={!usuarioAEditar}
                    minLength="6"
                />

                {usuarioAEditar && (
                    <select 
                        name="role" 
                        value={form.role} 
                        onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid rgba(190, 0, 60, 0.15)', backgroundColor: 'var(--blanco)', color: 'var(--oscuro)' }}
                    >
                        <option value="CLIENT">Cliente</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" disabled={loading} style={{ background: 'var(--purpura)', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none', fontWeight: 'bold' }}>
                        {loading ? 'Guardando...' : (usuarioAEditar ? 'Guardar Cambios' : 'Crear Usuario')}
                    </button>

                    {usuarioAEditar && (
                        <button 
                            type="button" 
                            disabled={loading} 
                            onClick={handleDelete}
                            style={{ background: 'var(--rojo)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Eliminar Usuario
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
                        <div style={{
                            color: '#f59e0b',
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            marginBottom: '0.75rem',
                            fontFamily: 'var(--font-titulo, sans-serif)'
                        }}>
                            ¡Guardado!
                        </div>
                        <div style={{
                            color: '#a3a3a3',
                            fontSize: '0.95rem',
                            lineHeight: '1.5',
                            marginBottom: '2rem',
                        }}>
                            {toast.message}
                        </div>
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

export default UsuariosAdmin;
