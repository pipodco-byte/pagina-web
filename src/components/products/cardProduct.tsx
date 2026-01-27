import React from 'react';
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
  slug
}: Props) {
  
  const productUrl = slug ? `/producto/${slug}` : '#';
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const discountColor = discount > 35 ? '#D32F2F' : '#2E7D32';
  const isUsed = condition !== 'Nuevo';

  return (
    <a href={productUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="pipod-card-premium">
        <div className="product-display">
          <div className="badge-stack">
            <span className={`pipod-badge badge-${condition.toLowerCase()}`}>
              {condition}
            </span>
            {discount > 0 && (
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
            <button className="icon-btn btn-whatsapp" title="Preguntar por WhatsApp">
              <i className="bi bi-whatsapp"></i>
            </button>
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
              <span className="price-now">${price.toLocaleString()}</span>
              {oldPrice && (
                <span className="price-before">${oldPrice.toLocaleString()}</span>
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
  );
}
