import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: {
    name?: string;
    role?: string;
    avatar?: string;
  } | null;
  login: (access: string, refresh: string, userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refresh_token'));
  const [user, setUser] = useState<any>(() => {
    const userData = localStorage.getItem('user');
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  const isAuthenticated = !!accessToken;

  const login = (access: string, refresh: string, userData: any) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    // Asegurar que userData sea un objeto válido o null
    localStorage.setItem('user', JSON.stringify(userData ?? null));
    setAccessToken(access);
    setRefreshToken(refresh);
    setUser(userData ?? null);
  };

  const logout = async () => {
    console.log('Cerrando sesión...');
    
    try {
      // Elimina los datos de localStorage
      localStorage.removeItem('access_token');
      console.log('Eliminado access_token');
      
      localStorage.removeItem('refresh_token');
      console.log('Eliminado refresh_token');
      
      localStorage.removeItem('user');
      console.log('Eliminado user');
  
      // Actualiza el estado
      setAccessToken(null);
      console.log('Actualizado accessToken a null');
      
      setRefreshToken(null);
      console.log('Actualizado refreshToken a null');
      
      setUser(null);
      console.log('Actualizado user a null');
  
      // Pequeño retraso para asegurar la actualización del estado
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log('Estado actualizado y listo para redirigir');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};