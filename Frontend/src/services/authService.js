// En desarrollo usa el proxy de vite.config.js ('/api/auth')
// En producción usará la URL del backend definida en VITE_API_URL
let apiBase = '/api/auth';
if (import.meta.env.VITE_API_URL) {
  let url = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
  url = url.replace(/\/auth\/?$/, '');
  if (!url.endsWith('/api')) {
    apiBase = `${url}/api/auth`;
  } else {
    apiBase = `${url}/auth`;
  }
}
const API_BASE = apiBase;

/**
 * Servicio de autenticación usando fetch nativo.
 * Se conecta al backend Spring Boot JWT en /api/auth/*
 */
const authService = {
  /**
   * Registrar nuevo usuario
   * @param {string} fullName
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token, tokenType, userId, fullName, email, role}>}
   */
  async register(fullName, email, password) {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message || data.error || 'Error al registrarse';
      throw new Error(errorMsg);
    }

    return data;
  },

  /**
   * Iniciar sesión
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token, tokenType, userId, fullName, email, role}>}
   */
  async login(email, password) {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message || data.error || 'Credenciales incorrectas';
      throw new Error(errorMsg);
    }

    // Guardar token y datos del usuario en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    }));

    return data;
  },

  /**
   * Cerrar sesión — limpia localStorage
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Obtener token JWT guardado
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Obtener datos del usuario guardado
   * @returns {{id, fullName, email, role}|null}
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Verificar si hay sesión activa
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  /**
   * Helper para hacer peticiones autenticadas a la API
   * @param {string} url
   * @param {object} options
   * @returns {Promise<Response>}
   */
  async authFetch(url, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    return fetch(url, { ...options, headers });
  },

  /**
   * Solicitar recuperación de contraseña
   * @param {string} email
   * @returns {Promise<{message: string}>}
   */
  async forgotPassword(email) {
    const response = await fetch(`${API_BASE}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message || data.error || 'Error al procesar la solicitud';
      throw new Error(errorMsg);
    }

    return data;
  },

  /**
   * Restablecer contraseña con token
   * @param {string} token
   * @param {string} newPassword
   * @returns {Promise<{message: string}>}
   */
  async resetPassword(token, newPassword) {
    const response = await fetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message || data.error || 'Error al restablecer la contraseña';
      throw new Error(errorMsg);
    }

    return data;
  },
};

export default authService;
