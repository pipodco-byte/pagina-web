import React, { useState, useEffect } from 'react';
import './pipodNavbar.css';

const PipodNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  return (
    <nav className={`navbar-pipod ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-wrapper">
        
        {/* Logo Pipod - 26px Bold */}
        <a href="/" className="logo">PIPOD</a>

        {/* Menú Centrado - Orden: Servicio, Retoma, Tienda, Accesorios, Contacto, Blog */}
        <ul className="nav-links">
          <li><a href="/servicio-tecnico" className="nav-item">Servicio Técnico</a></li>
          <li><a href="/retoma" className="nav-item">Plan Retoma</a></li>
          <li><a href="/tienda" className="nav-item">Tienda</a></li>
          <li><a href="/accesorios" className="nav-item">Accesorios</a></li>
          <li><a href="/contacto" className="nav-item">Contacto</a></li>
          <li><a href="/blog" className="nav-item">Blog</a></li>
        </ul>

        {/* Botón CTA */}
        <div className="nav-actions">
          <a href="/cotizar" className="btn-premium">Cotizar servicio</a>
        </div>
      </div>
    </nav>
  );
};

export default PipodNavbar;