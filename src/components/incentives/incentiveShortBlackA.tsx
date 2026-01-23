import React from 'react';

export default function IncentiveGemaCoherent() {
  const incentives = [
    { 
      icon: "bi-search", 
      title: "Diagnóstico", 
      subtitle: "TRANSPARENTE Y SIN COSTOS" 
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
    },  
  ];

  return (
    <section className="pipod-gema-coherent">
      <div className="container-gema-coherent">
        {incentives.map((item, index) => (
          <div key={index} className="gema-item-coherent">
            <div className="gema-icon-coherent">
              <i className={`bi ${item.icon}`}></i>
            </div>
            <div className="gema-content-coherent">
              <span className="gema-title-coherent">{item.title}</span>
              <span className="gema-subtitle-coherent">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pipod-gema-coherent {
          background-color: #000000; /* Fondo sólido como Stats */
          height: 119px;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-family: 'Inter', sans-serif;
        }

        .container-gema-coherent {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 80px; /* Alineación exacta con .stats-container */
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .gema-item-coherent {
          display: flex;
          align-items: center;
          gap: 18px; /* Un poco más de aire para el icono grande */
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .gema-item-coherent:hover {
          transform: translateY(-5px);
        }

        .gema-icon-coherent i {
          font-size: 32px; /* Mantenemos la presencia imponente */
          color: #FFFFFF;
          display: flex;
          align-items: center;
        }

        .gema-content-coherent {
          display: flex;
          flex-direction: column;
          line-height: 1.2; /* Ajustado para que el copy largo respire */
        }

        .gema-title-coherent {
          font-weight: 900; /* Máximo peso para igualar el impacto de los números de Stats */
          font-size: 14px;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .gema-subtitle-coherent {
          font-weight: 500;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6) !important; /* Opacidad idéntica al .stat-suffix */
          text-transform: uppercase;
          letter-spacing: 1px; /* Tracking igualado al .stat-text de 1px */
          white-space: nowrap; /* Mantiene el copy en una línea para no romper los 119px */
        }

        @media (max-width: 1200px) {
          .gema-subtitle-coherent { font-size: 10px; }
        }

        @media (max-width: 991px) {
          .pipod-gema-coherent { height: auto; padding: 50px 0; }
          .container-gema-coherent { 
            flex-direction: column; 
            gap: 40px; 
            align-items: flex-start;
          }
          .gema-subtitle-coherent { white-space: normal; }
        }
      `}} />
    </section>
  );
}