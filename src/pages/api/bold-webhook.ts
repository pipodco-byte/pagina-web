import type { APIRoute } from 'astro';

/**
 * Webhook de Bold
 * 
 * Este endpoint recibe notificaciones de Bold cuando un pago es completado.
 * Fase 2: Implementar cuando Bold proporcione las credenciales del webhook.
 * 
 * Ventajas:
 * - No depende de que el cliente regrese a /checkout-success
 * - Email se envía desde el servidor
 * - Más seguro y confiable
 * 
 * Flujo:
 * 1. Cliente paga en Bold
 * 2. Bold envía POST a /api/bold-webhook
 * 3. Verificamos la firma de Bold
 * 4. Enviamos email a ventas@pipod.co
 * 5. Enviamos email de confirmación al cliente
 * 6. Guardamos la venta en BD (Supabase)
 */

interface BoldWebhookPayload {
  reference: string;
  status: 'approved' | 'rejected' | 'pending';
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  timestamp: string;
  signature: string;
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

    const payload: BoldWebhookPayload = await request.json();

    console.log('Webhook de Bold recibido:', {
      reference: payload.reference,
      status: payload.status,
      amount: payload.amount
    });

    // TODO: Fase 2
    // 1. Verificar firma de Bold
    // const boldSecret = import.meta.env.BOLD_INTEGRITY_SECRET;
    // const isValid = verifyBoldSignature(payload, boldSecret);
    // if (!isValid) {
    //   return new Response(JSON.stringify({ error: 'Firma inválida' }), {
    //     status: 401,
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // }

    // 2. Si el pago fue aprobado
    if (payload.status === 'approved') {
      // TODO: Buscar checkoutData en BD
      // const checkoutData = await db.checkouts.findOne({ reference: payload.reference });

      // TODO: Enviar email a ventas@pipod.co
      // await sendOrderEmail(checkoutData);

      // TODO: Enviar email de confirmación al cliente
      // await sendCustomerConfirmationEmail(payload.customerEmail, checkoutData);

      // TODO: Guardar venta en BD
      // await db.sales.create({
      //   reference: payload.reference,
      //   amount: payload.amount,
      //   customerEmail: payload.customerEmail,
      //   status: 'completed',
      //   createdAt: new Date()
      // });

      console.log(`Pago aprobado: ${payload.reference}`);
    }

    // 3. Si el pago fue rechazado
    if (payload.status === 'rejected') {
      console.log(`Pago rechazado: ${payload.reference}`);
      // TODO: Notificar al cliente
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Webhook procesado correctamente' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en webhook de Bold:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

/**
 * Función para verificar la firma de Bold
 * TODO: Implementar cuando Bold proporcione la documentación
 */
function verifyBoldSignature(payload: BoldWebhookPayload, secret: string): boolean {
  // Implementar verificación de firma HMAC-SHA256
  // Consultar documentación de Bold
  return true;
}
