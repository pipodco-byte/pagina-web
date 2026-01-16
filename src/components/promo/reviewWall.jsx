import React from 'react';

export default function ReviewWall() {
  const reviews = [
    {
      name: "Sergio niño burgos",
      type: "Local Guide",
      date: "Hace 2 meses",
      text: "Muchas gracias chicos el equipo re potenciado funciona muy bien, su servicio es muy pro! Siente uno plena confianza en dejar los equipos en sus manos.",
      initial: "S",
      bg: "#E6F4EA",
      color: "#137333",
      isLocalGuide: true
    },
    {
      name: "Naya Solano",
      type: "Local Guide",
      date: "3 semanas atrás",
      text: "Excelente servicio, atención impecable y muy buena experiencia. Súper recomendado, sin duda volveré.",
      initial: "N",
      bg: "#FFF8E1",
      color: "#F9AB00",
      isLocalGuide: true
    },
    {
      name: "Enrique Jaramillo",
      date: "Hace 2 días",
      text: "Excelente servicio",
      initial: "E",
      bg: "#F2F2F2",
      color: "#000000",
      isLocalGuide: false
    },
    {
      name: "Andrés Ortiz Sedano",
      date: "una semana atrás",
      text: "Siempre la mejor atención y los mejores precios",
      initial: "A",
      bg: "#3F51B5",
      color: "#FFFFFF",
      isLocalGuide: false
    },
    {
      name: "Nicolas Rocha",
      date: "2 semanas atrás",
      text: "Excelente atención, muy confiable y en un lugar bastante cómodo. Super recomendado en todo sentido !",
      initial: "N",
      bg: "#333333",
      color: "#FFFFFF",
      isLocalGuide: false
    },
    {
      name: "Mario Bonilla",
      date: "Hace 2 años",
      text: "Atención rápida honesta, y profesional. Realmente saben de dispositivos Apple",
      initial: "M",
      bg: "#FCE8E6",
      color: "#C5221F",
      isLocalGuide: false
    }
  ];

  return (
    <section className="review-wall-pipod">
      <div className="container">
        <h2 className="text-center fw-bold mb-5 main-title">Opiniones de nuestros clientes</h2>

        {/* HEADER DE GOOGLE EXACTO */}
        <div className="google-header-bar mb-5">
          <div className="d-flex align-items-center flex-wrap gap-3">
            <span className="big-score">4.9</span>
            <div className="stars-group">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="bi bi-star-fill text-warning"></i>
              ))}
            </div>
            <span className="reviews-text">37 reseñas activado <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" height="18" alt="Google" className="ms-1 align-middle"/></span>
          </div>
          <a href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4" target="_blank" className="btn-google-blue">Déjanos una reseña en Google</a>
        </div>

        {/* GRID DE CARDS CON ANIMACIÓN */}
        <div className="row g-4">
          {reviews.map((review, index) => (
            <div key={index} className="col-md-6 col-lg-4 animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="review-card-modern">
                <div className="d-flex align-items-center gap-3 mb-3">
                  {/* AVATAR CON G SOLAPADA */}
                  <div className="avatar-wrapper">
                    <div className="avatar-main" style={{backgroundColor: review.bg, color: review.color}}>
                      {review.initial}
                    </div>
                    <div className="google-icon-overlap">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" width="12" />
                    </div>
                  </div>
                  
                  <div className="meta">
                    <div className="d-flex align-items-center gap-1">
                      <span className="name">{review.name}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#1A73E8">
                        <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                      </svg>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span className="date">{review.date}</span>
                      {review.isLocalGuide && <span className="local-guide-tag">• Local Guide</span>}
                    </div>
                  </div>
                </div>

                <div className="stars-row mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-warning" style={{fontSize: '13px'}}></i>
                  ))}
                </div>

                <p className="comment">"{review.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .review-wall-pipod {
          background-color: #F8F9FA;
          padding: 80px 0;
          overflow: hidden;
        }

        .main-title { font-size: 32px; letter-spacing: -0.5px; color: #000; }

        .google-header-bar {
          background: #FFFFFF;
          border-radius: 100px;
          padding: 15px 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .btn-google-blue {
          background-color: #4285F4;
          color: white !important;
          padding: 10px 25px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }

        .review-card-modern {
          background: #FFFFFF;
          border-radius: 24px;
          padding: 25px;
          height: 100%;
          border: 1px solid #F1F3F4;
          transition: all 0.3s ease;
        }

        .local-guide-tag {
          font-size: 11px;
          color: #70757a;
          font-weight: 500;
        }

        /* Animación Fade In Up */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-on-scroll {
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .avatar-wrapper { position: relative; width: 48px; height: 48px; }
        .avatar-main {
          width: 100%; height: 100%;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 600; font-size: 20px;
        }

        .google-icon-overlap {
          position: absolute;
          bottom: -2px; right: -2px;
          background: white;
          border-radius: 50%;
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .name { font-weight: 700; color: #202124; font-size: 14px; }
        .date { font-size: 12px; color: #70757a; }
        .comment { font-size: 14px; color: #3c4043; line-height: 1.5; }
      `}} />
    </section>
  );
}