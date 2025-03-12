import React from 'react';
import { Link } from 'react-router-dom';

interface ProfileMenuProps {
  options: { name: string; href?: string; onClick?: () => void }[];
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ options }) => {
  return (
    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
      {options.map((option) => (
        <div key={option.name} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          {option.href ? (
            <Link to={option.href} className="block text-sm text-gray-700">
              {option.name}
            </Link>
          ) : (
            <button onClick={option.onClick} className="block w-full text-left text-sm text-gray-700">
              {option.name}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileMenu;