
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-5 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Investor BTB Dashboard
        </h1>
        <p className="mt-2 text-md text-gray-600 dark:text-gray-300">
          Track Your Investment Performance Instantly
        </p>
      </div>
    </header>
  );
};

export default Header;
