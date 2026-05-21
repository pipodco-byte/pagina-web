import type { APIRoute } from 'astro';

interface OrderData {
  reference: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  neighborhood: string;
  items: Array<{
    nombre: string;
    precio: number;
    cantidad: number;
  }>;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validar que sea POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Método no permitido' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const orderData: OrderData = await request.json();

    // Validar datos
    if (!orderData.reference || !orderData.customerName || !orderData.customerEmail) {
      return new Response(JSON.stringify({ error: 'Datos incompletos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      console.error('BREVO_API_KEY no configurada');
      return new Response(JSON.stringify({ error: 'Servicio de email no configurado' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Preparar contenido del email
    const itemsHtml = orderData.items
      .map(item => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E5E7;">
            <strong>${item.nombre}</strong>
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E5E7; text-align: center;">
            ${item.cantidad}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E5E7; text-align: right;">
            $${(item.precio * item.cantidad).toLocaleString('es-CO', { maximumFractionDigits: 0 })}
          </td>
        </tr>
      `)
      .join('');

    const totalAmount = orderData.items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    const emailContent = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3A506B; margin-bottom: 20px;">¡NUEVO PEDIDO PARA DESPACHAR!</h1>
        
        <div style="background: #F5F5F7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1D1D1F; margin-top: 0;">Referencia: ${orderData.reference}</h2>
          <p style="color: #555; margin: 8px 0;">
            <strong>Fecha:</strong> ${new Date().toLocaleString('es-CO')}
          </p>
        </div>

        <h3 style="color: #1D1D1F; margin-bottom: 12px;">Datos del Cliente</h3>
        <div style="background: #FFFFFF; border: 1px solid #D5D5D7; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 8px 0; color: #555;">
            <strong>Nombre:</strong> ${orderData.customerName}
          </p>
          <p style="margin: 8px 0; color: #555;">
            <strong>Celular:</strong> ${orderData.customerPhone}
          </p>
          <p style="margin: 8px 0; color: #555;">
            <strong>Email:</strong> ${orderData.customerEmail}
          </p>
          <p style="margin: 8px 0; color: #555;">
            <strong>Dirección:</strong> ${orderData.address}
          </p>
          <p style="margin: 8px 0; color: #555;">
            <strong>Barrio:</strong> ${orderData.neighborhood}
          </p>
        </div>

        <h3 style="color: #1D1D1F; margin-bottom: 12px;">Productos</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #F5F5F7;">
              <th style="padding: 8px; text-align: left; color: #1D1D1F; font-weight: 600;">Producto</th>
              <th style="padding: 8px; text-align: center; color: #1D1D1F; font-weight: 600;">Cantidad</th>
              <th style="padding: 8px; text-align: right; color: #1D1D1F; font-weight: 600;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="background: #F5F5F7; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #555;">Subtotal:</span>
            <strong style="color: #1D1D1F;">$${totalAmount.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #555;">Envío:</span>
            <strong style="color: #2E7D32;">Gratis</strong>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 2px solid #D5D5D7; padding-top: 8px;">
            <span style="color: #1D1D1F; font-weight: 600;">Total:</span>
            <strong style="color: #3A506B; font-size: 18px;">$${totalAmount.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</strong>
          </div>
        </div>

        <div style="background: #E8F5E9; padding: 12px; border-radius: 8px; color: #2E7D32; font-size: 12px;">
          <strong>✓ Garantía Pipod incluida</strong>
        </div>

        <hr style="border: none; border-top: 1px solid #D5D5D7; margin: 30px 0;">
        <p style="color: #86868B; font-size: 12px; text-align: center;">
          Este es un email automático de Pipod. Por favor, prepara el pedido para despacho.
        </p>
      </div>
    `;

    // Enviar email con Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: 'Pipod',
          email: 'noreply@pipod.co'
        },
        to: [
          {
            email: 'ventas@pipod.co',
            name: 'Ventas Pipod'
          }
        ],
        subject: `¡NUEVO PEDIDO! ${orderData.reference} - $${totalAmount.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`,
        htmlContent: emailContent
      })
    });

    if (!brevoResponse.ok) {
      const error = await brevoResponse.text();
      console.error('Error de Brevo:', error);
      return new Response(JSON.stringify({ error: 'Error al enviar email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email enviado correctamente' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API de email:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
