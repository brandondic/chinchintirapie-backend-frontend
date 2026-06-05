import { apiFetch } from './apiFetch';

/**
 * Servicio para multimedia (Repositorio, CEDOC, Material Educativo).
 * Conecta con el endpoint /api/multimedia.
 *
 * Usa apiFetch que automáticamente:
 * - Construye la URL completa (API_BASE + endpoint)
 * - Agrega el token JWT en las cabeceras
 * - Maneja errores de red y sesión expirada
 */
const multimediaService = {
  /**
   * Obtener todos los multimedia
   */
  async fetchAll() {
    const response = await apiFetch('/multimedia');
    return response.json();
  },

  /**
   * Obtener un multimedia por ID
   */
  async fetchById(id) {
    const response = await apiFetch(`/multimedia/${id}`);
    return response.json();
  },

  /**
   * Obtener multimedia por tipo (REPOSITORIO, CEDOC, MATERIAL_EDUCATIVO)
   */
  async fetchByType(type) {
    const timestamp = new Date().getTime();
    const response = await apiFetch(`/multimedia/type/${type}?t=${timestamp}`);
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

  /**
   * Obtener lista de categorías disponibles.
   * @param {string} [type] - Tipo de multimedia (REPOSITORIO, CEDOC, MATERIAL_EDUCATIVO). Si no se pasa, devuelve todas.
   */
  async fetchCategorias(type) {
    const params = type ? `?type=${type}` : '';
    const response = await apiFetch(`/multimedia/categorias${params}`);
    return response.json();
  },

  /**
   * Obtener multimedia filtrado por tipo y categoría.
   */
  async fetchByTypeAndCategory(type, category) {
    const response = await apiFetch(`/multimedia/type/${type}/category/${encodeURIComponent(category)}`);
    return response.json();
  },

  /**
   * Crear un nuevo multimedia
   */
  async create(data) {
    const response = await apiFetch('/multimedia', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Actualizar un multimedia
   */
  async update(id, data) {
    const response = await apiFetch(`/multimedia/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Eliminar un multimedia
   */
  async delete(id) {
    await apiFetch(`/multimedia/${id}`, {
      method: 'DELETE',
    });
  },
};

export default multimediaService;

