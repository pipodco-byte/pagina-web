import React from 'react';

export default function IncentiveGemaDark() {
  const incentives = [
    {
      icon: "bi-search",
      title: "Diagnóstico",
      desc: "Transparente y sin costos."
    },
    {
      icon: "bi-patch-check",
      title: "Especialistas",
      desc: "15 años reparando Apple."
    },
    {
      icon: "bi-lightning-charge",
      title: "Reparación",
      desc: "Ágil y garantizada."
    },
    {
      icon: "bi-people",
      title: "Trato Humano",
      desc: "Acompañamiento total."
    }
  ];

  return (
    <section className="pipod-incentives-dark-black">
      <div className="gema-container-black">
        {incentives.map((item, index) => (
          <div key={index} className="gema-card-black">
            <div className="gema-icon-box-black">
              <i className={`bi ${item.icon}`}></i>
            </div>
            <div className="gema-text-box-black">
              <span className="gema-title-black">{item.title}</span>
              <p className="gema-description-black">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pipod-incentives-dark-black {
          background-color: #000000;
          height: 119px;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Inter', sans-serif;
        }

        .pipod-incentives-dark-black .gema-container-black {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pipod-incentives-dark-black .gema-card-black {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .pipod-incentives-dark-black .gema-icon-box-black i {
          font-size: 32px;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
        }

        .pipod-incentives-dark-black .gema-text-box-black {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .pipod-incentives-dark-black .gema-title-black {
          font-weight: 900;
          font-size: 14px;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .pipod-incentives-dark-black .gema-description-black {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          margin: 4px 0 0 0;
          font-weight: 400;
          white-space: nowrap;
        }

        @media (max-width: 1200px) {
          .pipod-incentives-dark-black .gema-container-black { padding: 0 40px; }
          .pipod-incentives-dark-black .gema-description-black { display: none; }
        }

        @media (max-width: 991px) {
          .pipod-incentives-dark-black { height: auto; padding: 50px 0; }
          .pipod-incentives-dark-black .gema-container-black { flex-direction: column; gap: 35px; align-items: flex-start; }
          .pipod-incentives-dark-black .gema-description-black { display: block; opacity: 0.7; }
          .pipod-incentives-dark-black .gema-icon-box-black i { font-size: 38px; }
        }
      `}} />
    </section>
  );
}