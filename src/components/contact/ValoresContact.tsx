import React from 'react';

export default function ValoresContact() {
  const values = [
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
    <section className="pipod-values-section">
      <div className="container">
        <div className="values-header">
          <h2 className="values-title">Nuestros Valores</h2>
        </div>
        <div className="row gy-5">
          {values.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3 text-center">
              <div className="value-item">
                <div className="icon-wrapper mb-4">
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <h5 className="value-title mb-3">
                  {item.title}
                </h5>
                <p className="value-desc mx-auto">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pipod-values-section {
          background-color: #FFFFFF;
          padding: 80px 0;
          font-family: 'Inter', sans-serif;
        }

        .values-header {
          text-align: left;
          margin-bottom: 50px;
        }

        .values-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 900;
          letter-spacing: -1px;
          text-transform: uppercase;
          margin: 0;
          color: #000000;
        }

        .value-item {
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          padding: 20px;
        }

        .value-item:hover {
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
          color: #000000;
        }

        .value-title {
          font-weight: 800;
          font-size: 18px;
          color: #000000;
          letter-spacing: -0.5px;
        }

        .value-desc {
          color: #6E6E6E;
          font-size: 15px;
          line-height: 1.7;
          max-width: 260px;
          font-weight: 400;
        }

        @media (max-width: 991px) {
          .pipod-values-section { 
            padding: 70px 0; 
          }
          .value-desc { 
            max-width: 100%; 
          }
        }

        @media (max-width: 768px) {
          .values-header {
            margin-bottom: 40px;
          }

          .pipod-values-section {
            padding: 40px 0;
          }

          .values-title {
            font-size: 1.8rem;
          }

          .icon-wrapper i {
            font-size: 36px;
          }

          .value-title {
            font-size: 1rem;
          }

          .value-desc {
            font-size: 0.85rem;
          }
        }
      `}} />
    </section>
  );
}
