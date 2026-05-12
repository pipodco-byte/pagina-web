import type { APIRoute } from 'astro';

// Simple test endpoint - no imports at all
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    test: 'works',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};