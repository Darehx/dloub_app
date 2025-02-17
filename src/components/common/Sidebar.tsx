// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaUsers, FaList, FaCog } from 'react-icons/fa'; // Importa íconos de react-icons

interface SidebarProps {
  logo?: string; // URL del logo
  navigation?: {
    name: string;
    href: string;
    icon?: React.ReactNode;
    exact?: boolean;
  }[];
  profileOptions?: {
    name: string;
    href?: string;
    onClick?: () => void;
  }[];
}

const Sidebar = ({ logo, navigation = [], profileOptions = [] }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  // Opciones de navegación por defecto
  const defaultNav = [
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
  ];

  // Opciones de perfil por defecto
  const defaultProfileOptions = [
    { name: 'Perfil', href: '/profile' },
    {
      name: 'Cerrar sesión',
      onClick: () => {
        console.log('Botón Cerrar sesión presionado'); // Debugging
        logout(); // Cierra la sesión
        console.log('Redirigiendo a /login'); // Debugging
        navigate('/login'); // Redirige al login
      },
    },
  ];

  const navItems = navigation.length > 0 ? navigation : defaultNav;
  const profileItems = profileOptions.length > 0 ? profileOptions : defaultProfileOptions;

  const isActive = (href: string, exact = false) => {
    return exact ? pathname === href : pathname.startsWith(href);
  };

  return (
    <>
      {/* Botón móvil */}
      <button
        className="fixed top-4 left-4 z-50 sm:hidden p-2 bg-gray-800 text-white rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-gray-800 text-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-4 py-6">
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center">
            <img
              alt="Logo"
              src={logo || "https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"}
              className="h-10 w-auto"
            />
          </div>

          {/* Navegación */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)} // Cierra el Sidebar en móviles
                className={`
                  flex items-center rounded-md px-3 py-2 text-sm font-medium
                  ${isActive(item.href, item.exact)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Perfil */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                alt="Avatar"
                src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-white">
                  {user?.name || 'Usuario'}
                </p>
                <p className="text-xs text-gray-400">
                  {user?.role || 'Administrador'}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              {profileItems.map((option) => (
                <div key={option.name}>
                  {option.href ? (
                    <Link
                      to={option.href}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsOpen(false)} // Cierra el Sidebar en móviles
                    >
                      {option.name}
                    </Link>
                  ) : (
                    <button
                      onClick={option.onClick}
                      className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      style={{
                        cursor: 'pointer', // Asegura que el cursor indique que es clickeable
                      }}
                    >
                      {option.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay móvil para cerrar el Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;