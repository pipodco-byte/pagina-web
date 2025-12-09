const PipodNavbar = () => {
  return (
    <nav className="top-0 flex-wrap px-0 py-0 d-none d-lg-block navbar shadow navbar-expand-lg">
      <div className="container py-2">
        <div className="d-flex justify-content-center w-100">
          <nav aria-label="breadcrumb">
            <div className="d-flex align-items-center justify-content-center gap-5">
              <span className="text-dark text-lg font-weight-bold">Pipod</span>
              <a href="/productos" className="nav-link p-0">
                Todo
              </a>
              <a href="/productos?categoria=accesorios" className="nav-link p-0">
                Accesorios
              </a>
              <a href="/productos?categoria=plan-retoma" className="nav-link p-0">
                Plan retoma
              </a>
              <a href="/servicio-tecnico" className="nav-link p-0">
                Servicio técnico
              </a>
              <a href="/contacto" className="nav-link p-0">
                Contáctanos
              </a>
              <a href="/blog" className="nav-link p-0">
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
