
import React, { useState } from 'react';
import { SearchIcon, LocationPinIcon } from './Icons';
import { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  onSearch: (term: string) => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogin, onSignup, onLogout, onSearch, onLogoClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };
  
  return (
    <header className="bg-[#1a2333] text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <button onClick={onLogoClick} className="flex items-center focus:outline-none">
            <span className="bg-white text-[#1a2333] font-bold text-xl px-2 py-1 rounded">HS</span>
            <span className="text-xl font-semibold ml-2">HomeServe</span>
          </button>
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-gray-700/50 border border-gray-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-64"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden lg:flex items-center space-x-2">
            <LocationPinIcon className="h-5 w-5 text-gray-400" />
            <span>Mumbai, Maharashtra</span>
            <a href="#" className="text-sm text-gray-300 hover:text-white">Change</a>
          </div>
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <a href="#" className="hover:text-yellow-400">Services</a>
            <a href="#" className="hover:text-yellow-400">Professionals</a>
            <a href="#" className="hover:text-yellow-400">Enterprise</a>
            <a href="#" className="hover:text-yellow-400">Help</a>
          </nav>
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <>
                <span className="text-sm font-medium">Hi, {currentUser.name}</span>
                <button onClick={onLogout} className="text-sm font-medium hover:text-yellow-400">Log Out</button>
              </>
            ) : (
              <>
                <button onClick={onLogin} className="text-sm font-medium hover:text-yellow-400">Log In</button>
                <button onClick={onSignup} className="bg-white text-gray-900 text-sm font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
