/**
 * Webhook de Bold (DEPRECATED - usar /api/bold/webhook.ts)
 *
 * Este archivo se mantiene para backwards compatibility.
 * Por favor usa /api/bold/webhook.ts que tiene verificación HMAC.
 */

// This file is deprecated. Use /api/bold/webhook.ts instead.
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    error: 'Deprecated',
    message: 'Usa /api/bold/webhook en vez de /api/bold-webhook'
  }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  });
};
