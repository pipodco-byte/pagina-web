import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, clearCart } from '../../store/cartStore';
import { validateCheckoutForm, sanitizeInput } from '../../lib/checkoutValidations';
import { useHydrated } from '../../hooks/useHydrated';
import './CheckoutForm.css';

interface ShippingData {
  fullName: string;
  phone: string;
  address: string;
  neighborhood: string;
  email: string;
}

export default function CheckoutForm() {
  const items = useStore(cartItems);
  const isHydrated = useHydrated();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ShippingData>({
    fullName: '',
    phone: '',
    address: '',
    neighborhood: '',
    email: ''
  });

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const shippingCost = 0;
  const finalTotal = total + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sanitizar inputs
      const sanitizedData = {
        fullName: sanitizeInput(formData.fullName),
        phone: sanitizeInput(formData.phone),
        address: sanitizeInput(formData.address),
        neighborhood: sanitizeInput(formData.neighborhood),
        email: sanitizeInput(formData.email)
      };

      // Validar todos los campos
      const validation = validateCheckoutForm(sanitizedData);
      if (!validation.valid) {
        alert(validation.errors.join('\n'));
        setIsLoading(false);
        return;
      }

      const boldPublicKey = import.meta.env.PUBLIC_BOLD_API_KEY;

      if (!boldPublicKey) {
        alert('Error: Pasarela de pagos no configurada');
        setIsLoading(false);
        return;
      }

      const reference = `PIPOD-${Date.now()}`;
      const amount = Math.round(finalTotal);

      const shippingDescription = `
Enviar a: ${sanitizedData.fullName}
Teléfono: ${sanitizedData.phone}
Dirección: ${sanitizedData.address}
Barrio: ${sanitizedData.neighborhood}
Email: ${sanitizedData.email}
      `.trim();

      localStorage.setItem('checkoutData', JSON.stringify({
        shipping: sanitizedData,
        items: items,
        reference: reference,
        amount: amount,
        total: finalTotal
      }));

      const checkoutData = {
        amount: amount,
        description: `Compra Pipod - ${shippingDescription}`,
        orderId: reference,
        customerEmail: sanitizedData.email,
        customerName: sanitizedData.fullName,
        customerPhone: sanitizedData.phone,
        items: items.map(item => ({
          sku: item.id,
          name: item.nombre,
          description: item.nombre,
          price: Math.round(item.precio),
          quantity: item.cantidad
        }))
      };

      console.log('Iniciando pago con Bold:', checkoutData);

      const response = await fetch('/api/bold/create-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutData)
      });

      const result = await response.json();

      if (!response.ok || !result.checkoutUrl) {
        console.error('Error creando link de pago:', result);
        alert('Error al procesar tu pedido. Intenta de nuevo.');
        setIsLoading(false);
        return;
      }

      console.log('Redirigiendo a Bold:', result.checkoutUrl);
      window.location.href = result.checkoutUrl;
    } catch (error) {
      console.error('Error al procesar checkout:', error);
      alert('Error al procesar tu pedido. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="bi bi-bag" style={{ fontSize: '64px', color: '#86868B', marginBottom: '20px', display: 'block' }}></i>
        <h2 style={{ color: '#1D1D1F', marginBottom: '10px' }}>Cargando...</h2>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="bi bi-bag" style={{ fontSize: '64px', color: '#86868B', marginBottom: '20px', display: 'block' }}></i>
        <h2 style={{ color: '#1D1D1F', marginBottom: '10px' }}>Tu carrito está vacío</h2>
        <p style={{ color: '#555', marginBottom: '30px' }}>Agrega productos antes de continuar</p>
        <a href="/tienda-pipod" style={{
          display: 'inline-block',
          background: '#3A506B',
          color: 'white',
          padding: '12px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Volver a la Tienda
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
      {/* Formulario */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1D1D1F' }}>
          Datos de Envío
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Nombre Completo */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1D1D1F' }}>
              Nombre Completo *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Juan Pérez"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #D5D5D7',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>

          {/* Celular */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1D1D1F' }}>
              Celular *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+57 312 1234567"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #D5D5D7',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>

          {/* Dirección */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1D1D1F' }}>
              Dirección Exacta *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Calle 123 #45-67, Apto 301"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #D5D5D7',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>

          {/* Barrio / Localidad */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1D1D1F' }}>
              Barrio / Localidad * (Crítico para logística)
            </label>
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleInputChange}
              placeholder="Usaquén, Chapinero, etc."
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #D5D5D7',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif'
              }}
            />
            <small style={{ color: '#86868B', marginTop: '4px', display: 'block' }}>
              Ej: Usaquén, Chapinero, Los Mártires, La Candelaria, Bosa, Kennedy, etc.
            </small>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1D1D1F' }}>
              Correo Electrónico *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="juan@example.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #D5D5D7',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: isLoading ? '#D5D5D7' : '#3A506B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) (e.target as HTMLButtonElement).style.background = '#2A3D5C';
            }}
            onMouseLeave={(e) => {
              if (!isLoading) (e.target as HTMLButtonElement).style.background = '#3A506B';
            }}
          >
            {isLoading ? 'Procesando...' : 'Continuar al Pago'}
          </button>
        </form>
      </div>

      {/* Resumen de Pedido */}
      <div>
        <div style={{
          background: '#F5F5F7',
          borderRadius: '12px',
          padding: '24px',
          position: 'sticky',
          top: '140px'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1D1D1F' }}>
            Resumen del Pedido
          </h2>

          {/* Items */}
          <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #D5D5D7' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '500', color: '#1D1D1F' }}>
                    {item.nombre}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#86868B' }}>
                    Cantidad: {item.cantidad}
                  </p>
                </div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1D1D1F' }}>
                  ${(item.precio * item.cantidad).toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                </p>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555', fontSize: '14px' }}>Subtotal:</span>
              <span style={{ fontWeight: '600', color: '#1D1D1F' }}>
                ${total.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555', fontSize: '14px' }}>Envío:</span>
              <span style={{ fontWeight: '600', color: '#2E7D32' }}>Gratis</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '2px solid #D5D5D7'
            }}>
              <span style={{ fontWeight: '600', fontSize: '16px', color: '#1D1D1F' }}>Total:</span>
              <span style={{ fontWeight: '700', fontSize: '18px', color: '#3A506B' }}>
                ${finalTotal.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          {/* Garantía */}
          <div style={{
            marginTop: '24px',
            padding: '12px',
            background: '#E8F5E9',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#2E7D32'
          }}>
            <i className="bi bi-shield-check" style={{ marginRight: '6px' }}></i>
            Garantía Pipod incluida en todos los productos
          </div>
        </div>
      </div>
    </div>
  );
}
