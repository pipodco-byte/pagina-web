import { atom } from 'nanostores';
import type { WebProductWithVariants } from '../lib/supabase/types';

export const $products = atom<WebProductWithVariants[]>([]);

export const $filters = atom<{
  categoria: string | null;
  tipo: string | null;
  busqueda: string;
}>({
  categoria: null,
  tipo: null,
  busqueda: ''
});

export function setProducts(productos: WebProductWithVariants[]) {
  $products.set(productos);
}

export function setFilter(key: 'categoria' | 'tipo' | 'busqueda', value: string | null) {
  $filters.set({
    ...$filters.get(),
    [key]: value
  });
}

export function clearFilters() {
  $filters.set({
    categoria: null,
    tipo: null,
    busqueda: ''
  });
}

export function getFilteredProducts(): WebProductWithVariants[] {
  const products = $products.get();
  const filters = $filters.get();

  return products.filter(product => {
    if (filters.categoria && product.categoria?.toLowerCase() !== filters.categoria.toLowerCase()) {
      return false;
    }
    if (filters.tipo && product.tipo?.toLowerCase() !== filters.tipo.toLowerCase()) {
      return false;
    }
    if (filters.busqueda) {
      const searchLower = filters.busqueda.toLowerCase();
      if (!product.nombre.toLowerCase().includes(searchLower) &&
          !product.sku?.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    return true;
  });
}