import React, { useState, useEffect } from 'react';

const isOpen = () => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const min = now.getMinutes();
  const time = hour * 60 + min;
  
  if (day === 0 || day === 6) return false;
  return time >= 10 * 60 && time < 19 * 60;
};

export default function Footer() {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    setOpen(isOpen());
  }, []);
  return (
    <footer className="footer-pipod">
      {/* Iconos de Bootstrap */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      
      <div className="container">
        <div className="row mb-5 gy-5">
          
          {/* Columna 1: PIPOD */}
          <div className="col-lg-3 col-md-12">
            <h3 className="footer-brand">PIPOD</h3>
            <p className="footer-brand-text">
              Más de 10 años elevando el estándar de servicio Apple en Colombia. Expertos en soluciones de alta complejidad.
            </p>
            <div className="social-links-grid">
              <a href="https://wa.me/573124813094" target="_blank" className="social-icon-item"><i className="bi bi-whatsapp"></i></a>
              <a href="https://www.instagram.com/pipod.co" target="_blank" className="social-icon-item"><i className="bi bi-instagram"></i></a>
              <a href="https://www.tiktok.com/@pipodstore" target="_blank" className="social-icon-item"><i className="bi bi-tiktok"></i></a>
              <a href="https://www.facebook.com/pipod.co" target="_blank" className="social-icon-item"><i className="bi bi-facebook"></i></a>
            </div>
          </div>

          {/* Columna 2: PRODUCTOS */}
          <div className="col-lg-2 col-md-4 col-6">
            <h6 className="column-title">PRODUCTOS</h6>
            <ul className="footer-nav-list">
              <li><a href="#">Nuevos Equipos</a></li>
              <li><a href="#">Seminuevos Certificados</a></li>
              <li><a href="#">Accesorios Originales</a></li>
              <li><a href="#">Blog de Tecnología</a></li>
            </ul>
          </div>

          {/* Columna 3: SERVICIOS */}
          <div className="col-lg-2 col-md-4 col-6">
            <h6 className="column-title">SERVICIOS</h6>
            <ul className="footer-nav-list">
              <li><a href="#">Servicio Técnico</a></li>
              <li><a href="#" className="highlight-service"><strong>Diagnóstico Gratuito</strong></a></li>
              <li><a href="#">Plan Retoma PIPOD</a></li>
              <li><a href="#">Garantía Real</a></li>
            </ul>
          </div>

          {/* Columna 4: CENTRO DE AYUDA */}
          <div className="col-lg-2 col-md-4 col-12">
            <h6 className="column-title">CENTRO DE AYUDA</h6>
            <ul className="footer-nav-list">
              <li><a href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4" target="_blank" rel="noopener noreferrer">Déjanos una reseña</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Contáctanos</a></li>
              <li><a href="#">Devoluciones</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">SIC (Portal Consumidor)</a></li>
            </ul>
          </div>

          {/* Columna 5: VISÍTANOS (Con Iconos y Jerarquía) */}
          <div className="col-lg-3 col-md-12">
            <h6 className="column-title">VISÍTANOS</h6>
            <div className="visit-box-premium">
              <div className="visit-entry">
                <i className="bi bi-geo-alt"></i>
                <a href="https://www.google.com/maps/search/Cra.+13a+%2379-52,+Chapinero,+Bogotá" target="_blank" rel="noopener noreferrer" style={{color: '#F2F2F2', textDecoration: 'none', cursor: 'pointer'}}>Cra. 13a #79-52, Chapinero, Bogotá</a>
              </div>
              <div className="visit-entry">
                <i className="bi bi-clock"></i>
                <span>{open ? <span style={{color: '#F2F2F2'}}>Abierto ahora</span> : 'Cerrado'} • Lun - Sáb: 10:00 AM - 7:00 PM</span>
              </div>
              <div className="visit-entry highlight-wa">
                <i className="bi bi-whatsapp"></i>
                <a href="https://wa.me/573124813094" target="_blank" rel="noreferrer" style={{color: '#25D366', textDecoration: 'none', fontWeight: 700}}>WhatsApp: 312 481 3094</a>
              </div>
            </div>
          </div>
        </div>

        {/* Ecosistema Apple Bar */}
        <div className="ecosystem-section">
          <p className="ecosystem-text">
            <span className="devices">iPhone • iPad • Mac • MacBook • iMac • Apple Watch</span>
            <span className="divider">|</span>
            <span className="skills">Especialistas en pantallas, baterías y microsoldadura</span>
          </p>
        </div>
      </div>

      {/* Franja Final Copyright (REGLA OBLIGATORIA RESALTADA) */}
      <div className="bottom-credit-bar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-12 text-center text-lg-start">
              <p className="copyright-mandatory">
                © 2026 <strong>PIPOD</strong>. Todos los derechos reservados. <span className="text-divider">|</span> <span className="exp-highlight">Más de 10 años de experiencia en Colombia.</span>
              </p>
            </div>
            <div className="col-lg-3 col-md-12 text-center text-lg-end mt-3 mt-lg-0">
              <span className="premium-tag">PREMIUM SERVICE</span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-pipod {
          background-color: #000000;
          color: #F2F2F2;
          padding: 100px 0 0 0;
          font-family: 'Inter', sans-serif;
        }

        .footer-brand {
          font-weight: 800;
          font-size: 32px;
          letter-spacing: -1.5px;
          color: #FFFFFF;
          margin-bottom: 25px;
        }

        .footer-brand-text {
          color: #6E6E6E;
          font-size: 15px;
          line-height: 1.6;
          max-width: 280px;
        }

        .social-links-grid { display: flex; gap: 20px; margin-top: 30px; }
        .social-icon-item { color: #E0E0E0; font-size: 30px; transition: 0.3s; }
        .social-icon-item:hover { color: #FFFFFF; transform: translateY(-5px); }

        .column-title {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2.5px;
          color: #FFFFFF;
          margin-bottom: 35px;
        }

        .footer-nav-list { list-style: none; padding: 0; }
        .footer-nav-list li { margin-bottom: 15px; }
        .footer-nav-list a {
          color: #6E6E6E;
          text-decoration: none;
          font-size: 16px;
          transition: 0.3s;
        }
        .footer-nav-list a:hover { color: #FFFFFF; }

        .highlight-service {
          color: #FFFFFF !important;
          font-weight: 700 !important;
        }
        .highlight-service:hover { color: #E0E0E0 !important; }

        /* Estilo Visítanos con Iconos */
        .visit-box-premium { display: flex; flex-direction: column; gap: 22px; }
        .visit-entry { display: flex; align-items: flex-start; gap: 12px; color: #6E6E6E; font-size: 16px; line-height: 1.4; }
        .visit-entry i { color: #F2F2F2; font-size: 18px; }
        .highlight-wa { color: #FFFFFF; font-weight: 700; }
        .highlight-wa i { color: #25D366; }

        /* Ecosistema Bar */
        .ecosystem-section {
          margin-top: 80px;
          padding: 50px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        .ecosystem-text { font-size: 15px; letter-spacing: 1px; }
        .devices { color: #FFFFFF; font-weight: 300; letter-spacing: 2.5px; }
        .divider { color: #3A506B; margin: 0 20px; font-weight: 800; }
        .skills { color: #6E6E6E; font-weight: 500; }

        /* Franja Inferior: RESALTADO MÁXIMO */
        .bottom-credit-bar {
          background-color: #1B1B1B;
          padding: 35px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .copyright-mandatory { 
          font-size: 14px; 
          color: #999999; 
          margin-bottom: 0;
          letter-spacing: 0.5px;
        }
        .copyright-mandatory strong { color: #E0E0E0; }
        .text-divider { color: #3A506B; margin: 0 10px; font-weight: 900; }
        .exp-highlight { 
          color: #FFFFFF; 
          font-weight: 600;
        }

        .premium-tag {
          font-size: 12px;
          letter-spacing: 7px;
          color: #FFFFFF;
          font-weight: 800;
        }

        @media (max-width: 991px) {
          .copyright-mandatory { font-size: 12px; }
          .text-divider { display: none; }
          .exp-highlight { display: block; margin-top: 8px; }
        }
      `}} />
    </footer>
  );
}