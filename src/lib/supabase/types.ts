export interface WebProduct {
  id: string;
  sku: string;
  nombre: string;
  descripcion: string | null;
  condicion: string;
  precio_base: number;
  precio_anterior: number | null;
  imagen_principal: string | null;
  activo: boolean;
  cantidad: number;
  tipo_venta: string;
  tipo: string;
  sku_base: string | null;
  categoria: string | null;
  marca: string | null;
  created_at: string;
  updated_at: string;
  variantes?: WebProductVariante[];
  slug?: string;
}

export interface WebProductVariante {
  id: string;
  producto_id: string;
  sku: string;
  nombre: string;
  atributos: {
    almacenamiento?: string;
    color?: string;
    [key: string]: string | undefined;
  };
  precio: number | null;
  imagen: string | null;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface WebProductWithVariants extends WebProduct {
  variantes: WebProductVariante[];
}