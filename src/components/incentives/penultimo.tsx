import React from 'react';

export default function IncentiveGemaDarkMinimal() {
  const incentives = [
    {
      icon: "bi-search",
      title: "Diagnóstico",
      desc: "Transparente"
    },
    {
      icon: "bi-patch-check",
      title: "Especialistas",
      desc: "Apple"
    },
    {
      icon: "bi-lightning-charge",
      title: "Reparación",
      desc: "Ágil"
    },
    {
      icon: "bi-people",
      title: "Trato",
      desc: "Humano"
    }
  ];

  return (
    <section className="pipod-gema-dark-min-penultimo">
      <div className="container-gema-penultimo">
        {incentives.map((item, index) => (
          <div key={index} className="gema-item-penultimo">
            <div className="gema-icon-box-penultimo">
              <i className={`bi ${item.icon}`}></i>
            </div>
            <div className="gema-text-box-penultimo">
              <span className="gema-title-penultimo">{item.title}</span>
              <p className="gema-desc-penultimo">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pipod-gema-dark-min-penultimo {
          background-color: #000000;
          height: 119px;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Inter', sans-serif;
        }

        .container-gema-penultimo {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .gema-item-penultimo {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .gema-icon-box-penultimo i {
          font-size: 32px;
          color: #FFFFFF;
          display: flex;
          align-items: center;
        }

        .gema-text-box-penultimo {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .gema-title-penultimo {
          font-weight: 900;
          font-size: 14px;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .gema-desc-penultimo {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          margin: 2px 0 0 0;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 1100px) {
          .container-gema-penultimo { padding: 0 40px; }
          .gema-item-penultimo { gap: 10px; }
        }

        @media (max-width: 991px) {
          .pipod-gema-dark-min-penultimo { height: auto; padding: 50px 0; }
          .container-gema-penultimo { 
            flex-direction: column; 
            gap: 35px; 
            align-items: flex-start;
            padding: 0 30px;
          }
        }
      `}} />
    </section>
  );
}