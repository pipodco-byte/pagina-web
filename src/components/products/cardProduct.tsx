import React, { useState } from 'react';
import { useGTM } from '../gtm/useGTM';
import { useCart } from '../../context/CartContext';
import ProductBadge from './productBadge';
import './cardProduct.css';

interface Props {
  thumb_src: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  condition?: 'Nuevo' | 'Seminuevo' | 'Repotenciado';
  colors?: string[];
  rating?: number;
  batteryHealth?: string;
  slug?: string;
  tipo?: 'equipo' | 'accesorio';
  id?: string;
}

export default function CardProduct({
  thumb_src,
  title,
  description,
  price,
  oldPrice,
  condition = 'Nuevo',
  colors,
  rating = 4.9,
  batteryHealth,
  slug,
  tipo = 'accesorio',
  id = slug || title
}: Props) {
  const { track } = useGTM();
  const { addItem } = useCart();
  const [showToast, setShowToast] = useState(false);
  
  const isEquipo = tipo === 'equipo';
  const isUsed = condition !== 'Nuevo';
  const productUrl = slug ? `/producto/${slug}` : '#';
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const discountColor = discount > 35 ? '#D32F2F' : '#2E7D32';

  const handleProductClick = () => {
    try {
      track('click_product_card', {
        product_name: title,
        product_price: price,
        condition: condition,
        tipo: tipo,
      });
    } catch (error) {
      console.error('GTM tracking error:', error);
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const mensaje = `Hola Pipod, me interesa el producto ${title} a $${price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`;
    const url = `https://wa.me/573124813094?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      nombre: title,
      precio: price,
      thumb_src,
      slug: slug || '',
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    try {
      track('add_to_cart', {
        product_name: title,
        product_price: price,
        product_id: id,
      });
    } catch (error) {
      console.error('GTM tracking error:', error);
    }
  };

  return (
    <>
      <a href={productUrl} style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleProductClick}>
        <div className="pipod-card-premium">
          <div className="product-display">
            <div className="badge-stack">
              <span className={`pipod-badge badge-${condition.toLowerCase()}`}>
                {condition}
              </span>
              {!isEquipo && discount > 0 && (
                <span className="discount-badge" style={{ backgroundColor: discountColor }}>
                  {discount}% OFF
                </span>
              )}
            </div>
            
            <div className="actions-side">
              <button className="icon-btn" title="Favoritos"><i className="bi bi-heart"></i></button>
              {isUsed && (
                <button className="icon-btn" title="Certificado PIPOD"><i className="bi bi-shield-check"></i></button>
              )}
              {isEquipo ? (
                <button className="icon-btn btn-whatsapp" title="Consultar por WhatsApp" onClick={handleWhatsAppClick}>
                  <i className="bi bi-whatsapp"></i>
                </button>
              ) : (
                <button className="icon-btn" title="Agregar al carrito" onClick={handleAddToCart}>
                  <i className="bi bi-cart-plus"></i>
                </button>
              )}
            </div>

            <img 
              src={`${import.meta.env.BASE_URL}${thumb_src}`} 
              alt={title} 
              className="img-hero" 
            />
          </div>

          <div className="product-content">
            <div className="price-rating-group">
              <div className="price-block">
                <span className="price-now">${price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</span>
                {oldPrice && (
                  <span className="price-before">${oldPrice.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</span>
                )}
              </div>
              <div className="rating-block">
                <i className="bi bi-star-fill"></i> <span>{rating}</span>
              </div>
            </div>

            <h3 className="title-text">{title}</h3>
            <p className="description-text">{description}</p>

            {isUsed && (
              <div className="tech-specs-row">
                <div className="spec-item">
                  <i className="bi bi-battery-full"></i>
                  <span>Salud: {batteryHealth || '90%+'}</span>
                </div>
                <div className="spec-item">
                  <i className="bi bi-patch-check"></i>
                  <span>Garantía PIPOD</span>
                </div>
              </div>
            )}

            {colors && colors.length > 0 && (
              <div className="color-footer">
                <ProductBadge colors={colors} />
              </div>
            )}
          </div>
        </div>
      </a>

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
}
