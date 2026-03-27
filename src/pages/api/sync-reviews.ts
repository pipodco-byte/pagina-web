import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const prerender = false;

const GOOGLE_PLACES_API_KEY = import.meta.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = import.meta.env.GOOGLE_PLACE_ID;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
      console.error('Google Places credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Google Places API not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Consultar Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=rating,user_ratings_total&key=${GOOGLE_PLACES_API_KEY}`
    );

    const data = await response.json();

    if (!response.ok || data.status !== 'OK') {
      console.error('Google Places API error:', data);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Google Places data' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { rating, user_ratings_total } = data.result;

    // Actualizar reviews.json
    const reviewsPath = path.join(process.cwd(), 'public', 'data', 'reviews.json');
    
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

    fs.writeFileSync(reviewsPath, JSON.stringify(reviewsData, null, 2));

    console.log(`Reviews updated: ${rating} stars, ${user_ratings_total} reviews`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Reviews synced successfully',
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
