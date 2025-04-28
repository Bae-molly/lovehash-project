import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import WalletButton from '../common/WalletButton';

const Header: React.FC = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigateTo('/')}
        >
          <Heart className="w-8 h-8 text-pink-500 mr-2" />
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Lovehash
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {auth.isAuthenticated && (
            <>
              <button
                onClick={() => navigateTo('/explore')}
                className={`font-medium transition-colors ${
                  isActive('/explore') 
                    ? 'text-pink-600' 
                    : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                Explore
              </button>
              <button
                onClick={() => navigateTo('/matches')}
                className={`font-medium transition-colors ${
                  isActive('/matches') 
                    ? 'text-pink-600' 
                    : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                Matches
              </button>
              <button
                onClick={() => navigateTo('/messages')}
                className={`font-medium transition-colors ${
                  isActive('/messages') 
                    ? 'text-pink-600' 
                    : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                Messages
              </button>
              <button
                onClick={() => navigateTo('/profile')}
                className={`font-medium transition-colors ${
                  isActive('/profile') 
                    ? 'text-pink-600' 
                    : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                Profile
              </button>
            </>
          )}
        </nav>

        {/* Wallet Button */}
        <div className="hidden md:block">
          <WalletButton />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-pink-600 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {auth.isAuthenticated ? (
              <>
                <button
                  onClick={() => navigateTo('/explore')}
                  className={`py-2 font-medium ${
                    isActive('/explore') ? 'text-pink-600' : 'text-gray-700'
                  }`}
                >
                  Explore
                </button>
                <button
                  onClick={() => navigateTo('/matches')}
                  className={`py-2 font-medium ${
                    isActive('/matches') ? 'text-pink-600' : 'text-gray-700'
                  }`}
                >
                  Matches
                </button>
                <button
                  onClick={() => navigateTo('/messages')}
                  className={`py-2 font-medium ${
                    isActive('/messages') ? 'text-pink-600' : 'text-gray-700'
                  }`}
                >
                  Messages
                </button>
                <button
                  onClick={() => navigateTo('/profile')}
                  className={`py-2 font-medium ${
                    isActive('/profile') ? 'text-pink-600' : 'text-gray-700'
                  }`}
                >
                  Profile
                </button>
              </>
            ) : (
              <div className="py-2">
                <WalletButton />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;