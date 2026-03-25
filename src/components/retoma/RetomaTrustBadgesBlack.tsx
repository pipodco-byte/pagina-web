import React from 'react';

// Definimos la interfaz para la estructura de cada badge
interface BadgeItem {
  icon: string;
  title: string;
  subtitle: string;
}

export default function RetomaTrustBadges(): JSX.Element {
  // Tipamos el array de objetos usando la interfaz BadgeItem
  const badges: BadgeItem[] = [
    { 
      icon: "bi-shield-check", 
      title: "Proceso", 
      subtitle: "TRANSPARENTE" 
    },
    { 
      icon: "bi-cash-coin", 
      title: "Valoración", 
      subtitle: "JUSTA Y RÁPIDA" 
    },
    { 
      icon: "bi-lightning-charge", 
      title: "Pago", 
      subtitle: "INMEDIATO" 
    },
    { 
      icon: "bi-award", 
      title: "Garantía", 
      subtitle: "12 MESES" 
    }
  ];

  return (
    <section className="retoma-trust-badges">
      <div className="container-trust">
        {badges.map((item: BadgeItem, index: number) => (
          <div key={index} className="trust-item">
            <div className="trust-icon">
              <i className={`bi ${item.icon}`}></i>
            </div>
            <div className="trust-content">
              <span className="trust-title">{item.title}</span>
              <span className="trust-subtitle">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .retoma-trust-badges {
          background-color: #000000 !important;
          padding: 50px 0;
          display: flex;
          align-items: center;
          border: none;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .container-trust {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .retoma-trust-badges {
            padding: 80px 0;
          }
          .container-trust {
            padding: 0 80px;
          }
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 15px;
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          cursor: default;
        }

        .trust-item:hover {
          transform: translateY(-5px);
        }

        .trust-icon i {
          font-size: 32px;
          color: #FFFFFF !important;
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .trust-item:hover .trust-icon i {
          transform: scale(1.05);
        }

        .trust-content {
          display: flex;
          flex-direction: column;
          line-height: 1.0;
        }

        .trust-title {
          font-weight: 900;
          font-size: 0.875rem;
          color: #FFFFFF !important;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          -webkit-font-smoothing: antialiased;
        }

        .trust-subtitle {
          font-weight: 500;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7) !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 3px;
        }

        @media (max-width: 1100px) {
          .container-trust { padding: 0 40px; }
          .trust-subtitle { display: none; }
        }

        @media (max-width: 991px) {
          .retoma-trust-badges { height: auto; padding: 50px 0; }
          .container-trust { 
            flex-direction: column; 
            gap: 35px; 
            padding: 0 30px;
            align-items: flex-start;
          }
          .trust-subtitle { display: block; }
          .trust-item:hover { transform: none; }
        }
      `}} />
    </section>
  );
}