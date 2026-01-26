import React from 'react';

export default function StickyWhatsApp() {
  const handleClick = () => {
    window.open('https://wa.me/573124813094?text=Hola%20Pipod%2C%20necesito%20ayuda%20con%20mi%20equipo%20Apple', '_blank');
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="sticky-whatsapp"
        aria-label="Contactar por WhatsApp"
      >
        <span className="whatsapp-icon">💬</span>
        <span className="whatsapp-text">WhatsApp</span>
      </button>

      <style>{`
        .sticky-whatsapp {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #25D366;
          color: #fff;
          border: none;
          padding: 14px 20px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
          transition: all 0.3s ease;
        }

        .sticky-whatsapp:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(37, 211, 102, 0.6);
        }

        .whatsapp-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .whatsapp-text {
          font-family: 'Inter', sans-serif;
        }

        @media (max-width: 768px) {
          .sticky-whatsapp {
            bottom: 15px;
            right: 15px;
            padding: 12px 16px;
            font-size: 0.85rem;
          }

          .whatsapp-icon {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .whatsapp-text {
            display: none;
          }

          .sticky-whatsapp {
            width: 56px;
            height: 56px;
            padding: 0;
            justify-content: center;
            border-radius: 50%;
          }

          .whatsapp-icon {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </>
  );
}
