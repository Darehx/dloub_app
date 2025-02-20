import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import Employees from './components/employees/Employees';
import Orders from './components/orders/Orders';
import Services from './components/services/Services';
import Profile from './components/Profile/Profile';
import Sidebar from './components/common/Sidebar';

// Componente para proteger rutas
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const AppContent = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar logo="/logo.png" />
      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/services" element={<Services />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
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