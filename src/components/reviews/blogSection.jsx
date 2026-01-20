import React from 'react';

export default function BlogSection() {
  const posts = [
    {
      title: 'Cómo mantener tu iPhone en perfecto estado',
      excerpt: 'Guía de mantenimiento preventivo para baterías y cuidado de componentes internos.',
      category: 'TIPS TÉCNICOS'
    },
    {
      title: 'MacBook: Rendimiento y productividad',
      excerpt: 'Configuraciones de expertos para optimizar tu flujo de trabajo en el ecosistema Apple.',
      category: 'GUÍA MAC'
    },
    {
      title: 'Reparaciones comunes en equipos Apple',
      excerpt: 'Conoce los procesos de microsoldadura y por qué un diagnóstico a tiempo salva tu equipo.',
      category: 'SOPORTE'
    }
  ];

  return (
    <section className="blog-section-white">
      <div className="container">
        <div className="header-container mb-5" style={{textAlign: 'left'}}>
          <h2 style={{fontFamily: "'Inter', sans-serif", fontSize: '2rem', fontWeight: '700', color: '#000000', margin: '0', letterSpacing: '-0.02em', textTransform: 'uppercase'}}>Expertos en Apple</h2>
        </div>

        <div className="row">
          {posts.map((post, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="blog-card-white">
                <div className="card-body-white">
                  <span className="card-cat">{post.category}</span>
                  <h4 className="card-t">{post.title}</h4>
                  <p className="card-p">{post.excerpt}</p>
                  <a href="#" className="card-link-premium">
                    LEER ARTÍCULO <i className="bi bi-arrow-right-short"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-section-white {
          background-color: #FFFFFF;
          padding: 100px 0;
          color: #000000;
        }

        .blog-subtitle {
          color: #6E6E6E; /* DimGrey */
          letter-spacing: 4px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .blog-main-title {
          font-weight: 800;
          font-size: 36px;
          letter-spacing: -1px;
          color: #000000; /* Negro Puro */
          margin-top: 10px;
        }

        .blog-card-white {
          background-color: #FFFFFF;
          border: 1px solid #E0E0E0; /* Platinum */
          padding: 45px 35px;
          height: 100%;
          transition: all 0.4s ease;
          position: relative;
        }

        .blog-card-white:hover {
          border-color: #000000;
          box-shadow: 0 15px 40px rgba(0,0,0,0.05);
          transform: translateY(-5px);
        }

        .card-cat {
          color: #3A506B; /* Tu azul de marca */
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 800;
          display: block;
          margin-bottom: 20px;
        }

        .card-t {
          font-weight: 700;
          font-size: 22px;
          line-height: 1.3;
          margin-bottom: 15px;
          color: #000000;
        }

        .card-p {
          color: #4C4C4C; /* Text Gray */
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .card-link-premium {
          color: #000000;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: gap 0.3s ease;
        }

        .card-link-premium:hover {
          gap: 12px;
          color: #000000;
        }

        .card-link-premium i {
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .blog-main-title { font-size: 28px; }
          .blog-section-white { padding: 60px 0; }
        }
      `}} />
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> develop
