import { Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo - cropped top/bottom to show text better */}
          <div className="flex items-center h-12 md:h-14 overflow-hidden">
            <img
              src="/images/Logo-Futurenergy.png"
              alt="FuturEnergy"
              className="h-24 md:h-28 w-auto object-cover object-center"
            />
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#como-funciona" className="text-[#1B263B] hover:text-[#E85D04] font-medium transition-all duration-300 hover:scale-105">
              ¿Cómo Funciona?
            </a>
            <a href="#requisitos" className="text-[#1B263B] hover:text-[#E85D04] font-medium transition-all duration-300 hover:scale-105">
              Requisitos
            </a>
            <a href="#solicitar" className="text-[#1B263B] hover:text-[#E85D04] font-medium transition-all duration-300 hover:scale-105">
              Solicitar
            </a>
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href="#solicitar"
              className="btn-primary flex items-center gap-2 text-sm md:text-base py-2 px-4 md:py-3 md:px-8"
            >
              <Sun className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Solicitar</span>
            </a>
            
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-[#1B263B]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a 
                href="#como-funciona" 
                className="text-[#1B263B] hover:text-[#E85D04] font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ¿Cómo Funciona?
              </a>
              <a 
                href="#requisitos" 
                className="text-[#1B263B] hover:text-[#E85D04] font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Requisitos
              </a>
              <a 
                href="#solicitar" 
                className="text-[#1B263B] hover:text-[#E85D04] font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solicitar
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
