import React from 'react';

export default function IncentiveGemaInformativo() {
  const incentives = [
    { 
      icon: "bi-search", 
      title: "Diagnóstico", 
      subtitle: "TRANSPARENTE" 
    },
    { 
      icon: "bi-patch-check", 
      title: "Especialistas APPLE", 
      subtitle: "15 años en el mercado" 
    },
    { 
      icon: "bi-lightning-charge", 
      title: "Reparación ÁGIL", 
      subtitle: "CALIDAD GARANTIZADA" 
    },
    { 
      icon: "bi-people", 
      title: "Trato humano", 
      subtitle: "CLARIDAD Y ACOMPAÑAMIENTO" 
    }
  ];

  return (
    <section className="pipod-gema-informativo-ultimo">
      <div className="container-gema-ultimo">
        {incentives.map((item, index) => (
          <div key={index} className="gema-item-ultimo">
            <div className="gema-icon-ultimo">
              <i className={`bi ${item.icon}`}></i>
            </div>
            <div className="gema-content-ultimo">
              <span className="gema-title-ultimo">{item.title}</span>
              <span className="gema-subtitle-ultimo">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pipod-gema-informativo-ultimo {
          background-color: #FFFFFF !important;
          height: 119px;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(0,0,0,0.06);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .container-gema-ultimo {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .gema-item-ultimo {
          display: flex;
          align-items: center;
          gap: 15px;
          /* Transición suave para la elevación */
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          cursor: default;
        }

        /* Micro-interacción: Elevación sutil */
        .gema-item-ultimo:hover {
          transform: translateY(-5px);
        }

        .gema-icon-ultimo i {
          font-size: 32px;
          color: #3A506B !important;
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        /* El icono también reacciona un poco al hover */
        .gema-item-ultimo:hover .gema-icon-ultimo i {
          transform: scale(1.05);
        }

        .gema-content-ultimo {
          display: flex;
          flex-direction: column;
          line-height: 1.0;
        }

        .gema-title-ultimo {
          font-weight: 900;
          font-size: 14px;
          color: #000000 !important;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          -webkit-font-smoothing: antialiased;
        }

        .gema-subtitle-ultimo {
          font-weight: 500;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.6) !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 3px;
        }

        @media (max-width: 1100px) {
          .container-gema-ultimo { padding: 0 40px; }
          .gema-subtitle-ultimo { display: none; }
        }

        @media (max-width: 991px) {
          .pipod-gema-informativo-ultimo { height: auto; padding: 50px 0; }
          .container-gema-ultimo { 
            flex-direction: column; 
            gap: 35px; 
            padding: 0 30px;
            align-items: flex-start;
          }
          .gema-subtitle-ultimo { display: block; }
          .gema-item-ultimo:hover { transform: none; } /* Desactivado en móvil para evitar saltos */
        }
      `}} />
    </section>
  );
}