import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Importa useAuth
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import Employees from './components/employees/Employees';
import Orders from './components/orders/Orders';
import Services from './components/services/Services';
import Profile from './components/Profile/Profile';
import Sidebar from './components/common/Sidebar';
import {
  FaHome, // Para Dashboard
  FaUsers, // Para Empleados
  FaList, // Para Órdenes
  FaCog, // Para Servicios
} from 'react-icons/fa';

const AppContent = () => {
  const { logout } = useAuth(); // Accede a la función logout del contexto

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
  logo="/logo.png"
  navigation={[
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <FaHome />, // Ícono de inicio
      exact: true,
    },
    {
      name: 'Empleados',
      href: '/employees',
      icon: <FaUsers />, // Ícono de usuarios
    },
    {
      name: 'Órdenes',
      href: '/orders',
      icon: <FaList />, // Ícono de lista
    },
    {
      name: 'Servicios',
      href: '/services',
      icon: <FaCog />, // Ícono de configuración
    },
  ]}
  profileOptions={[
    { name: 'Perfil', href: '/profile' },
    {
      name: 'Cerrar sesión',
      onClick: async () => {
        console.log('Cerrando sesión...');
        await logout(); // Usa la función logout del contexto
      },
    },
  ]}
/>
      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          {/* Rutas protegidas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;