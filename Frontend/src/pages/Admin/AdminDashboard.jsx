import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import articuloService from '../../services/articuloService';
import userService from '../../services/userService';
import multimediaService from '../../services/multimediaService';
import '../../styles/AdminDashboard.css';

function timeAgo(dateStr) {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Hace un momento';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
    if (diff < 172800) return 'Ayer';
    return `Hace ${Math.floor(diff / 86400)} días`;
}

function AdminDashboard() {
    const { user } = useAuth();
    const [currentDate, setCurrentDate] = useState('');

    const [noticiaCount, setNoticiaCount] = useState('...');
    const [usuarioCount, setUsuarioCount] = useState('...');
    const [archivoCount, setArchivoCount] = useState('...');
    const [recentNews, setRecentNews] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [usuarioError, setUsuarioError] = useState(null);

    useEffect(() => {
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(new Date().toLocaleDateString('es-ES', dateOptions));
    }, []);

    // Cada fetch es independiente para que un fallo no rompa los demás
    useEffect(() => {
        articuloService.fetchNoticias()
            .then(data => {
                setNoticiaCount(data.length);
                const sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRecentNews(sorted.slice(0, 3));
            })
            .catch(() => setNoticiaCount(0));
    }, []);

    useEffect(() => {
        userService.fetchAll()
            .then(data => {
                setUsuarioCount(data.length);
                const sorted = [...data].sort((a, b) => b.id - a.id);
                setRecentUsers(sorted.slice(0, 3));
                setUsuarioError(null);
            })
            .catch((err) => {
                setUsuarioCount('!');
                setUsuarioError(err.message || 'Error al obtener usuarios');
            });
    }, []);

    useEffect(() => {
        multimediaService.fetchAll()
            .then(data => setArchivoCount(data.length))
            .catch(() => setArchivoCount(0));
    }, []);

    const stats = [
        { title: "Noticias Publicadas", value: noticiaCount, icon: "📰", link: "/admin/noticias/editar" },
        { title: "Usuarios Registrados", value: usuarioCount, icon: "👥", link: "/admin/usuarios/listar", error: usuarioError },
        { title: "Archivos Subidos", value: archivoCount, icon: "📂", link: "/admin/material/editar" },
        { title: "Donaciones Recibidas", value: "—", icon: "💖", note: "Sin módulo aún" },
    ];

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Panel de Administrador</h1>
                <div className="header-user-info">
                    <span className="header-date">{currentDate}</span>
                    <div className="header-profile">
                        <div className="header-avatar">
                            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="header-details">
                            <span className="header-name">{user?.fullName || 'Administrador'}</span>
                            <span className="header-badge">{user?.role === 'ADMIN' ? 'Admin' : 'Moderador'}</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className="stats-grid">
                {stats.map((stat, index) => (
                    <div className="stat-card" key={index}>
                        <div className="stat-header">
                            <h3 className="stat-title">{stat.title}</h3>
                            <div className="stat-icon">{stat.icon}</div>
                        </div>
                        <p className="stat-value" style={stat.value === '!' ? { color: '#e53e3e', fontSize: '1.5rem' } : {}}>
                            {stat.value}
                        </p>
                        {stat.error && (
                            <span className="stat-variation neutral" title={stat.error} style={{ color: '#e53e3e', fontSize: '0.75rem' }}>
                                ⚠ Error de conexión
                            </span>
                        )}
                        {!stat.error && (
                            stat.note
                                ? <span className="stat-variation neutral">{stat.note}</span>
                                : stat.link && (
                                    <Link to={stat.link} style={{ fontSize: '0.82rem', color: '#c8920a', fontWeight: 600, marginTop: '0.25rem', display: 'inline-block' }}>
                                        Ver todos →
                                    </Link>
                                )
                        )}
                    </div>
                ))}
            </section>

            <div className="dashboard-content">
                {/* Últimas Noticias */}
                <div className="dashboard-panel">
                    <h3>Últimas Noticias</h3>
                    <div className="news-list">
                        {recentNews.length === 0 && (
                            <p style={{ color: '#8c7360', fontSize: '0.9rem' }}>
                                {noticiaCount === '...' ? 'Cargando...' : 'No hay noticias publicadas.'}
                            </p>
                        )}
                        {recentNews.map(news => (
                            <div className="news-item" key={news.id}>
                                <div className="news-info">
                                    <h4 className="news-title">{news.title}</h4>
                                    <span className="news-date">{timeAgo(news.createdAt)}</span>
                                </div>
                                <Link
                                    to="/admin/noticias/editar"
                                    style={{ textDecoration: 'none', color: '#c8920a', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                                >
                                    Editar
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Usuarios recientes */}
                <div className="dashboard-panel">
                    <h3>Usuarios Recientes</h3>
                    <div className="activity-list">
                        {recentUsers.length === 0 && (
                            <p style={{ color: '#8c7360', fontSize: '0.9rem' }}>
                                {usuarioCount === '...' ? 'Cargando...' : 'No hay usuarios registrados.'}
                            </p>
                        )}
                        {recentUsers.map(u => (
                            <div className="activity-item" key={u.id}>
                                <div className="activity-avatar">
                                    {u.fullName ? u.fullName.charAt(0).toUpperCase() : '?'}
                                </div>
                                <div className="activity-details">
                                    <p className="activity-text"><strong>{u.fullName}</strong></p>
                                    <span className="activity-time">
                                        {u.email} · {u.role === 'ADMIN' ? 'Admin' : 'Cliente'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
