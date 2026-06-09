/**
 * authService.js — Servicio de autenticación.
 *
 * NOTA: Este servicio usa fetch() nativo en lugar de apiFetch().
 * ¿Por qué? Porque apiFetch importa authService para obtener el token.
 * Si authService importara apiFetch, tendríamos una "dependencia circular":
 *   authService → apiFetch → authService → apiFetch → ... (bucle infinito)
 *
 * Esto no es un problema porque los endpoints de auth (login, register,
 * forgot-password, reset-password) son PÚBLICOS — no necesitan token JWT.
 */
import { API_BASE } from './apiConfig';

// Los endpoints de autenticación están bajo /api/auth
const AUTH_BASE = `${API_BASE}/auth`;

const authService = {
  /**
   * Registrar nuevo usuario
   * @param {string} fullName
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{message: string}>}
   */
  async register(fullName, email, password) {
    const response = await fetch(`${AUTH_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error('Error de conexión: El servidor backend no está respondiendo.');
    }

    if (!response.ok) {
      const errorMsg = data.message || data.error || 'Error al registrarse';
      throw new Error(errorMsg);
    }

    return data;
  },

  /**
   * Obtener el Client ID de Google desde el backend
   * @returns {Promise<string>}
   */
  async getGoogleClientId() {
    const response = await fetch(`${AUTH_BASE}/google/client-id`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener Google Client ID');
    }
    return data.clientId;
  },

  /**
   * Iniciar sesión con Google
   * @param {string} token - ID Token de Google
   * @returns {Promise<{token, tokenType, userId, fullName, email, role}>}
   */
  async loginWithGoogle(token) {
    const response = await fetch(`${AUTH_BASE}/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error('Error de conexión: El servidor backend no está respondiendo.');
    }

    if (!response.ok) {
      const errorMsg = data.message || data.error || 'Error al iniciar sesión con Google';
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
   * Iniciar sesión
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token, tokenType, userId, fullName, email, role}>}
   */
  async login(email, password) {
    const response = await fetch(`${AUTH_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error('Error de conexión: El servidor backend no está respondiendo.');
    }

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
    const response = await fetch(`${AUTH_BASE}/forgot-password`, {
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
    const response = await fetch(`${AUTH_BASE}/reset-password`, {
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
