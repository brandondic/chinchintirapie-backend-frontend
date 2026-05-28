/**
 * apiFetch — wrapper centralizado para peticiones autenticadas.
 * Si el backend devuelve 401 (token expirado o inválido),
 * limpia la sesión y redirige al login automáticamente.
 */
import authService from './authService';

export async function apiFetch(url, options = {}) {
  const token = authService.getToken();
  const headers = {
    'Content-Type': 'application/json',
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
    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
  }

  return response;
}
