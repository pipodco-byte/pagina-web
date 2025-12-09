export default function Footer() {
  const footerLinks = {
    'Soporte': [
      { name: 'Contáctanos', href: '/contacto' },
      { name: 'Preguntas Frecuentes', href: '#' },
      { name: 'Política de Devoluciones', href: '#' },
      { name: 'Términos y Condiciones', href: '#' },
      { name: 'Política de Privacidad', href: '#' },
    ],
    'Tienda': [
      { name: 'Plan Retoma', href: '/productos?categoria=plan-retoma' },
      { name: 'Nuevos', href: '/productos' },
      { name: 'Accesorios', href: '/productos?categoria=accesorios' },
      { name: 'Blog', href: '#' },
    ],
    'Servicio Técnico': [
      { name: 'iPhones', href: '/productos?categoria=iphone' },
      { name: 'iPads', href: '#' },
      { name: 'iMacs', href: '#' },
      { name: 'MacBooks', href: '/productos?categoria=macbook' },
      { name: 'Apple Watch', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', icon: '📱', href: 'https://instagram.com' },
    { name: 'Facebook', icon: '👍', href: 'https://facebook.com' },
    { name: 'WhatsApp', icon: '💬', href: 'https://wa.me/573124813094' },
  ];

  return (
    <footer className="bg-light border-top py-5">
      <div className="container">
        {/* Logo y descripción */}
        <div className="mb-5">
          <h3 className="font-weight-bold text-dark mb-3">Pipod</h3>
          <p className="text-muted">
            Especialistas en productos Apple. Servicio técnico certificado y Plan Retoma para renovar tu equipo.
          </p>
        </div>

        {/* Grid de links */}
        <div className="row mb-5">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-md-4 mb-4">
              <h6 className="font-weight-bold text-dark mb-3">{title}</h6>
              <ul className="list-unstyled">
                {links.map(link => (
                  <li key={link.name} className="mb-2">
                    <a href={link.href} className="text-muted text-decoration-none">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Redes sociales */}
        <div className="border-top py-4 mb-4">
          <div className="d-flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted text-decoration-none"
                title={social.name}
              >
                <span className="fs-5">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top pt-4 text-center text-muted text-sm">
          <p className="mb-0">&copy; {new Date().getFullYear()} Pipod. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
