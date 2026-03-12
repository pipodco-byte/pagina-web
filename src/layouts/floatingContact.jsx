import React, { useState, useEffect } from 'react';

const FloatingContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Lógica de animación de "timbrado" cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isExpanded) {
        setShouldAnimate(true);
        setTimeout(() => setShouldAnimate(false), 1500);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isExpanded]);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="pipod-floating-container">
      {/* Iconos de Bootstrap */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />

      {/* MENÚ EXPANDIDO */}
      <div className={`expanded-menu ${isExpanded ? 'show' : ''}`}>
        
        {/* Botón Llamar */}
        <a href="tel:+573124813094" className="float-btn call" title="Llamar">
          <i className="bi bi-telephone-fill"></i>
        </a>

        {/* Botón WhatsApp */}
        <a href="https://wa.me/573124813094" target="_blank" rel="noreferrer" className="float-btn whatsapp" title="WhatsApp">
          <i className="bi bi-whatsapp"></i>
        </a>

        {/* Botón Instagram */}
        <a href="https://instagram.com/pipod.co" target="_blank" rel="noreferrer" className="float-btn instagram" title="Instagram">
          <i className="bi bi-instagram"></i>
        </a>

        {/* ETIQUETA ÚNICA: Debajo de Instagram y sobre la X */}
        <span className="single-label">Contáctanos</span>
        
        {/* Botón Cerrar (X) */}
        <button onClick={toggleMenu} className="float-btn close-btn">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* BOTÓN INICIAL (Solo se ve cuando está cerrado) */}
      {!isExpanded && (
        <div className={`trigger-wrapper ${shouldAnimate ? 'ring-animation' : ''}`} onClick={toggleMenu} role="button">
          <div className="main-trigger whatsapp-color">
            <i className="bi bi-whatsapp"></i>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .pipod-floating-container {
          position: fixed;
          right: 30px;
          bottom: 30px;
          z-index: 99999;
          font-family: 'Inter', sans-serif;
        }

        /* 1. Botón principal (WhatsApp grande) */
        .main-trigger {
          width: 82px; 
          height: 82px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 42px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          background-color: #25D366;
          cursor: pointer;
        }

        /* 2. Menú desplegado */
        .expanded-menu {
          display: none;
          flex-direction: column;
          align-items: center; 
          gap: 15px;
        }

        .expanded-menu.show {
          display: flex;
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 3. Iconos desplegados (más grandes) */
        .float-btn {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white !important;
          text-decoration: none;
          font-size: 32px;
          border: none;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          transition: transform 0.2s ease;
          cursor: pointer;
        }

        .float-btn:hover { transform: scale(1.1); }

        /* Etiqueta única Contáctanos */
        .single-label {
          color: #128c7e;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: rgba(255, 255, 255, 0.9);
          padding: 5px 12px;
          border-radius: 20px;
          margin-top: -5px;
          margin-bottom: -5px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          animation: fadeIn 0.5s ease forwards;
        }

        /* Colores */
        .whatsapp-color { background-color: #25D366 !important; }
        .call { background-color: #63f09f; }
        .whatsapp { background-color: #25D366; }
        .instagram { 
          background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%); 
        }
        
        /* 4. La X en verde WhatsApp */
        .close-btn { 
          background-color: white; 
          color: #25D366 !important;
          border: 3px solid #25D366;
          font-size: 26px;
        }

        /* Animaciones */
        @keyframes whatsapp-ring {
          0% { transform: scale(1); }
          10% { transform: scale(1.08) rotate(5deg); }
          20% { transform: scale(1.08) rotate(-5deg); }
          30% { transform: scale(1.08) rotate(5deg); }
          40% { transform: scale(1) rotate(0); }
        }

        .ring-animation { animation: whatsapp-ring 0.8s ease-in-out infinite; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default FloatingContact;