/**
 * apiFetch.js — Wrapper centralizado para TODAS las peticiones a la API.
 *
 * ¿Qué es un "wrapper"?
 * Es una función que "envuelve" a otra (en este caso a fetch) y le agrega
 * funcionalidades extras automáticamente:
 *
 * 1. Agrega el token JWT a las cabeceras (si hay sesión activa)
 * 2. Si el backend responde 401 (token expirado), cierra sesión y redirige al login
 * 3. Maneja errores de red (backend caído o sin conexión)
 * 4. Construye la URL completa a partir de rutas relativas
 *
 * TODOS los servicios (articuloService, multimediaService, etc.) usan esta
 * función en lugar de fetch() directamente, excepto authService que usa
 * fetch nativo para evitar una dependencia circular.
 */
import authService from './authService';
import { API_BASE } from './apiConfig';

/**
 * @param {string} endpoint — Ruta relativa (ej: '/articulos') o URL completa
 * @param {object} options — Opciones de fetch (method, body, headers extra)
 * @returns {Promise<Response>} — La respuesta del servidor
 */
export async function apiFetch(endpoint, options = {}) {
  // Si el endpoint empieza con 'http', ya es una URL completa → usarla tal cual.
  // Si empieza con '/' (ej: '/multimedia/5'), construir la URL con API_BASE.
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  const token = authService.getToken();
  
  // Si el body es FormData (subida de archivos), no seteamos Content-Type
  // para que el navegador ponga automáticamente multipart/form-data con sus boundaries
  const isFormData = options.body instanceof FormData;
  
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  let response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch {
    // Error de red (backend durmiendo / sin conexión)
    throw new Error('No se pudo conectar con el servidor. Verifica tu conexión o espera que el backend despierte.');
  }

  if (response.status === 401) {
    // Token expirado o inválido — cerrar sesión y redirigir
    authService.logout();
    window.location.href = '/login?expired=1';
    throw new Error('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
  }

  if (!response.ok) {
    let errorMsg = `Error HTTP ${response.status}: ${response.statusText}`;
    try {
      const errData = await response.json();
      if (errData.message) {
        errorMsg = errData.message;
      } else if (errData.errors) { // Si son varios errores de validación
        errorMsg = Object.values(errData.errors).join(', ');
      } else if (typeof errData === 'string') {
        errorMsg = errData;
      }
    } catch (e) {
      // Ignorar si no es JSON
    }
    throw new Error(errorMsg);
  }

  return response;
}

// Re-exportar API_BASE para que los servicios puedan importarla desde aquí también
export { API_BASE };
