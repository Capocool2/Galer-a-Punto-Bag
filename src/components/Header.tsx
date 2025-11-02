import React, { useState } from 'react';
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import { categories } from '../utils/categories';

interface HeaderProps {
  onLoginClick: () => void;
  isAdmin: boolean;
  onLogout: () => void;
  onAdminClick: () => void;
}

export function Header({ onLoginClick, isAdmin, onLogout, onAdminClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Altura del header sticky
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMenuOpen(false);
      setIsCategoriesOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <span className="text-xl text-gray-900">Galería Punto Bag</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Inicio
            </button>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                Categorías
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isCategoriesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => scrollToSection(`section-${category.id}`)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                      >
                        <Icon className="w-5 h-5" style={{ color: category.color }} />
                        <span className="text-gray-700">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contacto
            </button>
            {isAdmin ? (
              <>
                <button 
                  onClick={onAdminClick}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Panel Admin
                </button>
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button 
                onClick={onLoginClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Inicio
              </button>
              
              {/* Mobile Categories */}
              <div className="py-2">
                <div className="text-sm text-gray-500 mb-2 px-2">Categorías</div>
                <div className="flex flex-col gap-1 pl-4">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => scrollToSection(`section-${category.id}`)}
                        className="text-left py-2 flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <Icon className="w-4 h-4" style={{ color: category.color }} />
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Contacto
              </button>
              {isAdmin ? (
                <>
                  <button 
                    onClick={() => {
                      onAdminClick();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
                  >
                    Panel Admin
                  </button>
                  <button 
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-left"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
