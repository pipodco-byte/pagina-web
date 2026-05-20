import type { APIRoute } from 'astro';
import { supabaseServer } from '../../lib/supabase/server';

export const prerender = false;

const INDEXNOW_ENDPOINTS = [
  'https://indexnow.org/indexnow',
  'https://www.bing.com/indexnow'
];
const HOST = 'www.pipod.co';
const KEY = '6e7e2464-f98a-4108-b71c-a652b9a63a9b';

const mainUrls = [
  'https://www.pipod.co/',
  'https://www.pipod.co/servicio-tecnico-apple',
  'https://www.pipod.co/plan-retoma-apple',
  'https://www.pipod.co/tienda-pipod',
  'https://www.pipod.co/contacto-pipod',
  'https://www.pipod.co/pipod-blog'
];

const notifyIndexNow = async (): Promise<void> => {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/6e7e2464-f98a-4108-b71c-a652b9a63a9b.txt`,
    urlList: mainUrls
  };

  await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(endpoint =>
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    )
  );

  console.log('[IndexNow] Notification sent for main URLs');
};

export const POST: APIRoute = async ({ request }) => {
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

  try {
    if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
      console.error('Google Places credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Google Places API not configured' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=rating,user_ratings_total&key=${GOOGLE_PLACES_API_KEY}`
    );

    const data = await response.json();

    if (!response.ok || data.status !== 'OK') {
      console.error('Google Places API error:', data);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Google Places data' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { rating, user_ratings_total } = data.result;

    // Actualizar en Supabase
    await supabaseServer
      .from('business_stats')
      .upsert({ id: 1, rating, user_ratings_total, last_updated: new Date().toISOString() });

    const reviewsData = {
      rating: rating ? rating.toString() : "5.0",
      totalReviews: user_ratings_total || 0,
      lastUpdated: new Date().toISOString(),
      comments: [
        "Datos sincronizados desde Google Places API",
        "Archivos que usan este dato:",
        "- src/components/promo/pipodGoogleReviews.jsx",
        "- src/components/SEO/LocalBusinessSchema.astro",
        "- src/components/SEO/RetomaPageSchema.astro",
        "- src/components/SEO/ServicePageSchema.astro",
        "- src/components/SEO/ContactPageSchema.astro"
      ]
    };

    console.log(`Reviews data prepared: ${rating} stars, ${user_ratings_total} reviews (fs.writeFileSync skipped for serverless)`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Reviews processed (serverless safe mode)',
        data: reviewsData
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Sync reviews error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
