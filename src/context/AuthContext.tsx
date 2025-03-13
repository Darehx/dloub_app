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

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get('access_token'));

  // Verifica la autenticación al montar el componente
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get('access_token');
      if (accessToken) {
        try {
          const response = await api.get('/user/', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (err) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  const login = (access: string, refresh: string, userData: any) => {
    const cookieOptions = {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict' as const,
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