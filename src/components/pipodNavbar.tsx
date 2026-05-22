import React, { useState, useEffect, useRef } from 'react';
import { useCartStore } from '../hooks/useCartStore';
import { useHydrated } from '../hooks/useHydrated';
import './pipodNavbar.css';

interface ServiceItem {
  label: string;
  href: string;
  services: string[];
}

interface TiendaItem {
  label: string;
  href: string;
}

interface BlogItem {
  label: string;
  href: string;
}

const serviceMenuItems: ServiceItem[] = [
  { label: 'iPhone', href: '/servicio-tecnico-apple-bogota/iphone', services: ['Batería', 'Pantalla', 'Carga', 'Placa'] },
  { label: 'MacBook', href: '/servicio-tecnico-apple-bogota/macbook', services: ['Batería', 'Pantalla', 'Teclado'] },
  { label: 'iMac', href: '/servicio-tecnico-apple-bogota/imac', services: ['Mantenimiento', 'Disco'] },
  { label: 'Apple Watch', href: '/servicio-tecnico-apple-bogota/apple-watch', services: ['Pantalla', 'Carga'] },
  { label: 'Mantenimiento', href: '/servicio-tecnico-apple-bogota/mantenimiento', services: ['Limpieza', 'Optimización'] },
];

const tiendaMenuItems: TiendaItem[] = [
  { label: 'iPhone', href: '/tienda-pipod?filter=iphone' },
  { label: 'MacBook', href: '/tienda-pipod?filter=macbook' },
  { label: 'iPad', href: '/tienda-pipod?filter=ipad' },
  { label: 'Apple Watch', href: '/tienda-pipod?filter=apple-watch' },
  { label: 'Cargadores', href: '/tienda-pipod?filter=cargadores' },
  { label: 'MagSafe', href: '/tienda-pipod?filter=magafe' },
  { label: 'Fundas', href: '/tienda-pipod?filter=fundas' },
  { label: 'Audio', href: '/tienda-pipod?filter=audio' },
  { label: 'Accesorios', href: '/tienda-pipod?filter=accesorios' },
];

const blogMenuItems: BlogItem[] = [
  { label: 'Reparaciones', href: '/blog/reparaciones' },
  { label: 'Guías de Compra', href: '/blog/guias' },
  { label: 'Confianza', href: '/blog/confianza' },
];

const serviceIcons: Record<string, string> = {
  'iPhone': 'bi-phone',
  'MacBook': 'bi-laptop',
  'iMac': 'bi-display',
  'Apple Watch': 'bi-smartwatch',
  'Mantenimiento': 'bi-tools',
};

const tiendaIcons: Record<string, string> = {
  'iPhone': 'bi-phone',
  'MacBook': 'bi-laptop',
  'iPad': 'bi-tablet',
  'Apple Watch': 'bi-smartwatch',
  'Cargadores': 'bi-battery-charging',
  'MagSafe': 'bi-magnet',
  'Fundas': 'bi-phone-fill',
  'Audio': 'bi-headphones',
  'Accesorios': 'bi-box-seam',
};

const blogIcons: Record<string, string> = {
  'Reparaciones': 'bi-wrench',
  'Guías de Compra': 'bi-book',
  'Confianza': 'bi-shield-check',
};

const ServicioDropdown = () => (
  <div className="dropdown-menu dropdown-service">
    <div className="dropdown-grid service-grid">
      {serviceMenuItems.map((item) => (
        <a key={item.label} href={item.href} className="dropdown-item service-item">
          <div className="item-icon">
            <i className={`bi ${serviceIcons[item.label] || 'bi-gear'}`}></i>
          </div>
          <div className="item-content">
            <span className="item-label">{item.label}</span>
            <span className="item-services">{item.services.join(' · ')}</span>
          </div>
        </a>
      ))}
    </div>
  </div>
);

const TiendaDropdown = () => (
  <div className="dropdown-menu dropdown-tienda">
    <div className="dropdown-grid tienda-grid">
      {tiendaMenuItems.map((item) => (
        <a key={item.label} href={item.href} className="dropdown-item tienda-item">
          <div className="item-icon">
            <i className={`bi ${tiendaIcons[item.label] || 'bi-box'}`}></i>
          </div>
          <span className="item-label">{item.label}</span>
        </a>
      ))}
    </div>
  </div>
);

const BlogDropdown = () => (
  <div className="dropdown-menu dropdown-blog">
    <div className="dropdown-grid blog-grid">
      {blogMenuItems.map((item) => (
        <a key={item.label} href={item.href} className="dropdown-item blog-item">
          <div className="item-icon">
            <i className={`bi ${blogIcons[item.label] || 'bi-file-text'}`}></i>
          </div>
          <span className="item-label">{item.label}</span>
        </a>
      ))}
    </div>
  </div>
);

const MobileAccordion = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="mobile-accordion">
      <div className="accordion-item">
        <button 
          className={`accordion-header ${openSection === 'servicio' ? 'open' : ''}`}
          onClick={() => toggleSection('servicio')}
        >
          <span>Servicio Técnico</span>
          <i className="bi bi-chevron-right"></i>
        </button>
        {openSection === 'servicio' && (
          <div className="accordion-content">
            {serviceMenuItems.map((item) => (
              <a key={item.label} href={item.href} className="accordion-link">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="accordion-item">
        <button 
          className={`accordion-header ${openSection === 'tienda' ? 'open' : ''}`}
          onClick={() => toggleSection('tienda')}
        >
          <span>Tienda</span>
          <i className="bi bi-chevron-right"></i>
        </button>
        {openSection === 'tienda' && (
          <div className="accordion-content">
            {tiendaMenuItems.map((item) => (
              <a key={item.label} href={item.href} className="accordion-link">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="accordion-item">
        <button 
          className={`accordion-header ${openSection === 'blog' ? 'open' : ''}`}
          onClick={() => toggleSection('blog')}
        >
          <span>Blog</span>
          <i className="bi bi-chevron-right"></i>
        </button>
        {openSection === 'blog' && (
          <div className="accordion-content">
            {blogMenuItems.map((item) => (
              <a key={item.label} href={item.href} className="accordion-link">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PipodNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { itemCount, openCart } = useCartStore();
  const [prevItemCount, setPrevItemCount] = useState(itemCount);
  const isHydrated = useHydrated();
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  return (
    <>
      <nav className={`navbar-pipod ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="container nav-wrapper">
          
          <a href="/" className="logo" onClick={closeMobileMenu}>PIPOD</a>

          <ul className="nav-links">
            <li 
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnter('servicio')}
              onMouseLeave={handleMouseLeave}
            >
              <span className="nav-item">Servicio Técnico <i className="bi bi-chevron-down"></i></span>
              {activeDropdown === 'servicio' && <ServicioDropdown />}
            </li>
            <li><a href="/plan-retoma-apple" className="nav-item">Plan Retoma</a></li>
            <li 
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnter('tienda')}
              onMouseLeave={handleMouseLeave}
            >
              <span className="nav-item">Tienda <i className="bi bi-chevron-down"></i></span>
              {activeDropdown === 'tienda' && <TiendaDropdown />}
            </li>
            <li><a href="/tienda-pipod?filter=accesorios" className="nav-item">Accesorios</a></li>
            <li><a href="/contacto-pipod" className="nav-item">Contacto</a></li>
            <li 
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnter('blog')}
              onMouseLeave={handleMouseLeave}
            >
              <span className="nav-item">Blog <i className="bi bi-chevron-down"></i></span>
              {activeDropdown === 'blog' && <BlogDropdown />}
            </li>
          </ul>

          <div className="nav-actions">
            <button 
              className={`cart-icon-btn ${animateCart ? 'bounce' : ''}`}
              onClick={toggleCart}
              title="Ver carrito"
            >
              <i className="bi bi-bag"></i>
              {isHydrated && itemCount > 0 && (
                <span className={`cart-badge ${animateCart ? 'pop' : ''}`}>
                  {itemCount}
                </span>
              )}
            </button>
            <a href="https://wa.me/573124813094" target="_blank" rel="noopener noreferrer" className="btn-premium">Cotizar servicio</a>
          </div>

          <button 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <ul className="mobile-nav-links">
                <li><a href="/servicio-tecnico-apple-bogota" className="mobile-nav-item" onClick={closeMobileMenu}>Servicio Técnico</a></li>
                <li><a href="/plan-retoma-apple" className="mobile-nav-item" onClick={closeMobileMenu}>Plan Retoma</a></li>
                <li><a href="/tienda-pipod" className="mobile-nav-item" onClick={closeMobileMenu}>Tienda</a></li>
                <li><a href="/tienda-pipod?filter=accesorios" className="mobile-nav-item" onClick={closeMobileMenu}>Accesorios</a></li>
                <li><a href="/contacto-pipod" className="mobile-nav-item" onClick={closeMobileMenu}>Contacto</a></li>
                <li><a href="/pipod-blog" className="mobile-nav-item" onClick={closeMobileMenu}>Blog</a></li>
              </ul>
              
              <MobileAccordion />
              
              <button 
                className="mobile-cart-btn"
                onClick={() => {
                  toggleCart();
                  closeMobileMenu();
                }}
              >
                <i className="bi bi-bag"></i>
                {isHydrated && itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                Ver carrito
              </button>
              <a href="https://wa.me/573124813094" target="_blank" rel="noopener noreferrer" className="btn-premium mobile-cta" onClick={closeMobileMenu}>Cotizar servicio</a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default PipodNavbar;