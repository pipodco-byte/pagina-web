import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase/client';

export const GET: APIRoute = async () => {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    supabase: {
      url: process.env.PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
      anonKey: process.env.PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
    },
    view: {
      exists: false,
      error: null as string | null,
      data: null as unknown,
    },
    products: {
      count: 0,
      error: null as string | null,
    }
  };

  if (!process.env.PUBLIC_SUPABASE_URL || !process.env.PUBLIC_SUPABASE_ANON_KEY) {
    return new Response(JSON.stringify({
      ...diagnostics,
      error: 'Supabase credentials not configured'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { data, error } = await supabase
      .from('web_productos_complete')
      .select('id')
      .limit(1);

    if (error) {
      diagnostics.view.error = error.message;
      diagnostics.view.errorCode = error.code;
    } else {
      diagnostics.view.exists = true;
    }
  } catch (e: any) {
    diagnostics.view.error = e.message;
  }

  try {
    const { data: productos, error: productosError } = await supabase
      .from('web_productos_complete')
      .select('id')
      .limit(10);

    if (productosError) {
      diagnostics.products.error = productosError.message;
    } else {
      diagnostics.products.count = productos?.length || 0;
    }
  } catch (e: any) {
    diagnostics.products.error = e.message;
  }

  const status = diagnostics.view.exists && !diagnostics.view.error ? 200 : 500;

  return new Response(JSON.stringify(diagnostics, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
