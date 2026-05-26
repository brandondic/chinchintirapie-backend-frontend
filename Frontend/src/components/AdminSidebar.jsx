import { NavLink, useLocation } from 'react-router-dom';
import '../styles/AdminSideBar.css';
import { useState, useEffect } from 'react';

function AdminSidebar() {

    const [openMenu, setOpenMenu] = useState(null);
    const location = useLocation();

    useEffect(() => {

        if (location.pathname.includes('/admin/noticias')) {
            setOpenMenu('noticias');
        } else if (location.pathname.includes('/admin/cronicas')) {
            setOpenMenu('cronicas');
        } else if (location.pathname.includes('/admin/material')) {
            setOpenMenu('material');
        } else if (location.pathname.includes('/admin/repositorio')) {
            setOpenMenu('repositorio');
        } else if (location.pathname.includes('/admin/cedoc')) {
            setOpenMenu('cedoc');
        } else if (location.pathname.includes('/admin/eventos')) {
            setOpenMenu('eventos');
        } else if (location.pathname.includes('/admin/usuarios')) {
            setOpenMenu('usuarios');
        }

    }, [location.pathname]);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <aside className="admin-sidebar">

            <div className="admin-sidebar__logo">
                <h2>Panel Admin</h2>
            </div>

            <nav className="admin-sidebar__nav">

                {/* NOTICIAS */}
                <div
                    className="admin-sidebar__nav-link"
                    onClick={() => toggleMenu('noticias')}
                >
                    Noticias
                </div>

                {openMenu === 'noticias' && (
                    <div className="admin-submenu">
                        <NavLink to="/admin/noticias">Agregar Noticia</NavLink>
                        <NavLink to="/admin/noticias/editar">Modificar Noticia</NavLink>
                    </div>
                )}

                {/* CRÓNICAS */}
                <div
                    className="admin-sidebar__nav-link"
                    onClick={() => toggleMenu('cronicas')}
                >
                    Crónicas
                </div>

                {openMenu === 'cronicas' && (
                    <div className="admin-submenu">
                        <NavLink to="/admin/cronicas">Agregar Crónica</NavLink>
                        <NavLink to="/admin/cronicas/editar">Modificar Crónica</NavLink>
                    </div>
                )}

                {/* MATERIAL */}
                <div
                    className="admin-sidebar__nav-link"
                    onClick={() => toggleMenu('material')}
                >
                    Material Educativo
                </div>

                {openMenu === 'material' && (
                    <div className="admin-submenu">
                        <NavLink to="/admin/material">Agregar Material</NavLink>
                        <NavLink to="/admin/material/editar">Modificar Material</NavLink>
                    </div>
                )}

                {/* REPOSITORIO */}
                <div
                    className="admin-sidebar__nav-link"
                    onClick={() => toggleMenu('repositorio')}
                >
                    Repositorio
                </div>

                {openMenu === 'repositorio' && (
                    <div className="admin-submenu">
                        <NavLink to="/admin/repositorio">Agregar</NavLink>
                        <NavLink to="/admin/repositorio/editar">Modificar</NavLink>
                    </div>
                )}

                {/* CEDOC */}
                <div
                    className="admin-sidebar__nav-link"
                    onClick={() => toggleMenu('cedoc')}
                >
                    CEDOC
                </div>

                {openMenu === 'cedoc' && (
                    <div className="admin-submenu">
                        <NavLink to="/admin/cedoc">Agregar</NavLink>
                        <NavLink to="/admin/cedoc/editar">Modificar</NavLink>
                    </div>
                )}

                {/* EVENTOS */}
                <div
                    className="admin-sidebar__nav-link"
                    onClick={() => toggleMenu('eventos')}
                >
                    Eventos
                </div>

                {openMenu === 'eventos' && (
                    <div className="admin-submenu">
                        <NavLink to="/admin/eventos">Agregar Evento</NavLink>
                        <NavLink to="/admin/eventos/editar">Modificar Evento</NavLink>
                    </div>
                )}

                {/* USUARIOS */}
                <div
                    className="admin-sidebar__nav-link"
                    onClick={() => toggleMenu('usuarios')}
                >
                    Usuarios
                </div>

                {openMenu === 'usuarios' && (
                    <div className="admin-submenu">
                        <NavLink to="/admin/usuarios">Agregar Usuario</NavLink>
                        <NavLink to="/admin/usuarios/listar">Listar Usuarios</NavLink>
                    </div>
                )}

            </nav>

        </aside>
    );
}

export default AdminSidebar;