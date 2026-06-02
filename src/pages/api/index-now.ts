import type { APIRoute } from 'astro';

export const prerender = false;

const INDEXNOW_ENDPOINTS = [
  'https://indexnow.org/indexnow',
  'https://www.bing.com/indexnow'
];

const HOST = 'www.pipod.co';
const KEY = '6e7e2464-f98a-4108-b71c-a652b9a63a9b';

interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

const mainUrls = [
  'https://www.pipod.co/',
  'https://www.pipod.co/servicio-tecnico-apple-bogota',
  'https://www.pipod.co/plan-retoma-apple',
  'https://www.pipod.co/tienda-pipod',
  'https://www.pipod.co/contacto-pipod',
  'https://www.pipod.co/pipod-blog'
];

const sendToIndexNow = async (urls: string[]): Promise<{ success: boolean; errors: string[] }> => {
  const payload: IndexNowPayload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/6e7e2464-f98a-4108-b71c-a652b9a63a9b.txt`,
    urlList: urls
  };

  const results = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(endpoint =>
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    )
  );

  const errors: string[] = [];
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      errors.push(`Failed to send to ${INDEXNOW_ENDPOINTS[index]}: ${result.reason}`);
    } else if (!result.value.ok) {
      errors.push(`${INDEXNOW_ENDPOINTS[index]} returned ${result.value.status}`);
    }
  });

  return { success: errors.length === 0, errors };
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(
        JSON.stringify({ error: 'urls array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { success, errors } = await sendToIndexNow(urls);

    console.log(`[IndexNow] Sent ${urls.length} URLs. Success: ${success}`);

    return new Response(
      JSON.stringify({
        success,
        message: `Notified IndexNow with ${urls.length} URLs`,
        errors: errors.length > 0 ? errors : undefined
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[IndexNow] Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const GET: APIRoute = async () => {
  const { success, errors } = await sendToIndexNow(mainUrls);

  return new Response(
    JSON.stringify({
      success,
      message: 'IndexNow notification triggered',
      urlsSent: mainUrls.length,
      errors: errors.length > 0 ? errors : undefined
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};