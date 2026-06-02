import React from 'react';

export default function BlogSection() {
  const posts = [
    {
      title: 'Pantalla rota: Diagnóstico y reparación en 24 horas',
      excerpt: 'Conoce nuestro proceso de reparación con garantía Pipod. Microsoldadura de precisión y componentes originales.',
      category: 'SERVICIO TÉCNICO APPLE',
      link: '/blog/servicio-tecnico-apple'
    },
    {
      title: 'iPhone vs MacBook: ¿Cuál es la mejor inversión para ti?',
      excerpt: 'Guía completa de compra. Comparativas de specs, presupuestos y recomendaciones según tu uso.',
      category: 'COMPRA INTELIGENTE',
      link: '/blog/compra-inteligente'
    },
    {
      title: 'Por qué confiar en técnicos certificados Apple',
      excerpt: 'Más de 15 años de experiencia. Certificaciones oficiales, garantía real y diagnóstico gratuito.',
      category: 'EXPERTOS CERTIFICADOS',
      link: '/blog/expertos-certificados'
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
            <div key={index} className="col-12 col-md-4 mb-4">
              <div className="blog-card-white">
                <div className="card-body-white">
                  <span className="card-cat">{post.category}</span>
                  <h4 className="card-t">{post.title}</h4>
                  <p className="card-p">{post.excerpt}</p>
                  <a href={post.link} className="card-link-premium">
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
          background-color: #F8F9FA;
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
          border-radius: 24px;
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
          .blog-main-title { 
            font-size: 1.8rem !important;
          }
          .blog-section-white { 
            padding: 40px 0 !important;
          }
          .blog-card-white {
            padding: 24px 20px !important;
          }
          .card-t {
            font-size: 1.1rem !important;
          }
          .card-p {
            font-size: 0.9rem !important;
          }
          .card-link-premium {
            font-size: 0.85rem !important;
          }
        }
      `}} />
    </section>
  );
}
