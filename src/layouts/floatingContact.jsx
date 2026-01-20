import React, { useState } from 'react';

const FloatingContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Función para alternar el menú
  const toggleMenu = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="pipod-floating-container">
      {/* Iconos de Bootstrap */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />

      {/* 1. MENÚ EXPANDIDO (Se muestra solo si isExpanded es true) */}
      <div className={`expanded-menu ${isExpanded ? 'show' : ''}`}>
        <a href="tel:+573124813094" className="float-btn call" title="Llamar">
          <i className="bi bi-telephone-fill"></i>
        </a>
        <a href="https://wa.me/573124813094" target="_blank" rel="noreferrer" className="float-btn whatsapp" title="WhatsApp">
          <i className="bi bi-whatsapp"></i>
        </a>
        <a href="https://instagram.com/pipod.co" target="_blank" rel="noreferrer" className="float-btn instagram" title="Instagram">
          <i className="bi bi-instagram"></i>
        </a>
        <button onClick={toggleMenu} className="float-btn close-btn">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* 2. BOTÓN INICIAL (Se oculta si está expandido) */}
      {!isExpanded && (
        <div className="trigger-wrapper" onClick={toggleMenu} role="button">
          <div className="chat-bubble">Contáctanos</div>
          <div className="main-trigger">
            <i className="bi bi-chat-dots-fill"></i>
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

        /* Estado Inicial */
        .trigger-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .chat-bubble {
          background: white;
          color: #333;
          padding: 10px 22px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          position: relative;
        }

        .chat-bubble::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 10px solid white;
        }

        .main-trigger {
          width: 70px;
          height: 70px;
          background-color: #94c99a; 
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        /* Menú Expandido */
        .expanded-menu {
          display: none;
          flex-direction: column;
          gap: 15px;
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .expanded-menu.show {
          display: flex;
        }

        .float-btn {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white !important;
          text-decoration: none;
          font-size: 26px;
          border: none;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .float-btn:hover { transform: scale(1.1); }

        /* Colores exactos capturas */
        .call { background-color: #63f09f; }
        .whatsapp { background-color: #78e08f; }
        .instagram { 
          background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%); 
        }
        .close-btn { background-color: #a2d2a7; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
};

export default FloatingContact;