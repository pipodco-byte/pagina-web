import React from 'react';

export default function IncentiveGema({ isDark = false }) {
  const incentives = [
    { icon: "bi-search", title: "Diagnóstico transparente" },
    { icon: "bi-patch-check", title: "Especialistas Apple" },
    { icon: "bi-lightning-charge", title: "Reparación ágil" },
    { icon: "bi-people", title: "Trato humano" }
  ];

  // Configuración de colores según el modo
  const theme = {
    bg: isDark ? "#000000" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#000000",
    icon: isDark ? "#FFFFFF" : "#3A506B", // Azul Pipod para modo claro
    border: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
  };

  return (
    <section className="pipod-gema-incentives">
      <div className="container-gema">
        {incentives.map((item, index) => (
          <div key={index} className="gema-item">
            <div className="gema-icon">
              <i className={`bi ${item.icon}`}></i>
            </div>
            <span className="gema-title">{item.title}</span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pipod-gema-incentives {
          background-color: ${theme.bg};
          height: 119px; /* Altura exacta Gema */
          display: flex;
          align-items: center;
          border-top: 1px solid ${theme.border};
          border-bottom: 1px solid ${theme.border};
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .container-gema {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 80px; /* Alineación con el resto de la web */
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .gema-item {
          display: flex;
          align-items: center;
          gap: 15px;
          transition: transform 0.3s ease;
        }

        .gema-item:hover {
          transform: translateY(-2px);
        }

        .gema-icon i {
          font-size: 24px;
          color: ${theme.icon};
          display: flex;
          align-items: center;
        }

        .gema-title {
          font-weight: 700;
          font-size: 14px;
          color: ${theme.text};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        @media (max-width: 991px) {
          .pipod-gema-incentives { 
            height: auto; 
            padding: 30px 0; 
          }
          .container-gema { 
            flex-direction: column; 
            gap: 20px; 
            padding: 0 20px;
            align-items: flex-start;
          }
        }
      `}} />
    </section>
  );
}