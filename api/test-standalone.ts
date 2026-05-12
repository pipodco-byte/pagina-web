export default async function handler(req) {
  return new Response(JSON.stringify({
    test: 'standalone function works',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}