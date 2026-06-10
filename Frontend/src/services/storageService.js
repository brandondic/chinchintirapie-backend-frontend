import { apiFetch } from './apiFetch';

/**
 * Servicio para subir archivos (imágenes, PDFs, etc) a Cloudflare R2
 * a través de nuestro backend.
 */
const storageService = {
  /**
   * Sube un archivo y devuelve la URL pública donde quedó alojado.
   * 
   * @param {File} file - El archivo obtenido desde el <input type="file" />
   * @returns {Promise<string>} - La URL pública del archivo
   */
  async uploadFile(file, folder = 'GENERAL', subfolder = '') {
    if (!file) throw new Error("No hay archivo para subir.");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    if (subfolder) {
      formData.append('subfolder', subfolder);
    }

    // No le ponemos 'Content-Type': 'application/json' porque fetch
    // genera el Content-Type multipart/form-data con los boundaries automáticamente
    const response = await apiFetch('/upload', {
      method: 'POST',
      body: formData,
      // Tenemos que eliminar cualquier Content-Type que se intente setear
      // para que el navegador ponga el suyo
      headers: {
        // En apiFetch pusimos 'application/json' por defecto, 
        // aquí lo sobreescribimos a null (o lo limpiamos en el fetch)
      }
    });

    const data = await response.json();
    return data.url;
  }
};

export default storageService;
