import type { APIRoute } from 'astro';
import { getProductoPorSku } from '../../../lib/supabase/products';

export const GET: APIRoute = async ({ params }) => {
  try {
    const { sku } = params;

    if (!sku) {
      return new Response(JSON.stringify({ error: 'SKU is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const producto = await getProductoPorSku(sku);

    if (!producto) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(producto), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};