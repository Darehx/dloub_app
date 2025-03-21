import axios from 'axios';
import Cookies from 'js-cookie'; // Usamos js-cookie para manejar cookies
import MockAdapter from 'axios-mock-adapter';



// Importa los mocks usando `import`
import tokenMock from './mocks/token.json';
import tokenRefreshMock from './mocks/token-refresh.json';
import userMock from './mocks/user.json';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'desarrollo' 
    ? 'http://localhost:8000/api' 
    : '', // BaseURL vacía para desarrollo
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Configuración de mocks para desarrollo
if (process.env.NODE_ENV !== 'production') {
  const mock = new MockAdapter(api, { delayResponse: 500 });

  // Mock para inicio de sesión
  mock.onPost('/api/token/').reply(200, tokenMock);
  
  // Mock para refresco de token
  mock.onPost('/api/token/refresh/').reply(200, tokenRefreshMock);
  
  // Mock para datos de usuario
  mock.onGet('/api/user/').reply(200, userMock);
  
  // Mock para manejar redirecciones
  mock.onAny().reply(200, {});
}

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get('access_token'); // Obtén el token de acceso desde las cookies
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token'); // Obtén el token de actualización desde las cookies
        const response = await axios.post('/token/refresh/', { refresh: refreshToken });

        // Guarda el nuevo token de acceso en las cookies
        Cookies.set('access_token', response.data.access, { path: '/', secure: true, sameSite: 'strict' });
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Elimina las cookies si hay un error al refrescar el token
        Cookies.remove('access_token', { path: '/' });
        Cookies.remove('refresh_token', { path: '/' });
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;