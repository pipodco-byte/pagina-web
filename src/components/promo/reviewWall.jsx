import React from 'react';

export default function ReviewWall() {
  const reviews = [
    {
      name: "Wilson Vega",
      date: "Hace un mes",
      text: "Quiero agradecer por el servicio prestado. La atención fue muy buena desde el inicio, el trabajo se realizó de manera excelente, rápida y totalmente confiable. Los precios fueron justos, lo cual valoro mucho y por eso continuaré utilizando sus servicios en el futuro.",
      image: "/images/wilson.jpg",
      initial: "W",
      bg: "#E8F0FE",
      isLocalGuide: false
    },
    {
      name: "Sergio niño burgos",
      type: "Local Guide",
      date: "Hace 2 meses",
      text: "Muchas gracias chicos el equipo re potenciado funciona muy bien, su servicio es muy pro! Siente uno plena confianza en dejar los equipos en sus manos, sin dejar de lado el trato amable y cordial.",
      image: "/images/sergio.jpg",
      initial: "S",
      bg: "#E6F4EA",
      isLocalGuide: true
    },
    {
      name: "David Gonzalez",
      type: "Local Guide",
      date: "Hace un año",
      text: "Excelente atención y tiempos de respuesta. Me brindaron una solución exprés en la reparación de mi teléfono celular.",
      image: "/images/david.jpg",
      initial: "D",
      bg: "#FCE8E6",
      isLocalGuide: true
    },
    {
      name: "Naya Solano",
      type: "Local Guide",
      date: "3 semanas atrás",
      text: "Excelente servicio, atención impecable y muy buena experiencia. Súper recomendado, sin duda volveré.",
      image: null, 
      initial: "N",
      bg: "#E65100", // Naranja medio oscuro (Burnt Orange)
      color: "#FFFFFF",
      isLocalGuide: true
    },
    {
      name: "Nicolas Rocha",
      date: "2 semanas atrás",
      text: "Excelente atención, muy confiable y en un lugar bastante cómodo. ¡Super recomendado en todo sentido!",
      image: "/images/nicolas.jpg",
      initial: "N",
      bg: "#333333",
      isLocalGuide: false
    },
    {
      name: "Mario Bonilla",
      date: "Hace 2 años",
      text: "Atención rápida honesta, y profesional. Realmente saben de dispositivos Apple.",
      image: "/images/mario.jpg", // <--- AHORA SÍ LEE LA DE MARIO
      initial: "M",
      bg: "#F3E8FD",
      color: "#7E57C2",
      isLocalGuide: false
    }
  ];

  return (
    <section className="review-wall-pipod">
      <div className="container">
        <h2 className="text-center fw-bold mb-5 main-title">Opiniones de nuestros clientes</h2>

        {/* HEADER DE GOOGLE */}
        <div className="google-header-bar mb-5 shadow-sm">
          <div className="d-flex align-items-center flex-wrap gap-3">
            <span className="big-score">4.9</span>
            <div className="stars-group d-flex gap-1">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="bi bi-star-fill text-warning"></i>
              ))}
            </div>
            <span className="reviews-text">
              37 reseñas • <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" height="16" alt="Google" className="align-middle mb-1"/>
            </span>
          </div>
          <a href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4" target="_blank" className="btn-google-blue">
            Déjanos una reseña
          </a>
        </div>

        {/* GRID DE CARDS */}
        <div className="row g-4">
          {reviews.map((review, index) => (
            <div key={index} className="col-md-6 col-lg-4 animate-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="pipod-card h-100">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="avatar-container">
                    <div className="avatar-circle" style={{backgroundColor: review.bg}}>
                      {review.image ? (
                        <img src={review.image} alt={review.name} className="img-fluid rounded-circle" />
                      ) : (
                        <span style={{color: review.color || '#5F6368'}}>{review.initial}</span>
                      )}
                    </div>
                    <div className="google-overlap">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" width="12" />
                    </div>
                  </div>
                  
                  <div className="user-meta">
                    <div className="d-flex align-items-center gap-1">
                      <span className="user-name">{review.name}</span>
                      <i className="bi bi-patch-check-fill text-primary" style={{fontSize: '12px'}}></i>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span className="review-date text-muted">{review.date}</span>
                      {review.isLocalGuide && <span className="lg-tag">• Local Guide</span>}
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-warning" style={{fontSize: '12px'}}></i>
                  ))}
                </div>

                <p className="review-comment">"{review.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .review-wall-pipod {
          background-color: #F8F9FA;
          padding: 80px 0;
        }

        .main-title { font-size: 32px; color: #000; letter-spacing: -0.5px; }

        .google-header-bar {
          background: #FFFFFF;
          border-radius: 100px;
          padding: 12px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .big-score { font-size: 22px; font-weight: 700; color: #202124; }
        .reviews-text { color: #5F6368; font-size: 14px; }

        .btn-google-blue {
          background-color: #4285F4;
          color: white !important;
          padding: 8px 20px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }

        .pipod-card {
          background: #FFFFFF;
          border-radius: 24px;
          padding: 24px;
          border: 1px solid #EDEDED;
          transition: transform 0.3s ease;
        }

        .pipod-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .avatar-container { position: relative; width: 48px; height: 48px; }
        .avatar-circle {
          width: 100%; height: 100%;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 600; font-size: 18px;
          overflow: hidden;
        }

        .google-overlap {
          position: absolute;
          bottom: -2px; right: -2px;
          background: white;
          border-radius: 50%;
          width: 18px; height: 18px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        .user-name { font-weight: 700; color: #202124; font-size: 14px; }
        .review-date, .lg-tag { font-size: 11px; color: #70757a; }
        .review-comment { font-size: 14px; color: #3c4043; line-height: 1.5; margin-bottom: 0; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-card {
          opacity: 0;
          animation: fadeInUp 0.5s ease forwards;
        }

        @media (max-width: 768px) {
          .google-header-bar { border-radius: 20px; flex-direction: column; text-align: center; gap: 15px; }
        }
      `}} />
    </section>
  );
}