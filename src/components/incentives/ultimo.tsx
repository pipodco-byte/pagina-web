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
      title: "Especialistas", 
      subtitle: "APPLE CERTIFIED" 
    },
    { 
      icon: "bi-lightning-charge", 
      title: "Reparación", 
      subtitle: "ÁGIL Y SEGURA" 
    },
    { 
      icon: "bi-people", 
      title: "Trato", 
      subtitle: "HUMANO" 
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
          border-top: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
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
        }

        .gema-icon-ultimo i {
          font-size: 28px;
          color: #3A506B !important;
          opacity: 1 !important;
          display: flex;
          align-items: center;
        }

        .gema-content-ultimo {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .gema-title-ultimo {
          font-weight: 800;
          font-size: 14px;
          color: #000000 !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 1 !important;
        }

        .gema-subtitle-ultimo {
          font-weight: 500;
          font-size: 11px;
          color: #6E6E6E !important;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 1 !important;
        }

        @media (max-width: 1100px) {
          .container-gema-ultimo { padding: 0 40px; }
          .gema-subtitle-ultimo { display: none; }
        }

        @media (max-width: 991px) {
          .pipod-gema-informativo-ultimo { height: auto; padding: 45px 0; }
          .container-gema-ultimo { 
            flex-direction: column; 
            gap: 30px; 
            padding: 0 30px;
            align-items: flex-start;
          }
          .gema-subtitle-ultimo { display: block; }
        }
      `}} />
    </section>
  );
}