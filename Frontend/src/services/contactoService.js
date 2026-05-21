// En desarrollo usa el proxy de vite.config.js ('/api')
// En producción usará la URL del backend sin '/auth' al final
const API_BASE = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace(/\/auth\/?$/, '') 
  : '/api';

/**
 * Servicio para el formulario de contacto.
 * Conecta con el endpoint /api/contacto.
 */
const contactoService = {
  /**
   * Enviar datos de formulario de contacto
   * @param {object} formData - { nombre, email, telefono, asunto, mensaje }
   * @returns {Promise<object>}
   */
  async enviarMensaje(formData) {
    const response = await fetch(`${API_BASE}/contacto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get('content-type');
    let data = {};
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    if (!response.ok) {
      const errorMsg = data.message || data.error || 'Error al enviar el mensaje';
      throw new Error(errorMsg);
    }

    return data;
  },
};

export default contactoService;
