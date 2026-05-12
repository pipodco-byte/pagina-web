// DEPRECATED: Use lib/supabase/products.ts instead
// This file is kept for backwards compatibility during migration
// All functions now proxy to Supabase

import { getWebProductos, getWebProductoPorSlug } from './supabase/products';
import type { WebProductWithVariants } from './supabase/types';

export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioAnterior?: number;
  condicion: string;
  sku: string;
  tipo: string;
  thumb_src: string | null;
  thumb_alt: string;
  color?: string;
  colors?: string[];
  enStock: boolean;
  rating?: number;
  reviews?: number;
  useCase?: string;
  title?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  condition?: string;
}

function mapWebProductToProducto(product: WebProductWithVariants): Producto {
  return {
    id: product.id,
    slug: product.slug || '',
    nombre: product.nombre,
    title: product.nombre,
    descripcion: product.descripcion || '',
    precio: product.precio_base,
    price: product.precio_base,
    precioAnterior: product.precio_anterior || undefined,
    oldPrice: product.precio_anterior || undefined,
    condicion: product.condicion,
    condition: product.condicion,
    sku: product.sku,
    tipo: product.tipo,
    thumb_src: product.imagen_principal,
    thumb_alt: product.nombre,
    enStock: product.cantidad > 0,
    colors: product.variantes?.map(v => v.atributos.color || 'default') || []
  };
}

export async function getProductos(): Promise<Producto[]> {
  const productos = await getWebProductos();
  return productos.map(mapWebProductToProducto);
}

export async function getProductoPorSlug(slug: string): Promise<Producto | null> {
  const producto = await getWebProductoPorSlug(slug);
  if (!producto) return null;
  return mapWebProductToProducto(producto);
}