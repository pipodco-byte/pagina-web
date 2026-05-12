import type { APIRoute } from 'astro';
import type { BoldLinkRequest, BoldLinkResponse } from '../../../lib/bold-types';

const BOLD_API_BASE_URL = 'https://integrations.api.bold.co';
const SANDBOX_API_BASE_URL = 'https://integrations-sandbox.api.bold.co';

export const POST: APIRoute = async ({ request }) => {
  try {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Método no permitido' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { amount, description, orderId, customerEmail, customerName, customerPhone } = body;

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Monto inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const isSandbox = import.meta.env.BOLD_SANDBOX_ENABLED === 'true';
    const apiKey = isSandbox
      ? import.meta.env.BOLD_SANDBOX_API_KEY
      : import.meta.env.BOLD_API_KEY;

    if (!apiKey) {
      console.error('Bold API key not configured');
      return new Response(JSON.stringify({ error: 'bold_api_error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const baseUrl = isSandbox ? SANDBOX_API_BASE_URL : BOLD_API_BASE_URL;
    const callbackUrl = `${new URL(request.url).origin}/api/bold/webhook`;

    const boldRequest: BoldLinkRequest = {
      amount_type: 'CLOSE',
      amount: {
        currency: 'COP',
        total_amount: Math.round(amount)
      },
      description: description || `Compra PIPOD - ${orderId}`,
      callback_url: callbackUrl,
      payer_email: customerEmail
    };

    console.log('Creando link de pago Bold:', { baseUrl, isSandbox, amount, orderId });

    const response = await fetch(`${baseUrl}/online/link/v1`, {
      method: 'POST',
      headers: {
        'Authorization': `x-api-key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(boldRequest)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Bold API error:', response.status, errorText);
      return new Response(JSON.stringify({ error: 'bold_api_error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const boldResponse: BoldLinkResponse = await response.json();
    const checkoutUrl = boldResponse.payload?.url;

    if (!checkoutUrl) {
      console.error('No checkout URL in Bold response:', boldResponse);
      return new Response(JSON.stringify({ error: 'bold_api_error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Link de pago Bold creado:', checkoutUrl);

    return new Response(JSON.stringify({ checkoutUrl }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creando link de pago:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};