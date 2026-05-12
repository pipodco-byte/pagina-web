import type { WebProductWithVariants } from './supabase/types';

export const mockProductos: WebProductWithVariants[] = [
  {
    id: 'mock-1',
    sku: 'IPHONE16-128-BLK',
    nombre: 'iPhone 16',
    descripcion: 'iPhone 16 con chip A18, diseñado para Apple Intelligence.',
    condicion: 'Nuevo',
    precio_base: 3150000,
    precio_anterior: null,
    imagen_principal: null,
    activo: true,
    cantidad: 10,
    tipo_venta: 'Web',
    tipo: 'equipo',
    sku_base: null,
    categoria: 'iPhone',
    marca: 'Apple',
    created_at: '',
    updated_at: '',
    slug: 'iphone-16',
    variantes: []
  },
  {
    id: 'mock-2',
    sku: 'IPHONE16PRO-256-BLK',
    nombre: 'iPhone 16 Pro',
    descripcion: 'iPhone 16 Pro con chip A18 Pro, titanio de grado aeroespacial.',
    condicion: 'Nuevo',
    precio_base: 4599000,
    precio_anterior: null,
    imagen_principal: null,
    activo: true,
    cantidad: 5,
    tipo_venta: 'Web',
    tipo: 'equipo',
    sku_base: null,
    categoria: 'iPhone',
    marca: 'Apple',
    created_at: '',
    updated_at: '',
    slug: 'iphone-16-pro',
    variantes: []
  },
  {
    id: 'mock-3',
    sku: 'MBAIR15-M3-256-BLU',
    nombre: 'MacBook Air 15" M3',
    descripcion: 'MacBook Air de 15 pulgadas con chip M3, potente y eficiente.',
    condicion: 'Nuevo',
    precio_base: 4890000,
    precio_anterior: null,
    imagen_principal: null,
    activo: true,
    cantidad: 3,
    tipo_venta: 'Web',
    tipo: 'equipo',
    sku_base: null,
    categoria: 'MacBook',
    marca: 'Apple',
    created_at: '',
    updated_at: '',
    slug: 'macbook-air-15-m3',
    variantes: []
  }
];

export function getMockProductos(): WebProductWithVariants[] {
  console.warn('Using mock product data - Supabase query failed');
  return mockProductos;
}
