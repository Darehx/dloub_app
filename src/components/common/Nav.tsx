// src/components/Nav.tsx
import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Tipos para las props
interface NavItem {
  name: string;
  href: string;
  current?: boolean;
}

interface NavProps {
  logo?: string; // URL del logo
  navigation?: NavItem[]; // Enlaces de navegación
  profileOptions?: { name: string; href?: string; onClick?: () => void }[]; // Opciones del menú de perfil
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Nav: React.FC<NavProps> = ({ logo, navigation = [], profileOptions = [] }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Botones predefinidos
  const defaultNavigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Empleados', href: '/employees', current: false },
    { name: 'Órdenes', href: '/orders', current: false },
    { name: 'Servicios', href: '/services', current: false },
  ];

  // Opciones predefinidas del menú de perfil
  const defaultProfileOptions = [
    { name: 'Perfil', href: '/profile' },
    { name: 'Cerrar sesión', onClick: () => { logout(); navigate('/login'); } },
  ];

  // Combina los enlaces predefinidos con los pasados por props
  const navItems = navigation.length > 0 ? navigation : defaultNavigation;
  const profileItems = profileOptions.length > 0 ? profileOptions : defaultProfileOptions;

  if (!isAuthenticated) {
    return null; // No mostrar el Nav si el usuario no está autenticado
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Botón de menú móvil */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Abrir menú principal</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Logo de la empresa"
                src={logo || "https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Menú de perfil */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Abrir menú de usuario</span>
                  <img
                    alt="Foto de perfil"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
              >
                {profileItems.map((option) => (
                  <MenuItem key={option.name}>
                    {option.href ? (
                      <Link
                        to={option.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        {option.name}
                      </Link>
                    ) : (
                      <button
                        onClick={option.onClick}
                        className="block w-full px-4 py-2 text-sm text-gray-700 text-left data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        {option.name}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navItems.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Nav;