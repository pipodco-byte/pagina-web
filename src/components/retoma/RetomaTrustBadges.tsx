import React from 'react';

export default function RetomaTrustBadges() {
  const badges = [
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
        {badges.map((item, index) => (
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
          background-color: #FFFFFF !important;
          height: 119px;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(0,0,0,0.06);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .container-trust {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          color: #3A506B !important;
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
          font-size: 14px;
          color: #000000 !important;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          -webkit-font-smoothing: antialiased;
        }

        .trust-subtitle {
          font-weight: 500;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.6) !important;
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
