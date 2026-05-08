import React from 'react';
import { useCartStore } from '../../hooks/useCartStore';
import { useHydrated } from '../../hooks/useHydrated';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, total, isOpen, closeCart } = useCartStore();
  const isHydrated = useHydrated();

  const handleCheckout = () => {
    if (items.length === 0) return;
    window.location.href = '/checkout';
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="cart-overlay" onClick={closeCart}></div>
      )}

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button className="close-btn" onClick={closeCart}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="cart-content">
          {isHydrated ? (
            items.length === 0 ? (
              <div className="empty-cart">
                <i className="bi bi-bag"></i>
                <p>Tu carrito está vacío</p>
                <small>Agrega accesorios para comenzar</small>
              </div>
            ) : (
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={`${import.meta.env.BASE_URL}${item.thumb_src}`}
                      alt={item.nombre}
                      className="item-image"
                    />

                    <div className="item-details">
                      <h4>{item.nombre}</h4>
                      <p className="item-price">
                        ${item.precio.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className="item-controls">
                      <div className="quantity-control">
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                          className="qty-btn"
                        >
                          −
                        </button>
                        <span className="qty-value">{item.cantidad}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="remove-btn"
                        title="Eliminar"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="empty-cart">
              <i className="bi bi-bag"></i>
              <p>Cargando carrito...</p>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${total.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="summary-row">
                <span>Envío:</span>
                <span className="free">Gratis</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${total.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <button className="btn-checkout" onClick={handleCheckout}>
              <i className="bi bi-credit-card"></i>
              Ir a Pagar
            </button>

            <button 
              className="btn-clear-cart"
              onClick={clearCart}
            >
              Limpiar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
