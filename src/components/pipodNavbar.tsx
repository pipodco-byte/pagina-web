import React, { useState, useEffect } from 'react';
import './pipodNavbar.css';

const PipodNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  useEffect(() => {
    // Cerrar menú al montar el componente
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar-pipod ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-wrapper">
        
        {/* Logo Pipod */}
        <a href="/" className="logo" onClick={closeMobileMenu}>PIPOD</a>

        {/* Menú Centrado - Desktop */}
        <ul className="nav-links">
          <li><a href="/servicio-tecnico-apple" className="nav-item">Servicio Técnico</a></li>
          <li><a href="/plan-retoma-apple" className="nav-item">Plan Retoma</a></li>
          <li><a href="/tienda-pipod" className="nav-item">Tienda</a></li>
          <li><a href="/tienda-pipod?filter=accesorios" className="nav-item">Accesorios</a></li>
          <li><a href="/contacto-pipod" className="nav-item">Contacto</a></li>
          <li><a href="/pipod-blog" className="nav-item">Blog</a></li>
        </ul>

        {/* Botón CTA - Desktop */}
        <div className="nav-actions">
          <a href="https://wa.me/573124813094" target="_blank" rel="noopener noreferrer" className="btn-premium">Cotizar servicio</a>
        </div>

        {/* Hamburger Menu - Mobile */}
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-nav-links">
              <li><a href="/servicio-tecnico-apple" className="mobile-nav-item" onClick={closeMobileMenu}>Servicio Técnico</a></li>
              <li><a href="/plan-retoma-apple" className="mobile-nav-item" onClick={closeMobileMenu}>Plan Retoma</a></li>
              <li><a href="/tienda-pipod" className="mobile-nav-item" onClick={closeMobileMenu}>Tienda</a></li>
              <li><a href="/tienda-pipod?filter=accesorios" className="mobile-nav-item" onClick={closeMobileMenu}>Accesorios</a></li>
              <li><a href="/contacto-pipod" className="mobile-nav-item" onClick={closeMobileMenu}>Contacto</a></li>
              <li><a href="/pipod-blog" className="mobile-nav-item" onClick={closeMobileMenu}>Blog</a></li>
            </ul>
            <a href="https://wa.me/573124813094" target="_blank" rel="noopener noreferrer" className="btn-premium mobile-cta" onClick={closeMobileMenu}>Cotizar servicio</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PipodNavbar;
