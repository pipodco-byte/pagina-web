import type { APIRoute } from 'astro';
import { verifyHmacSignature } from '../../../lib/hmac';
import type { BoldWebhookPayload } from '../../../lib/bold-types';

const WEBHOOK_TIMESTAMP_TOLERANCE_MS = 5 * 60 * 1000;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Método no permitido' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const signature = request.headers.get('x-bold-signature');
    const timestamp = request.headers.get('x-bold-timestamp');

    if (!signature) {
      return new Response(JSON.stringify({ error: 'Falta firma' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (timestamp) {
      const webhookTime = new Date(timestamp).getTime();
      const now = Date.now();
      if (Math.abs(now - webhookTime) > WEBHOOK_TIMESTAMP_TOLERANCE_MS) {
        console.error('Webhook timestamp too old:', timestamp);
        return new Response(JSON.stringify({ error: 'Timestamp expirado' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    const payload: BoldWebhookPayload = await request.json();
    const boldSecret = import.meta.env.BOLD_INTEGRITY_SECRET;

    if (!boldSecret) {
      console.error('BOLD_INTEGRITY_SECRET not configured');
      return new Response(JSON.stringify({ error: 'Configuración inválida' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { signature: _, ...payloadForVerification } = payload;
    const payloadString = JSON.stringify(payloadForVerification);

    const isValid = verifyHmacSignature(payloadString, signature, boldSecret);

    if (!isValid) {
      console.error('Invalid webhook signature');
      return new Response(JSON.stringify({ error: 'Firma inválida' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Webhook de Bold recibido:', {
      reference: payload.reference,
      status: payload.status,
      amount: payload.amount
    });

    if (payload.status === 'approved') {
      console.log(`Pago aprobado: ${payload.reference}`);
    }

    if (payload.status === 'rejected') {
      console.log(`Pago rechazado: ${payload.reference}`);
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