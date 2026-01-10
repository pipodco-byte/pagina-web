const PipodNavbar = () => {
  const linkStyle = {
    fontSize: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const logoStyle = {
    fontSize: '24px'
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#0066cc';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'inherit';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <nav className="top-0 flex-wrap px-0 py-4 d-none d-lg-block navbar shadow navbar-expand-lg">
      <div className="container">
        <div className="d-flex justify-content-center w-100">
          <nav aria-label="breadcrumb">
            <div className="d-flex align-items-center justify-content-center gap-5">
              <a href="/" className="nav-link p-0">
                <span className="text-dark font-weight-bold" style={logoStyle}>Pipod</span>
              </a>
              <a href="/productos" className="nav-link p-0" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                Todo
              </a>
              <a href="/productos?categoria=accesorios" className="nav-link p-0" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                Accesorios
              </a>
              <a href="/productos?categoria=plan-retoma" className="nav-link p-0" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                Plan retoma
              </a>
              <a href="/servicio-tecnico" className="nav-link p-0" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                Servicio técnico
              </a>
              <a href="/contacto" className="nav-link p-0" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                Contáctanos
              </a>
              <a href="/blog" className="nav-link p-0" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                Blog
              </a>
            </div>
          </nav>
        </div>
      </div>
      <hr className="my-0 horizontal w-100 dark" />
    </nav>
  );
};

export default PipodNavbar;
