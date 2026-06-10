import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import multimediaService from '../../services/multimediaService';
import storageService from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Admin.css';

function CedocAdmin() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const itemAEditar = location.state?.item;

    const [form, setForm] = useState({
        title: '',
        url: '',
        description: '',
        year: '',
        thumbnailUrl: '',
        author: ''
    });

    // Categorías
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    const [mediaType, setMediaType] = useState('image'); // 'image' | 'video'
    const [uploadingFile, setUploadingFile] = useState(false);
    const [uploadingThumb, setUploadingThumb] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [toast, setToast] = useState({ show: false, title: '', message: '' });

    // Cargar categorías disponibles del backend
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await multimediaService.fetchCategorias('CEDOC');
                if (Array.isArray(cats)) setAvailableCategories(cats);
            } catch (_) { /* silenciar */ }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        if (itemAEditar) {
            setForm({
                title: itemAEditar.title || '',
                url: itemAEditar.url || '',
                description: itemAEditar.description || '',
                year: itemAEditar.year || '',
                thumbnailUrl: itemAEditar.thumbnailUrl || '',
                author: itemAEditar.author || ''
            });
            setSelectedCategories(itemAEditar.categories || []);
            if (itemAEditar.url && (itemAEditar.url.includes('youtube') || itemAEditar.url.includes('youtu.be'))) {
                setMediaType('video');
            } else {
                setMediaType('image');
            }
        }
    }, [itemAEditar]);

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast({ show: false, title: '', message: '' });
                navigate('/admin/cedoc/editar');
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

    const handleFileUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        if (field === 'url') setUploadingFile(true);
        if (field === 'thumbnailUrl') setUploadingThumb(true);
        setError(null);

        try {
            const uploadedUrl = await storageService.uploadFile(file, 'CEDOC');
            setForm(prev => ({
                ...prev,
                [field]: uploadedUrl
            }));
        } catch (err) {
            setError(err.message || 'Error al subir el archivo');
        } finally {
            if (field === 'url') setUploadingFile(false);
            if (field === 'thumbnailUrl') setUploadingThumb(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        const payload = {
            ...form,
            type: 'CEDOC',
            authorId: user?.id || 1,
            categories: selectedCategories
        };

        try {
            if (itemAEditar?.id) {
                await multimediaService.update(itemAEditar.id, payload);
                setToast({ show: true, title: 'CEDOC actualizado', message: 'Los cambios se guardaron correctamente' });
            } else {
                await multimediaService.create(payload);
                setToast({ show: true, title: 'CEDOC creado', message: 'El documento se guardó correctamente' });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const closeToastAndNavigate = () => {
        setToast({ show: false, title: '', message: '' });
        navigate('/admin/cedoc/editar');
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro que deseas eliminar este item del CEDOC?")) return;
        setLoading(true);
        try {
            await multimediaService.delete(itemAEditar.id);
            navigate('/admin/cedoc/editar');
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Administrar CEDOC</h1>

            <h2>{itemAEditar ? 'Editar documento' : 'Crear nuevo documento'}</h2>

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

                <div style={{ padding: '15px', background: '#2a2a2a', borderRadius: '8px', marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Tipo de contenido:</p>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                            <input 
                                type="radio" 
                                checked={mediaType === 'image'} 
                                onChange={() => setMediaType('image')} 
                            />
                            Documento PDF / Imagen
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                            <input 
                                type="radio" 
                                checked={mediaType === 'video'} 
                                onChange={() => setMediaType('video')} 
                            />
                            Video (YouTube)
                        </label>
                    </div>

                    {mediaType === 'image' ? (
                        <div>
                            <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>Sube el archivo principal (PDF o Imagen):</p>
                            <input
                                type="file"
                                accept="image/*,application/pdf"
                                onChange={(e) => handleFileUpload(e, 'url')}
                                disabled={uploadingFile}
                            />
                            {uploadingFile && <span style={{ color: '#f59e0b' }}>Subiendo archivo...</span>}
                            {form.url && !uploadingFile && (
                                <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                                    <span style={{ color: '#4ade80' }}>✓ Archivo listo:</span> {form.url.split('/').pop()}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <input
                                type="text"
                                name="url"
                                value={form.url}
                                placeholder="Pega el enlace de YouTube aquí"
                                onChange={handleChange}
                                required={mediaType === 'video'}
                            />
                        </div>
                    )}
                </div>

                <textarea
                    name="description"
                    value={form.description}
                    placeholder="Descripción"
                    onChange={handleChange}
                    style={{ minHeight: '100px' }}
                />

                <input
                    type="text"
                    name="year"
                    value={form.year}
                    placeholder="Año"
                    onChange={handleChange}
                />

                <div style={{ padding: '15px', background: '#2a2a2a', borderRadius: '8px', marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Portada (Opcional):</p>
                    <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#a3a3a3' }}>
                        Sube una imagen para mostrarla como portada en las listas.
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'thumbnailUrl')}
                        disabled={uploadingThumb}
                    />
                    {uploadingThumb && <span style={{ color: '#f59e0b' }}>Subiendo portada...</span>}
                    {form.thumbnailUrl && !uploadingThumb && (
                        <div style={{ marginTop: '10px' }}>
                            <img src={form.thumbnailUrl} alt="Portada" style={{ height: '80px', borderRadius: '5px' }} />
                        </div>
                    )}
                    <input
                        type="text"
                        name="thumbnailUrl"
                        value={form.thumbnailUrl}
                        placeholder="URL directa de la portada (si tienes el link)"
                        onChange={handleChange}
                        style={{ marginTop: '10px' }}
                    />
                </div>

                <input
                    type="text"
                    name="author"
                    value={form.author}
                    placeholder="Autor"
                    onChange={handleChange}
                    required
                />

                {/* ── SECCIÓN CATEGORÍAS ── */}
                <div className="admin-categories-section">
                    <p className="admin-categories-title">🏷️ Categorías:</p>
                    {selectedCategories.length > 0 && (
                        <div className="admin-categories-selected">
                            {selectedCategories.map((cat) => (
                                <span key={cat} className="admin-cat-pill">
                                    {cat}
                                    <button type="button" onClick={() => setSelectedCategories(prev => prev.filter(c => c !== cat))}>✕</button>
                                </span>
                            ))}
                        </div>
                    )}
                    {availableCategories.filter(c => !selectedCategories.includes(c)).length > 0 && (
                        <div className="admin-categories-available">
                            <p className="admin-categories-subtitle">Categorías disponibles:</p>
                            <div className="admin-categories-pills">
                                {availableCategories.filter(c => !selectedCategories.includes(c)).map((cat) => (
                                    <button key={cat} type="button" className="admin-cat-add-pill" onClick={() => setSelectedCategories(prev => [...prev, cat])}>
                                        + {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="admin-categories-new">
                        <input
                            type="text"
                            value={newCategory}
                            placeholder="Nueva categoría..."
                            onChange={(e) => setNewCategory(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const trimmed = newCategory.trim();
                                    if (trimmed && !selectedCategories.includes(trimmed)) {
                                        setSelectedCategories(prev => [...prev, trimmed]);
                                        if (!availableCategories.includes(trimmed)) {
                                            setAvailableCategories(prev => [...prev, trimmed]);
                                        }
                                        setNewCategory('');
                                    }
                                }
                            }}
                        />
                        <button type="button" onClick={() => {
                            const trimmed = newCategory.trim();
                            if (trimmed && !selectedCategories.includes(trimmed)) {
                                setSelectedCategories(prev => [...prev, trimmed]);
                                if (!availableCategories.includes(trimmed)) {
                                    setAvailableCategories(prev => [...prev, trimmed]);
                                }
                                setNewCategory('');
                            }
                        }}>Agregar</button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" disabled={loading || uploadingFile || uploadingThumb} style={{ background: 'var(--purpura)', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none', fontWeight: 'bold' }}>
                        {loading ? 'Guardando...' : (itemAEditar ? 'Guardar Cambios' : 'Publicar')}
                    </button>

                    {itemAEditar && (
                        <button 
                            type="button" 
                            disabled={loading || uploadingFile || uploadingThumb} 
                            onClick={handleDelete}
                            style={{ background: 'var(--rojo)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Eliminar Item
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

export default CedocAdmin;
