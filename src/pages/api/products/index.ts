import type { APIRoute } from 'astro';
import { getWebProductos } from '../../../lib/supabase/products';

export const GET: APIRoute = async () => {
  try {
    const productos = await getWebProductos();

    return new Response(JSON.stringify(productos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};