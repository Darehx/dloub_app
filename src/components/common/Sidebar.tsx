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


// Define el logo como una constante (asegúrate de que la ruta sea la correcta)
const logo = '/Logo_crystal_2024.svg';

// Elimina la prop logo del SidebarProps
interface SidebarProps {}

// Tipos para los elementos de navegación
interface NavItemWithHref {
  type: 'link';
  name: string;
  href: string;
  icon: JSX.Element;
  exact?: boolean;
}

interface NavItemWithOnClick {
  type: 'button';
  name: string;
  onClick: () => void | Promise<void>;
  icon: JSX.Element;
}

type NavItem = NavItemWithHref | NavItemWithOnClick;

const Sidebar: React.FC<SidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(true);

  const profileRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) return null;

  const fixedNav: NavItem[] = [
    { type: 'link', name: 'Dashboard', href: '/dashboard', icon: <FaHome className="text-2xl" />, exact: true },
    { type: 'link', name: 'Pedidos', href: '/orders', icon: <FaList className="text-2xl" /> },
    { type: 'link', name: 'Perfil', href: '/profile', icon: <FaUserCircle className="text-2xl" /> },
  ];

  const dynamicNav: Record<string, NavItem[]> = {
    admin: [
      { type: 'link', name: 'Empleados', href: '/employees', icon: <FaUsers className="text-2xl" /> },
      { type: 'link', name: 'Servicios', href: '/services', icon: <FaCog className="text-2xl" /> },
    ],
    billing: [
      { type: 'link', name: 'Facturación', href: '/billing', icon: <FaFileInvoiceDollar className="text-2xl" /> },
    ],
    dev: [
      { type: 'link', name: 'Configuración', href: '/settings', icon: <FaCog className="text-2xl" /> },
      { type: 'link', name: 'API Logs', href: '/api-logs', icon: <FaCode className="text-2xl" /> },
    ],
  };

  const combinedNav = [...fixedNav, ...(dynamicNav[user?.role || 'guest'] || [])];

  const profileOptions: NavItem[] = [
    { type: 'link', name: 'Perfil', href: '/profile', icon: <FaUserCircle className="text-lg" /> },
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

  const isActive = (href: string, exact = false) => {
    return exact ? pathname === href : pathname.startsWith(href);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
        isCompact ? 'w-20' : 'w-64'
      } bg-[#182336] backdrop-blur-md border-r border-gray-800/50`}
    >
      {/* Logo */}
      <div className={`p-4 flex items-center justify-center ${isCompact ? 'flex-wrap' : 'flex-col'}`}>
  <img
    src={logo}
    alt="Logo"
    className={`transition-all duration-300 ${
      isCompact ? 'w-8 h-8' : 'w-10 h-10'
    }`}
  />
   <img 
    src="/OwariLine.svg" 
    alt="Separador" 
    className={`transition-all duration-300 ${
      isCompact ? 'w-8 h-8 ml-1' : 'w-10 h-10 ml-2'
    } filter brightness-100 contrast-100`} // Añade estas clases
    style={{ opacity: 1 }} // Fuerza la opacidad a 1
  />
</div>

      {/* Navegación */}
      <nav className="flex-grow flex flex-col justify-center">
        {combinedNav.map((item) => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive(item.href, item.exact)
                      ? 'bg-gray-900 text-white shadow-md border-l-2 border-blue-500'
                      : 'text-gray-300 hover:bg-gray-900 hover:text-white'
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
          className="flex items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
        >
          <FaUserCircle className="text-2xl text-gray-400" />
          {!isCompact && (
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-gray-400">{user?.role || 'Invitado'}</p>
            </div>
          )}
        </div>

        {/* Menú de perfil */}
        {isProfileMenuOpen && (
          <div
            ref={profileRef}
            className="absolute bottom-20 left-20 bg-gray-900/90 backdrop-blur-md text-white rounded-lg shadow-xl w-48 z-10 border border-gray-800/50"
          >
            {profileOptions.map((option) => (
              <div
                key={option.name}
                onClick={() => {
                  if (option.type === 'button') option.onClick();
                  else setIsProfileMenuOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-900 cursor-pointer flex items-center transition-all duration-200"
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
          className="mt-4 w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-all duration-200"
        >
          {isCompact ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
