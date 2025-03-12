import React, { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie'; // Usamos react-cookie para manejar cookies

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
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);
  const [user, setUser] = useState<any>(null);

  const isAuthenticated = !!cookies.access_token;

  const login = (access: string, refresh: string, userData: any) => {
    setCookie('access_token', access, { path: '/', secure: true, sameSite: 'strict' });
    setCookie('refresh_token', refresh, { path: '/', secure: true, sameSite: 'strict' });
    setUser(userData ?? null);
  };

  const logout = () => {
    removeCookie('access_token');
    removeCookie('refresh_token');
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