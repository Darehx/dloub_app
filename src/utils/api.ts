import axios from 'axios';
import { useCookies } from 'react-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Envía cookies automáticamente
});

api.interceptors.request.use((config) => {
  const [cookies] = useCookies(['access_token']);
  if (cookies.access_token) config.headers.Authorization = `Bearer ${cookies.access_token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const [cookies] = useCookies(['refresh_token']);
        const response = await axios.post('/token/refresh/', { refresh: cookies.refresh_token });

        setCookie('access_token', response.data.access, { path: '/', secure: true, sameSite: 'strict' });
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        removeCookie('access_token');
        removeCookie('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;