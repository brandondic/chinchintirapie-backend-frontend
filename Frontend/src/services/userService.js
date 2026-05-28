import { apiFetch } from './apiFetch';

// Construye la URL base de /api/users de forma robusta
// En desarrollo usa el proxy de vite.config.js, en producción usa VITE_API_URL
let apiBase = '/api/users';
if (import.meta.env.VITE_API_URL) {
  let url = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
  url = url.replace(/\/auth\/?$/, '');
  url = url.replace(/\/api\/?$/, '');
  apiBase = `${url}/api/users`;
}
const API_BASE = apiBase;

const userService = {
  async fetchAll() {
    const response = await apiFetch(`${API_BASE}`);
    return response.json();
  },

  async fetchById(id) {
    const response = await apiFetch(`${API_BASE}/${id}`);
    return response.json();
  },

  async update(id, data) {
    const response = await apiFetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(id) {
    await apiFetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
  },
};

export default userService;
