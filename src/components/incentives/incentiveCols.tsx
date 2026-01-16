import React from 'react';

export default function IncentiveCols() {
  const incentives = [
    {
      icon: "bi-search",
      title: "Diagnóstico transparente",
      desc: "Te mostramos el estado real de tu equipo, sin sorpresas ni costos ocultos."
    },
    {
      icon: "bi-patch-check",
      title: "Especialistas Apple",
      desc: "Más de 15 años de experiencia reparando exclusivamente productos Apple en Bogotá."
    },
    {
      icon: "bi-lightning-charge",
      title: "Reparación ágil",
      desc: "Optimizamos procesos para devolverte tu dispositivo Apple en el menor tiempo posible, con calidad garantizada."
    },
    {
      icon: "bi-people",
      title: "Trato humano y cercano",
      desc: "No tratamos con clientes, tratamos con personas. Te explicamos con claridad y te acompañamos en cada paso."
    }
  ];

  return (
    <section className="pipod-incentives-section">
      <div className="container">
        <div className="row gy-5">
          {incentives.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3 text-center">
              <div className="incentive-item">
                <div className="icon-wrapper mb-4">
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <h5 className="incentive-title mb-3">
                  {item.title}
                </h5>
                <p className="incentive-desc mx-auto">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pipod-incentives-section {
          background-color: #FFFFFF;
          padding: 100px 0;
          font-family: 'Inter', sans-serif;
        }

        .incentive-item {
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          padding: 20px;
        }

        .incentive-item:hover {
          transform: translateY(-8px);
        }

        .icon-wrapper {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-wrapper i {
          font-size: 45px;
          color: #000000; /* Negro Puro */
        }

        .incentive-title {
          font-weight: 800; /* Máximo peso para títulos */
          font-size: 18px;
          color: #000000;
          letter-spacing: -0.5px;
        }

        .incentive-desc {
          color: #6E6E6E; /* DimGrey de tu paleta */
          font-size: 15px;
          line-height: 1.7;
          max-width: 260px;
          font-weight: 400;
        }

        @media (max-width: 991px) {
          .pipod-incentives-section { padding: 70px 0; }
          .incentive-desc { max-width: 100%; }
        }
      `}} />
    </section>
  );
}