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
  oldPrice?: number;
  highlights: string[];
  details: string;
  rating: number;
  reviews: number;
  sizes: { [key: string]: number };
  tipo?: 'equipo' | 'accesorio';
  condition?: string;
  categoria?: string;
  marca?: string;
  id?: string;
  slug?: string;
}

export default function ProductOverview({
  title,
  colors,
  images,
  full_description,
  price,
  oldPrice,
  highlights,
  details,
  rating,
  reviews,
  sizes,
  tipo = 'accesorio',
  condition,
  categoria,
  marca,
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
            {(price != 0) && 
              <div className="d-flex align-items-center gap-3">
                <h3 className="font-weight-normal mb-0" style={{ fontWeight: 700, color: '#1F1F1F' }}>${price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</h3>
                {oldPrice && oldPrice > 0 && (
                  <span style={{ textDecoration: 'line-through', color: '#86868B', fontSize: '1.1rem' }}>
                    ${oldPrice.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                  </span>
                )}
                <input className="opacity-0" defaultValue={price} />
              </div>
            }

            {(rating != 0) && 
            <>
              <h3 className="sr-only">Reviews</h3>
              <div className="d-flex">
                <ProductRating rating={rating} />
                <span className="ms-3">{reviews} reviews</span>
              </div>
            </>
            }
            
            {(Object.keys(sizes).length != 0) && 
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
      
      <div className="row mt-5 pt-4" style={{ borderTop: '1px solid #E5E5E7' }}>
        <div className="col-12 col-lg-8">
          {(full_description.length != 0) && 
           <>
             <h4 style={{ 
               fontFamily: "'Inter', sans-serif", 
               fontWeight: 700, 
               fontSize: '1.25rem',
               color: '#1F1F1F',
               marginBottom: '16px'
             }}>Descripción</h4>
             <p style={{ 
               fontFamily: "'Noto Sans', sans-serif", 
               fontSize: '0.95rem',
               lineHeight: '1.6',
               color: '#3A3A3A',
               marginBottom: '32px'
             }}>{full_description}</p>
           </>
          }
          
          {(highlights.length != 0 || condition || categoria || marca) && 
           <div style={{ marginBottom: '32px' }}>
             <h4 style={{ 
               fontFamily: "'Inter', sans-serif", 
               fontWeight: 700, 
               fontSize: '1.25rem',
               color: '#1F1F1F',
               marginBottom: '16px'
             }}>Detalles del Producto</h4>
             <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
               gap: '12px'
             }}>
               {condition && (
                 <div style={{
                   background: '#F5F5F7',
                   padding: '12px 16px',
                   borderRadius: '8px'
                 }}>
                   <div style={{ fontFamily: "'PT Mono', monospace", fontSize: '0.7rem', color: '#3A506B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Condición</div>
                   <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#1F1F1F' }}>{condition === 'usado' ? 'Seminuevo' : condition}</div>
                 </div>
               )}
               {categoria && (
                 <div style={{
                   background: '#F5F5F7',
                   padding: '12px 16px',
                   borderRadius: '8px'
                 }}>
                   <div style={{ fontFamily: "'PT Mono', monospace", fontSize: '0.7rem', color: '#3A506B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Categoría</div>
                   <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#1F1F1F' }}>{categoria}</div>
                 </div>
               )}
               {marca && (
                 <div style={{
                   background: '#F5F5F7',
                   padding: '12px 16px',
                   borderRadius: '8px'
                 }}>
                   <div style={{ fontFamily: "'PT Mono', monospace", fontSize: '0.7rem', color: '#3A506B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Marca</div>
                   <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#1F1F1F' }}>{marca}</div>
                 </div>
               )}
               {highlights.map(highlight => {
                 const [label, ...valueParts] = highlight.split(': ');
                 const value = valueParts.join(': ');
                 return (
                   <div key={label} style={{
                     background: '#F5F5F7',
                     padding: '12px 16px',
                     borderRadius: '8px'
                   }}>
                     <div style={{ fontFamily: "'PT Mono', monospace", fontSize: '0.7rem', color: '#3A506B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{label}</div>
                     <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#1F1F1F' }}>{value}</div>
                   </div>
                 );
               })}
             </div>
           </div>
          }
          
          {(details.length != 0) && 
           <div style={{
             background: '#F5F5F7',
             borderLeft: '3px solid #3A506B',
             padding: '16px 20px',
             borderRadius: '0 8px 8px 0',
             marginBottom: '32px'
           }}>
             <p style={{ 
               fontFamily: "'Noto Sans', sans-serif", 
               fontSize: '0.9rem',
               lineHeight: '1.5',
               color: '#3A506B',
               margin: 0
             }}>{details}</p>
           </div>
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
