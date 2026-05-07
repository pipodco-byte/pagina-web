import { supabase } from './client';
import type { WebProduct, WebProductVariante, WebProductWithVariants } from './types';
import { slugify } from '../slug';

const APPLE_PLACEHOLDER_BASE = 'https://store.storeimages.cdn-apple.com';

export interface WebProductView {
  id: string;
  sku: string;
  title: string;
  description: string | null;
  price: number | null;
  old_price: number | null;
  condition: string;
  categoria: string | null;
  tipo: string;
  thumb_src: string | null;
  stock: number;
  sku_base: string | null;
  activo: boolean;
  variantes: Array<{
    id: string;
    sku: string;
    nombre: string;
    color: string | null;
    almacenamiento: string | null;
    precio: number | null;
    stock: number | null;
  }>;
}

function getPlaceholderImage(nombre: string): string {
  const lowerName = nombre.toLowerCase();
  if (lowerName.includes('iphone')) {
    return `${APPLE_PLACEHOLDER_BASE}/4982/Apple/Images/model-thumbnail/iphone-16-pro-galleriahero-202409-FMT_WHH.webp`;
  }
  if (lowerName.includes('macbook')) {
    return `${APPLE_PLACEHOLDER_BASE}/4982/Apple/Images/model-thumbnail/macbook-air-m3-202402-FMT_WHH.webp`;
  }
  if (lowerName.includes('ipad')) {
    return `${APPLE_PLACEHOLDER_BASE}/4982/Apple/Images/model-thumbnail/ipad-pro-13-202404-FMT_WHH.webp`;
  }
  if (lowerName.includes('airpods')) {
    return `${APPLE_PLACEHOLDER_BASE}/4982/Apple/Images/model-thumbnail/airpods-pro-202409-FMT_WHH.webp`;
  }
  if (lowerName.includes('apple watch') || lowerName.includes('watch')) {
    return `${APPLE_PLACEHOLDER_BASE}/4982/Apple/Images/model-thumbnail/apple-watch-series-10-202409-FMT_WHH.webp`;
  }
  if (lowerName.includes('pencil')) {
    return `${APPLE_PLACEHOLDER_BASE}/4982/Apple/Images/model-thumbnail/apple-pencil-pro-202405-FMT_WHH.webp`;
  }
  return `${APPLE_PLACEHOLDER_BASE}/4982/Apple/Images/model-thumbnail/default.webp`;
}

function mapViewToWebProduct(view: WebProductView): WebProductWithVariants {
  const variantes = view.variantes || [];
  return {
    id: view.id,
    sku: view.sku,
    nombre: view.title,
    descripcion: view.description,
    condicion: view.condition,
    precio_base: view.price || 0,
    precio_anterior: view.old_price,
    imagen_principal: view.thumb_src,
    activo: view.activo,
    cantidad: view.stock,
    tipo_venta: 'Web',
    tipo: view.tipo,
    sku_base: view.sku_base,
    categoria: view.categoria,
    marca: null,
    created_at: '',
    updated_at: '',
    slug: slugify(view.title),
    variantes: variantes.map(v => ({
      id: v.id,
      producto_id: view.id,
      sku: v.sku,
      nombre: v.nombre,
      atributos: {
        color: v.color || undefined,
        almacenamiento: v.almacenamiento || undefined
      },
      precio: v.precio,
      imagen: null,
      activo: true,
      created_at: '',
      updated_at: ''
    }))
  };
}

export async function getWebProductos(): Promise<WebProductWithVariants[]> {
  const { data: productos, error } = await supabase
    .from('web_productos_complete')
    .select('*')
    .order('title');

  if (error) {
    console.error('Error fetching web productos:', error);
    return [];
  }

  if (!productos || productos.length === 0) {
    return [];
  }

  return productos.map(mapViewToWebProduct);
}

export async function getWebProductoPorSlug(slug: string): Promise<WebProductWithVariants | null> {
  const productos = await getWebProductos();
  const producto = productos.find(p => p.slug === slug);
  return producto || null;
}

export async function getWebProductosPorCategoria(categoria: string): Promise<WebProductWithVariants[]> {
  const productos = await getWebProductos();
  return productos.filter(p => p.categoria?.toLowerCase() === categoria.toLowerCase());
}

export async function getWebProductosPorTipo(tipo: 'equipo' | 'accesorio'): Promise<WebProductWithVariants[]> {
  const productos = await getWebProductos();
  return productos.filter(p => p.tipo === tipo);
}

export async function getProductoPorSku(sku: string): Promise<WebProductWithVariants | null> {
  const productos = await getWebProductos();
  const producto = productos.find(p => p.sku === sku);
  return producto || null;
}

export function getStockBadge(product: WebProduct): { text: string; class: string } {
  if (product.cantidad > 0) {
    return { text: `En Stock (${product.cantidad})`, class: 'badge-success' };
  }
  return { text: 'Pre-order', class: 'badge-warning' };
}

export function getImageUrl(product: WebProduct): string {
  if (product.imagen_principal) {
    return product.imagen_principal;
  }
  return getPlaceholderImage(product.nombre);
}

export function getDisplayPrice(product: WebProduct): number {
  return product.precio_base || 0;
}