import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie'; // Usamos js-cookie para manejar cookies

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

  const isAuthenticated = !!Cookies.get('access_token'); // Verifica si hay un token de acceso

  const login = (access: string, refresh: string, userData: any) => {
    Cookies.set('access_token', access, { path: '/', secure: true, sameSite: 'strict' });
    Cookies.set('refresh_token', refresh, { path: '/', secure: true, sameSite: 'strict' });
    setUser(userData ?? null);
  };

  const logout = () => {
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });
    setUser(null);
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