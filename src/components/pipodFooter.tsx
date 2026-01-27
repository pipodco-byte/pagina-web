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
        <div className="row mb-4 gy-5">
          
          {/* Columna 1: PIPOD */}
          <div className="col-lg-3 col-md-12">
            <h3 className="footer-brand">PIPOD</h3>
            <p className="footer-brand-text">
             Más de 15 años comprometidos con servicio técnico de Apple en Colombia. 
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
              <li><a href="https://wa.me/573124813094" target="_blank" className="highlight-service"><strong>Diagnóstico Gratuito</strong></a></li>
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
              <li><a href="/terminos-condiciones-pipod">Términos y Condiciones</a></li>
              <li><a href="#">SIC (Portal Consumidor)</a></li>
            </ul>
          </div>

          {/* Columna 5: VISÍTANOS */}
          <div className="col-lg-3 col-md-12">
            <h6 className="column-title">VISÍTANOS</h6>
            <div className="visit-box-premium">
              <div className="visit-entry">
                <i className="bi bi-geo-alt"></i>
                <a href="https://www.google.com/maps/search/Cra.+13a+%2379-52,+Chapinero,+Bogotá" target="_blank" rel="noopener noreferrer" style={{color: '#F2F2F2', textDecoration: 'none'}}>Cra. 13a #79-52, Chapinero, Bogotá</a>
              </div>
              <div className="visit-entry">
                <i className="bi bi-clock"></i>
                <span>{open ? <span style={{color: '#FFFFFF', fontWeight: 700}}>Abierto ahora</span> : <span style={{fontWeight: 700}}>Cerrado</span>} • Lun - Sáb: 10:00 AM - 7:00 PM</span>
              </div>
              <div className="visit-entry highlight-wa">
                <i className="bi bi-whatsapp"></i>
                <span><span style={{color: '#25D366', fontWeight: 700}}>WhatsApp:</span> <span style={{color: '#FFFFFF', fontWeight: 700}}>+57 312 481 3094</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Ecosistema Apple Bar - COMPACTADA */}
        <div className="ecosystem-section">
          <p className="ecosystem-text">
            <span className="devices">iPhone • iPad • Mac • MacBook • iMac • Apple Watch</span>
            <span className="divider">|</span>
            <span className="skills">Especialistas en pantallas, baterías y microsoldadura</span>
          </p>
        </div>
      </div>

      {/* Franja Final Copyright - SIN ESPACIO SOBRANTE */}
      <div className="bottom-credit-bar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-12 text-center text-lg-start">
              <p className="copyright-mandatory">
                © 2026 <strong>PIPOD</strong>. Todos los derechos reservados. <span className="text-divider">|</span> <span className="exp-highlight">Más de 15 años de experiencia en Colombia.</span>
              </p>
            </div>
            <div className="col-lg-3 col-md-12 text-center text-lg-end mt-2 mt-lg-0">
              <span className="premium-tag">PREMIUM SERVICE</span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-pipod {
          background-color: #1F1F1F;
          color: #FFFFFF;
          padding: 80px 0 0 0;
          font-family: 'Inter', sans-serif;
        }

        .footer-brand {
          font-weight: 800;
          font-size: 32px;
          letter-spacing: -1.5px;
          color: #FFFFFF;
          margin-bottom: 20px;
        }

        .footer-brand-text {
          color: #B0B0B0;
          font-size: 14px;
          line-height: 1.6;
          max-width: 280px;
        }

        .social-links-grid { display: flex; gap: 18px; margin-top: 25px; }
        .social-icon-item { color: #FFFFFF; font-size: 24px; transition: 0.3s; }
        .social-icon-item:hover { transform: translateY(-3px); opacity: 0.8; }

        .column-title {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #888888;
          margin-bottom: 25px;
        }

        .footer-nav-list { list-style: none; padding: 0; }
        .footer-nav-list li { margin-bottom: 12px; }
        .footer-nav-list a {
          color: #FFFFFF;
          text-decoration: none;
          font-size: 15px;
          transition: 0.3s;
        }
        .footer-nav-list a:hover { opacity: 0.7; }

        .visit-box-premium { display: flex; flex-direction: column; gap: 18px; }
        .visit-entry { display: flex; align-items: flex-start; gap: 10px; color: #FFFFFF; font-size: 15px; }
        
        /* Ecosistema Bar */
        .ecosystem-section {
          margin-top: 60px;
          padding: 30px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        .ecosystem-text { font-size: 14px; margin-bottom: 0; }
        .devices { font-weight: 800; letter-spacing: 1.5px; }
        .divider { color: #3A506B; margin: 0 15px; font-weight: 900; }

        /* Franja Inferior - AJUSTE FINAL */
        .bottom-credit-bar {
          background-color: #1F1f1f;
          padding: 20px 0; /* Padding reducido para eliminar el vacío */
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .copyright-mandatory { 
          font-size: 13px; 
          color: #FFFFFF; 
          margin-bottom: 0;
        }
        .premium-tag {
          font-size: 11px;
          letter-spacing: 5px;
          color: #F2f2f2;
          font-weight: 800;
          line-height: 1; /* Elimina espacio debajo de las letras */
        }

        @media (max-width: 991px) {
          .footer-pipod { padding-top: 60px; }
          .ecosystem-section { margin-top: 40px; padding: 20px 10px; }
          .bottom-credit-bar { padding: 25px 0; }
        }
      `}} />
    </footer>
  );
}