import React from 'react';

export default function IncentiveInformativo({ isDark = false }) {
  const incentives = [
    {
      icon: "bi-search",
      title: "Diagnóstico",
      desc: "Transparente y sin costos ocultos."
    },
    {
      icon: "bi-patch-check",
      title: "Especialistas",
      desc: "15 años reparando Apple."
    },
    {
      icon: "bi-lightning-charge",
      title: "Reparación",
      desc: "Ágil con calidad garantizada."
    },
    {
      icon: "bi-people",
      title: "Trato Humano",
      desc: "Te acompañamos en cada paso."
    }
  ];

  const theme = {
    bg: isDark ? "#000000" : "#FFFFFF",
    title: isDark ? "#FFFFFF" : "#000000",
    desc: isDark ? "rgba(255,255,255,0.6)" : "#6E6E6E",
    icon: isDark ? "#FFFFFF" : "#3A506B",
    border: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
  };

  return (
    <section className="pipod-gema-info">
      <div className="container-gema">
        {incentives.map((item, index) => (
          <div key={index} className="gema-info-item">
            <div className="gema-info-icon">
              <i className={`bi ${item.icon}`}></i>
            </div>
            <div className="gema-info-content">
              <span className="gema-info-title">{item.title}</span>
              <p className="gema-info-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pipod-gema-info {
          background-color: ${theme.bg};
          height: 119px;
          display: flex;
          align-items: center;
          border-top: 1px solid ${theme.border};
          border-bottom: 1px solid ${theme.border};
          font-family: 'Inter', sans-serif;
        }

        .container-gema {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .gema-info-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .gema-info-icon i {
          font-size: 22px;
          color: ${theme.icon};
        }

        .gema-info-content {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .gema-info-title {
          font-weight: 800;
          font-size: 13px;
          color: ${theme.title};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .gema-info-desc {
          font-size: 12px;
          color: ${theme.desc};
          margin: 2px 0 0 0;
          white-space: nowrap;
        }

        @media (max-width: 1150px) {
          .gema-info-desc { display: none; } /* En pantallas medianas se vuelve minimal */
        }

        @media (max-width: 991px) {
          .pipod-gema-info { height: auto; padding: 40px 0; }
          .container-gema { flex-direction: column; gap: 25px; align-items: flex-start; }
          .gema-info-desc { display: block; white-space: normal; }
        }
      `}} />
    </section>
  );
}