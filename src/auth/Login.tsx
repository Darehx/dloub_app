import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import Crystal from '../components/common/Cristal';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/token/', { username, password });
      const { access, refresh, user } = response.data;

      const cookieOptions = {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict' as const,
      };

      Cookies.set('access_token', access, cookieOptions);
      Cookies.set('refresh_token', refresh, cookieOptions);

      login(access, refresh, user);
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from);
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Credenciales inválidas. Inténtalo de nuevo.');
      } else {
        toast.error('Error al iniciar sesión. Intenta más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#141f33] rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <img src='/1.png' className="h-28 w-auto" alt="Logo" />
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
            className={`w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white transition-all duration-200 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
