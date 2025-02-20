import React, { useState, useEffect, useRef } from 'react';
import type { JSX } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaHome,
  FaUserCircle,
  FaList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaFileInvoiceDollar,
  FaCode,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

// Props del Sidebar
interface SidebarProps {
  logo?: string; // Prop opcional para el logo
}

// Tipo para los elementos de navegación con href
interface NavItemWithHref {
  type: 'link'; // Discriminador
  name: string;
  href: string;
  icon: JSX.Element;
  exact?: boolean; // Propiedad opcional para rutas exactas
}

// Tipo para los elementos de navegación con onClick
interface NavItemWithOnClick {
  type: 'button'; // Discriminador
  name: string;
  onClick: () => void | Promise<void>;
  icon: JSX.Element;
}

// Unión de tipos para los elementos de navegación
type NavItem = NavItemWithHref | NavItemWithOnClick;

const Sidebar: React.FC<SidebarProps> = ({ logo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(true); // Estado inicial compacto

  // Referencias para manejar clics fuera del menú de perfil
  const profileRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Maneja clics fuera del menú de perfil
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Si el usuario no está autenticado, no muestra el Sidebar
  if (!isAuthenticated) return null;

  // Botones fijos (disponibles para todos los usuarios)
  const fixedNav: NavItem[] = [
    {
      type: 'link',
      name: 'Dashboard',
      href: '/dashboard',
      icon: <FaHome className="text-xl" />,
      exact: true,
    },
    {
      type: 'link',
      name: 'Pedidos',
      href: '/orders',
      icon: <FaList className="text-xl" />,
    },
    {
      type: 'link',
      name: 'Perfil',
      href: '/profile',
      icon: <FaUserCircle className="text-xl" />,
    },
  ];

  // Botones dinámicos (dependen del rol del usuario)
  const dynamicNav: Record<string, NavItem[]> = {
    admin: [
      {
        type: 'link',
        name: 'Empleados',
        href: '/employees',
        icon: <FaUsers className="text-xl" />,
      },
      {
        type: 'link',
        name: 'Servicios',
        href: '/services',
        icon: <FaCog className="text-xl" />,
      },
    ],
    billing: [
      {
        type: 'link',
        name: 'Facturación',
        href: '/billing',
        icon: <FaFileInvoiceDollar className="text-xl" />,
      },
    ],
    dev: [
      {
        type: 'link',
        name: 'Configuración',
        href: '/settings',
        icon: <FaCog className="text-xl" />,
      },
      {
        type: 'link',
        name: 'API Logs',
        href: '/api-logs',
        icon: <FaCode className="text-xl" />,
      },
    ],
  };

  // Combina los botones fijos con los dinámicos según el rol del usuario
  const combinedNav = [...fixedNav, ...(dynamicNav[user?.role || 'guest'] || [])];

  // Opciones del menú de perfil
  const profileOptions: NavItem[] = [
    {
      type: 'link',
      name: 'Perfil',
      href: '/profile',
      icon: <FaUserCircle className="text-lg" />,
    },
    {
      type: 'button',
      name: 'Cerrar sesión',
      onClick: async () => {
        await logout();
        navigate('/login');
      },
      icon: <FaSignOutAlt className="text-lg" />,
    },
  ];

  // Función para verificar si un ítem está activo
  const isActive = (href: string, exact = false) => {
    return exact ? pathname === href : pathname.startsWith(href);
  };

  return (
    <div
      className={`bg-gray-800 text-white min-h-screen flex flex-col transition-all duration-300 ${
        isCompact ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-center">
        {logo && (
          <img
            src={logo}
            alt="Logo"
            className={`w-10 h-10 transition-all duration-300 ${isCompact ? 'mx-auto' : ''}`}
          />
        )}
      </div>

      {/* Navegación (Centrada verticalmente) */}
      <nav className="flex-grow flex flex-col justify-center">
        {combinedNav.map((item) => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center px-4 py-2 rounded-sm text-md font-light transition-colors duration-300
                  ${isActive(item.href, item.exact)
                    ? 'hover:bg-[#3db1ff] text-gray-700 bg-[#CDC1FF]'
                    : 'text-gray-300 hover:bg-[#3db1ff] hover:text-gray-700'
                  }
                `}
              >
                <span className="mr-4">{item.icon}</span>
                {!isCompact && <span>{item.name}</span>}
              </Link>
            );
          }
          return null;
        })}
      </nav>

      {/* Parte inferior */}
      <div className="px-4 py-4">
        {/* Avatar y nombre del usuario */}
        <div
          ref={avatarRef}
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center cursor-pointer mb-4"
        >
          <FaUserCircle className="text-2xl text-gray-400" />
          {!isCompact && (
            <div className="ml-2">
              <p className="text-sm font-medium">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-blue-400">{user?.role || 'Invitado'}</p>
            </div>
          )}
        </div>

        {/* Menú de perfil */}
        {isProfileMenuOpen && (
          <div
            ref={profileRef}
            className="absolute bottom-20 left-20 bg-white text-gray-700 rounded-md shadow-lg w-48 z-10"
          >
            {profileOptions.map((option) => (
              <div
                key={option.name}
                onClick={() => {
                  if (option.type === 'button') {
                    option.onClick();
                  } else {
                    setIsProfileMenuOpen(false);
                  }
                }}
                className="px-4 py-2 hover:bg-[#CDC1FF] hover:text-black cursor-pointer flex items-center"
              >
                <span className="mr-2">{option.icon}</span>
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Botón para alternar el modo compacto */}
        <button
          onClick={() => setIsCompact(!isCompact)}
          className="mt-4 w-full flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-[#CDC1FF] hover:text-black"
        >
          {isCompact ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;