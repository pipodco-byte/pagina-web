import type { APIRoute } from 'astro';

export const prerender = false;

const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';

export const POST: APIRoute = async ({ request }) => {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

  console.log('BREVO_API_KEY:', BREVO_API_KEY ? 'configurada' : 'NO configurada');
  console.log('BREVO_LIST_ID:', BREVO_LIST_ID);

  try {
    const { email } = await request.json();
    console.log('Email recibido:', email);

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY no configurada');
      return new Response(
        JSON.stringify({ error: 'Error de configuración del servidor' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const payload = {
      email,
      listIds: [Number(BREVO_LIST_ID) || 7],
      updateEnabled: true,
    };

    console.log('Enviando a Brevo:', payload);

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Status de Brevo:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Response ok:', response.ok);

    // Verificar status ANTES de parsear JSON
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Brevo (status ' + response.status + '):', errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Error al suscribirse',
          details: errorText,
          status: response.status
        }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Status 204 (No Content) es éxito pero sin body
    if (response.status === 204) {
      console.log('Suscripción exitosa (204 No Content)');
      return new Response(
        JSON.stringify({ success: true, message: '¡Suscrito con éxito!' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Solo parsear JSON si hay contenido
    const data = await response.json();
    console.log('Respuesta exitosa de Brevo:', data);

    return new Response(
      JSON.stringify({ success: true, message: '¡Suscrito con éxito!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Newsletter error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
