import React from 'react';

export default function ContactValuesNew() {
  const values = [
    {
      icon: "bi-eye",
      title: "Transparencia",
      desc: "Sin sorpresas. Mostramos cada etapa del proceso de reparación."
    },
    {
      icon: "bi-gear",
      title: "Precisión Técnica",
      desc: "Especialistas en Apple que cuidan cada detalle técnico con estándares premium."
    },
    {
      icon: "bi-hand-thumbs-up",
      title: "Cercanía Humana",
      desc: "No tratamos con clientes, sino con personas. Escuchamos y acompañamos con empatía."
    },
    {
      icon: "bi-lightning-charge",
      title: "Agilidad y Eficiencia",
      desc: "Optimizamos procesos para respetar tu tiempo sin sacrificar la calidad."
    },
    {
      icon: "bi-wrench",
      title: "Solución Real",
      desc: "Vamos al punto y resolvemos rápido, priorizando la reparación sobre el cambio de piezas."
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
            <div key={index} className="col-12 col-md-6 col-lg-2-4 text-center">
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

        @media (max-width: 1024px) {
          .col-lg-2-4 {
            flex: 0 0 calc(50% - 15px);
          }
        }

        @media (max-width: 768px) {
          .pipod-values-section {
            padding: 70px 0;
          }

          .values-header {
            margin-bottom: 40px;
          }

          .value-desc {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .col-lg-2-4 {
            flex: 0 0 100%;
          }
        }

        /* Para 5 columnas en desktop */
        @media (min-width: 1025px) {
          .col-lg-2-4 {
            flex: 0 0 20%;
          }
        }
      `}} />
    </section>
  );
}
