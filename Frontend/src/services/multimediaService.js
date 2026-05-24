// En desarrollo usa el proxy de vite.config.js ('/api')
// En producción usará la URL del backend
const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/auth\/?$/, '')
  : '/api';

/**
 * Servicio para multimedia (Repositorio, CEDOC, Material Educativo).
 * Conecta con el endpoint /api/multimedia.
 */
const multimediaService = {
  /**
   * Obtener todos los multimedia
   */
  async fetchAll() {
    const response = await fetch(`${API_BASE}/multimedia`);
    if (!response.ok) throw new Error('Error al obtener multimedia');
    return response.json();
  },

  /**
   * Obtener un multimedia por ID
   */
  async fetchById(id) {
    const response = await fetch(`${API_BASE}/multimedia/${id}`);
    if (!response.ok) throw new Error('Multimedia no encontrado');
    return response.json();
  },

  /**
   * Obtener multimedia por tipo (REPOSITORIO, CEDOC, MATERIAL_EDUCATIVO)
   */
  async fetchByType(type) {
    const response = await fetch(`${API_BASE}/multimedia/type/${type}`);
    if (!response.ok) throw new Error('Error al obtener multimedia por tipo');
    return response.json();
  },

  /**
   * Obtener solo contenido de Repositorio
   */
  async fetchRepositorio() {
    return this.fetchByType('REPOSITORIO');
  },

  /**
   * Obtener solo contenido de CEDOC
   */
  async fetchCedoc() {
    return this.fetchByType('CEDOC');
  },

  /**
   * Obtener solo Material Educativo
   */
  async fetchMaterialEducativo() {
    return this.fetchByType('MATERIAL_EDUCATIVO');
  },
};

export default multimediaService;
