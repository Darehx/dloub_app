import axios from 'axios';
import Cookies from 'js-cookie';

// Configuración de la URL base de la API usando una variable de entorno
const api = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL, // Usa la variable de entorno
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Interceptor de request
api.interceptors.request.use(config => {
  const accessToken = Cookies.get('access_token');
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Interceptor de response
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Manejo de errores 401 (token expirado)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        // Refrescar el token
        const response = await axios.post(`${import.meta.env.PUBLIC_API_URL}/token/refresh/`, { refresh: refreshToken });

        // Guardar el nuevo token de acceso
        Cookies.set('access_token', response.data.access, {
          path: '/',
          secure: false, // Cambia a `true` si usas HTTPS en producción
          sameSite: 'strict', // ✅ Valor válido
        });

        // Actualizar el header de autorización
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

        // Reintentar la solicitud original
        return api(originalRequest);
      } catch (refreshError) {
        // Eliminar cookies si falla el refresco del token
        Cookies.remove('access_token', { path: '/' });
        Cookies.remove('refresh_token', { path: '/' });

        // Redirigir al usuario al login
        window.location.href = '/login?error=token_expired';
      }
    }

    // Propagar el error si no es manejado
    return Promise.reject(error);
  }
);

export default api;