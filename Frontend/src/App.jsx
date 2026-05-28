import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './context/AuthContext'
import './styles/global.css'

// Lazy-loaded pages
const Home            = lazy(() => import('./pages/Home.jsx'))
const Historia        = lazy(() => import('./pages/Historia.jsx'))
const Organizacion    = lazy(() => import('./pages/Organizacion.jsx'))
const Noticias        = lazy(() => import('./pages/Noticias.jsx'))
const CEDOC           = lazy(() => import('./pages/CEDOC.jsx'))
const Contacto        = lazy(() => import('./pages/Contacto.jsx'))
const Tienda          = lazy(() => import('./pages/Tienda.jsx'))
const Login           = lazy(() => import('./pages/Login.jsx'))
const RecuperarPassword = lazy(() => import('./pages/RecuperarPassword.jsx'))
const ResetPassword   = lazy(() => import('./pages/ResetPassword.jsx'))

// ADMIN
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard.jsx'))
const NoticiasAdmin = lazy(() => import('./pages/Admin/NoticiasAdmin.jsx'))
const AdminLayout   = lazy(() => import('./pages/Admin/AdminLayout.jsx'))
const NoticiasList  = lazy(() => import('./pages/Admin/NoticiasList.jsx'))

const AdminList = lazy(() => import('./pages/Admin/AdminList.jsx'))
const AdminForm = lazy(() => import('./pages/Admin/AdminForm.jsx'))
const CronicasAdmin = lazy(() => import('./pages/Admin/CronicasAdmin.jsx'))
const CronicasList  = lazy(() => import('./pages/Admin/CronicasList.jsx'))
const UsuariosAdmin = lazy(() => import('./pages/Admin/UsuariosAdmin.jsx'))
const UsuariosList  = lazy(() => import('./pages/Admin/UsuariosList.jsx'))
const MaterialAdmin = lazy(() => import('./pages/Admin/MaterialAdmin.jsx'))
const MaterialList  = lazy(() => import('./pages/Admin/MaterialList.jsx'))
const RepositorioAdmin = lazy(() => import('./pages/Admin/RepositorioAdmin.jsx'))
const RepositorioList  = lazy(() => import('./pages/Admin/RepositorioList.jsx'))
const CedocAdmin = lazy(() => import('./pages/Admin/CedocAdmin.jsx'))
const CedocList  = lazy(() => import('./pages/Admin/CedocList.jsx'))

// OTRAS PÁGINAS
const Cronicas           = lazy(() => import('./pages/Cronicas.jsx'))
const Repositorio        = lazy(() => import('./pages/Repositorio.jsx'))
const MaterialEducativo  = lazy(() => import('./pages/MaterialEducativo.jsx'))

// DETALLES
const NoticiaDetail           = lazy(() => import('./pages/NoticiaDetail.jsx'))
const CronicaDetail           = lazy(() => import('./pages/CronicaDetail.jsx'))
const RepositorioDetail       = lazy(() => import('./pages/RepositorioDetail.jsx'))
const CEDOCDetail             = lazy(() => import('./pages/CEDOCDetail.jsx'))
const MaterialEducativoDetail = lazy(() => import('./pages/MaterialEducativoDetail.jsx'))

function PageLoader() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            fontFamily: 'var(--font-titulo)',
            fontSize: '2rem',
            letterSpacing: 3,
            color: 'var(--purpura)',
        }}>
            🥁 Cargando...
        </div>
    )
}

function Layout() {
    const { pathname, hash } = useLocation()
    const isLogin = pathname.startsWith('/login') || pathname.startsWith('/recuperar-password') || pathname.startsWith('/reset-password')

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0)
        }
    }, [pathname, hash])

    return (
        <>
            {!isLogin && <Navbar />}

            <Suspense fallback={<PageLoader />}>
                <Routes>

                    {/* PÚBLICAS */}
                    <Route path="/" element={<Home />} />
                    <Route path="/historia" element={<Historia />} />
                    <Route path="/organizacion" element={<Organizacion />} />
                    <Route path="/noticias" element={<Noticias />} />
                    <Route path="/cronicas" element={<Cronicas />} />
                    <Route path="/repositorio" element={<Repositorio />} />
                    <Route path="/cedoc" element={<CEDOC />} />
                    <Route path="/material-educativo" element={<MaterialEducativo />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/tienda" element={<Tienda />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/recuperar-password" element={<RecuperarPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    {/* DETALLES */}
                    <Route path="/noticias/:id" element={<NoticiaDetail />} />
                    <Route path="/cronicas/:id" element={<CronicaDetail />} />
                    <Route path="/repositorio/:id" element={<RepositorioDetail />} />
                    <Route path="/cedoc/:id" element={<CEDOCDetail />} />
                    <Route path="/material-educativo/:id" element={<MaterialEducativoDetail />} />

                    {/* ADMIN */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route
                            index
                            element={<AdminDashboard />}
                        />

                        {/* NOTICIAS */}
                        <Route path="noticias" element={<NoticiasAdmin />} />
                        <Route path="noticias/editar" element={<NoticiasList />} />

                        {/* CRÓNICAS */}
                        <Route path="cronicas" element={<CronicasAdmin />} />
                        <Route path="cronicas/editar" element={<CronicasList />} />

                        {/* MATERIAL */}
                        <Route path="material" element={<MaterialAdmin />} />
                        <Route path="material/editar" element={<MaterialList />} />

                        {/* REPOSITORIO */}
                        <Route path="repositorio" element={<RepositorioAdmin />} />
                        <Route path="repositorio/editar" element={<RepositorioList />} />

                        {/* CEDOC */}
                        <Route path="cedoc" element={<CedocAdmin />} />
                        <Route path="cedoc/editar" element={<CedocList />} />

                        {/* EVENTOS */}
                        <Route path="eventos" element={<AdminForm tipo="evento" />} />
                        <Route path="eventos/editar" element={<AdminList tipo="eventos" />} />

                        {/* USUARIOS */}
                        <Route path="usuarios" element={<UsuariosAdmin />} />
                        <Route path="usuarios/listar" element={<UsuariosList />} />
                    </Route>

                    {/* 404 */}
                    <Route path="*" element={
                        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
                            <div style={{ fontSize: '5rem' }}>🎭</div>
                            <h1 style={{ fontFamily: 'var(--font-titulo)', fontSize: '3rem', letterSpacing: 3 }}>
                                Página no encontrada
                            </h1>
                            <p style={{ color: 'var(--oscuro)', margin: '1rem 0 2rem' }}>
                                Parece que esta calle no lleva al carnaval.
                            </p>
                            <a href="/" className="btn btn-primary">← Volver al inicio</a>
                        </div>
                    } />

                </Routes>
            </Suspense>

            {!isLogin && <Footer />}
        </>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Layout />
            </AuthProvider>
        </BrowserRouter>
    )
}