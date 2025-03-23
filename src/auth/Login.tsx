import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

// Define manualmente el tipo para las opciones de las cookies
interface CookieAttributes {
  path?: string;
  expires?: number | Date;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none' | undefined;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Usa el tipo definido manualmente
  const cookieOptions: CookieAttributes = {
    path: '/',
    secure: false, // Cambia a `true` si usas HTTPS en producción
    sameSite: 'strict', // ✅ Valor válido
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading('Iniciando sesión...', {
      position: 'top-center',
      style: { background: '#28395a', color: '#fff' },
    });

    try {
      const response = await api.post('/token/', { username, password });
      const { access, refresh, user } = response.data;

      // Guardar tokens en cookies
      Cookies.set('access_token', access, cookieOptions);
      Cookies.set('refresh_token', refresh, cookieOptions);

      // Actualizar el estado de autenticación
      login(access, refresh, user);

      // Redirigir al usuario a la página deseada
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from);
      toast.success('¡Sesión iniciada!', { id: toastId });
    } catch (err: any) {
      let errorMessage = 'Error desconocido';

      if (err.response) {
        const { status, data } = err.response;

        // Manejo de errores específicos
        if (status === 400) {
          errorMessage = data?.detail || 'Datos inválidos';
        } else if (status === 401) {
          errorMessage = data?.detail || 'Credenciales inválidas';
        } else if (status === 404) {
          errorMessage = 'Usuario no encontrado';
        } else {
          errorMessage = 'Error de autenticación';
        }
      }

      // Mostrar mensaje de error
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#141f33] rounded-lg shadow-lg">
        <div className="flex justify-center">
          <img src="/1.png" className="h-28 w-auto" alt="Logo" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-[#28395a] text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Usuario"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-[#28395a] text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contraseña"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white transition-all duration-200 ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l-1.75 1.75A9.959 9.959 0 002 22C2 23.104 2.896 24 4 24h16c1.104 0 2-.896 2-2v-4c0-1.104-.896-2-2-2H4z"
                  />
                </svg>
                Cargando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;