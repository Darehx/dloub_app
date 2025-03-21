import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../utils/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name?: string; role?: string; avatar?: string } | null;
  login: (access: string, refresh: string, userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get('access_token'));

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) throw new Error('No token');
        
        const response = await api.get('/api/user/');
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
        Cookies.remove('access_token', { path: '/' });
        Cookies.remove('refresh_token', { path: '/' });
      }
    };
    checkAuth();
  }, []);

  const login = (access: string, refresh: string, userData: any) => {
  // Configuración de cookies
const cookieOptions = {
  path: '/', // Ruta donde la cookie es válida
  secure: process.env.NODE_ENV === 'production', // Solo usa HTTPS en producción
  sameSite: 'strict' as const, // ✅ Valor válido para sameSite
};
    
    Cookies.set('access_token', access, cookieOptions);
    Cookies.set('refresh_token', refresh, cookieOptions);
    setUser(userData ?? null);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};