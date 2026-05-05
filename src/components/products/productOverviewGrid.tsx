import React, { useState } from 'react';
import ProductRating from '../reviews/reviewRating'
import ProductGallery from './productGallery'
import ProductSizes from './productSizes'
import { addItem } from '../../store/cartStore';

interface Props {
  title: string;
  colors: string[];
  images: (({
    src: string;
    alt: string;
  }))[];
  full_description: string;
  price: number;
  highlights: string[];
  details: string;
  rating: number;
  reviews: number;
  sizes: Map<string,number>;
  tipo?: 'equipo' | 'accesorio';
  id?: string;
  slug?: string;
}

export default function ProductOverview({
  title,
  colors,
  images,
  full_description,
  price,
  highlights,
  details,
  rating,
  reviews,
  sizes,
  tipo = 'accesorio',
  slug,
  id = slug || title
}: Props) {
  const isEquipo = tipo === 'equipo';
  const [showToast, setShowToast] = useState(false);

  const handleWhatsAppClick = () => {
    const mensaje = `Hola Pipod, me interesa el producto ${title} a $${price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`;
    const url = `https://wa.me/573124813094?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    addItem({
      id,
      nombre: title,
      precio: price,
      thumb_src: images[0]?.src || '',
      slug: slug || '',
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
    <div style={{ border: 'none' }}>
      <div className="row">
        {(images.length != 0) && 
          <ProductGallery images={images}/>
        }
        <div className="col-12 col-lg-6 ps-lg-5">
          {(title.length != 0) && 
            <h2 className="mt-4" style={{ fontWeight: 700 }}>{title}</h2>
          }
          {(full_description.length != 0) && 
            <p className="mb-5">{full_description}</p>
          }

          <form action="" method="post">
            {(price.length != 0) && 
              <div className="d-flex">
                <h3 className="font-weight-normal">${price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</h3>
                <input className="opacity-0" defaultValue={price} />
              </div>
            }

            {(rating != 0) && 
            <>
              <h3 className="sr-only">Reviews</h3>
              <div className="d-flex">
                <ProductRating rating={4} />
                <span className="ms-3">{reviews} reviews</span>
              </div>
            </>
            }
            
            {(sizes.size != 0) && 
              <ProductSizes sizes={sizes}/>
            }

            {isEquipo ? (
              <button 
                type="button"
                onClick={handleWhatsAppClick}
                className="btn btn-dark btn-lg w-100"
              >
                <i className="bi bi-whatsapp me-2"></i>
                Consultar por WhatsApp
              </button>
            ) : (
              <button 
                type="button"
                onClick={handleAddToCart}
                className="btn btn-dark btn-lg w-100"
              >
                <i className="bi bi-cart-plus me-2"></i>
                Agregar al Carrito
              </button>
            )}
          </form>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-12 col-lg-6">
          <h4>Product Description</h4>
          <p>There's nothing I really wanted to do in life that I wasn't able to get good at. That's my skill. I'm not really specifically talented at anything except for the ability to learn. That's what I do. That's what I'm here for. Don't be afraid to be wrong because you can't learn anything from a compliment.</p>
          {(highlights.length != 0) && 
           <>
             <h6>Benefits</h6>
              <ul className="text-sm">
              {highlights.map(highlight => 
                <li className="mb-2">{highlight}</li>
              )}
              </ul>
           </>
          }
           {(details.length != 0) && 
             <>
               <h6>Más sobre el producto</h6>
               <p>{details}</p>
             </>
            }
        </div>
      </div>
    </div>

    {showToast && (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#2E7D32',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 9999,
        animation: 'slideIn 0.3s ease-out',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
      }}>
        ✓ {title} agregado al carrito
      </div>
    )}

    <style>{`
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `}</style>
    </>
  );
};
