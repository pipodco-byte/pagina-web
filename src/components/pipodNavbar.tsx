import React, { useState, useEffect } from 'react';
import { useCartStore } from '../hooks/useCartStore';

const PipodNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const { itemCount, openCart } = useCartStore();
  const [prevItemCount, setPrevItemCount] = useState(itemCount);

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  useEffect(() => {
    if (itemCount > prevItemCount) {
      setAnimateCart(true);
      setTimeout(() => setAnimateCart(false), 600);
    }
    setPrevItemCount(itemCount);
  }, [itemCount, prevItemCount]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleCart = () => {
    openCart();
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-[18px] bg-white/90 backdrop-blur-lg shadow-sm border-b border-black/5' : 'py-[35px] bg-white border-b border-transparent'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between relative">
          
          {/* Logo Pipod */}
          <a href="/" className="font-black text-[45px] tracking-tight text-black no-underline z-[1001] transition-transform hover:scale-105" onClick={closeMobileMenu}>PIPOD</a>

          {/* Menú Centrado - Desktop */}
          <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-8 whitespace-nowrap m-0 p-0 list-none">
            <li><a href="/servicio-tecnico-apple" className="relative font-medium text-[15px] text-gray-600 no-underline py-2 transition-colors hover:text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-tech-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">Servicio Técnico</a></li>
            <li><a href="/plan-retoma-apple" className="relative font-medium text-[15px] text-gray-600 no-underline py-2 transition-colors hover:text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-tech-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">Plan Retoma</a></li>
            <li><a href="/tienda-pipod" className="relative font-medium text-[15px] text-gray-600 no-underline py-2 transition-colors hover:text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-tech-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">Tienda</a></li>
            <li><a href="/tienda-pipod?filter=accesorios" className="relative font-medium text-[15px] text-gray-600 no-underline py-2 transition-colors hover:text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-tech-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">Accesorios</a></li>
            <li><a href="/contacto-pipod" className="relative font-medium text-[15px] text-gray-600 no-underline py-2 transition-colors hover:text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-tech-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">Contacto</a></li>
            <li><a href="/pipod-blog" className="relative font-medium text-[15px] text-gray-600 no-underline py-2 transition-colors hover:text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-tech-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">Blog</a></li>
          </ul>

          {/* Botón CTA + Carrito - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              className={`relative text-[24px] p-2 bg-transparent border-none cursor-pointer text-black transition-all hover:text-tech-blue ${animateCart ? 'animate-bounce' : ''}`}
              onClick={toggleCart}
              title="Ver carrito"
            >
              <i className="bi bi-bag"></i>
              {itemCount > 0 && (
                <span className={`absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shadow-md ${animateCart ? 'animate-pop' : ''}`}>
                  {itemCount}
                </span>
              )}
            </button>
            <a href="https://wa.me/573124813094" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-7 py-3 rounded-full font-semibold text-[15px] no-underline transition-all hover:bg-tech-blue hover:shadow-lg hover:-translate-y-0.5">Cotizar servicio</a>
          </div>

          {/* Hamburger Menu - Mobile */}
          <button 
            className={`lg:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer z-[1001] ${isMobileMenuOpen ? 'fixed right-4' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[2.5px] bg-black rounded transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`w-6 h-[2.5px] bg-black rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-[2.5px] bg-black rounded transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </button>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-5 flex flex-col gap-4 lg:hidden animate-slideDown">
              <ul className="flex flex-col gap-4 m-0 p-0 list-none">
                <li><a href="/servicio-tecnico-apple" className="font-medium text-[16px] text-gray-600 no-underline block py-2 transition-colors hover:text-tech-blue" onClick={closeMobileMenu}>Servicio Técnico</a></li>
                <li><a href="/plan-retoma-apple" className="font-medium text-[16px] text-gray-600 no-underline block py-2 transition-colors hover:text-tech-blue" onClick={closeMobileMenu}>Plan Retoma</a></li>
                <li><a href="/tienda-pipod" className="font-medium text-[16px] text-gray-600 no-underline block py-2 transition-colors hover:text-tech-blue" onClick={closeMobileMenu}>Tienda</a></li>
                <li><a href="/tienda-pipod?filter=accesorios" className="font-medium text-[16px] text-gray-600 no-underline block py-2 transition-colors hover:text-tech-blue" onClick={closeMobileMenu}>Accesorios</a></li>
                <li><a href="/contacto-pipod" className="font-medium text-[16px] text-gray-600 no-underline block py-2 transition-colors hover:text-tech-blue" onClick={closeMobileMenu}>Contacto</a></li>
                <li><a href="/pipod-blog" className="font-medium text-[16px] text-gray-600 no-underline block py-2 transition-colors hover:text-tech-blue" onClick={closeMobileMenu}>Blog</a></li>
              </ul>
              <button 
                className="relative w-full p-3 bg-gray-100 border border-gray-200 rounded-lg font-semibold text-[15px] cursor-pointer transition-all hover:bg-gray-200 flex items-center justify-center gap-2"
                onClick={() => {
                  toggleCart();
                  closeMobileMenu();
                }}
              >
                <i className="bi bi-bag"></i>
                {itemCount > 0 && <span className="absolute top-[-8px] right-[8px] bg-red-600 text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center">{itemCount}</span>}
                Ver carrito
              </button>
              <a href="https://wa.me/573124813094" target="_blank" rel="noopener noreferrer" className="block bg-black text-white px-6 py-3 rounded-full font-semibold text-[14px] no-underline text-center transition-all hover:bg-tech-blue" onClick={closeMobileMenu}>Cotizar servicio</a>
            </div>
          )}
        </div>
      </nav>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .animate-pop {
          animation: pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce {
          animation: bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  );
};

export default PipodNavbar;