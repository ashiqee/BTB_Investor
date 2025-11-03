
import React from 'react';
import type { User } from '@/types';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';


interface HeaderProps {
    user: User | null;
    onLogout: () => void;
    onNavigate: (page: 'dashboard' | 'profile') => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-center flex-grow">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            BTB Investor ROI Dashboard
            </h1>
            {user && (
                 <p className="text-sm text-gray-500 dark:text-gray-400">
                    Welcome, <span className="font-semibold">{user.name}</span>
                </p>
            )}
        </div>
        
        {user && (
          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
                onClick={() => onNavigate('profile')}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                aria-label="View Profile"
            >
                <UserIcon className="h-5 w-5" />
                <span className="hidden md:inline text-sm font-medium">Profile</span>
            </button>
            <button 
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                aria-label="Logout"
            >
                <LogoutIcon className="h-5 w-5" />
                 <span className="hidden md:inline text-sm font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
