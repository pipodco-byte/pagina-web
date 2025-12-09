import contentful from 'contentful';

const client = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  sku: string;
  imagenes: any[];
  categoria?: any;
  enStock: boolean;
  // Campos adicionales para compatibilidad con el template
  thumb_src?: string;
  thumb_alt?: string;
  title?: string;
  description?: string;
  price?: string;
  color?: string;
  colors?: string[];
  rating?: number;
  reviews?: number;
}

export async function getProductos(): Promise<Producto[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'producto',
    });

    return entries.items.map((item: any) => {
      const imagen = item.fields.imagenes?.[0]?.fields?.file?.url;
      return {
        id: item.sys.id,
        nombre: item.fields.nombre,
        slug: item.fields.slug,
        descripcion: item.fields.descripcion,
        precio: item.fields.precio,
        sku: item.fields.sku,
        imagenes: item.fields.imagenes || [],
        categoria: item.fields.categoria,
        enStock: item.fields.enStock ?? true,
        // Mapeo para compatibilidad con el template
        thumb_src: imagen ? `https:${imagen}` : '/images/product1.jpg',
        thumb_alt: item.fields.nombre,
        title: item.fields.nombre,
        description: item.fields.descripcion,
        price: `$${item.fields.precio.toLocaleString('es-CO')}`,
        color: 'blue',
        colors: ['blue', 'gray', 'black'],
        rating: 4,
        reviews: 117,
      };
    });
  } catch (error) {
    console.error('Error fetching productos from Contentful:', error);
    return [];
  }
}

export async function getProductoPorSlug(slug: string): Promise<Producto | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'producto',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) return null;

    const item = entries.items[0];
    const imagen = item.fields.imagenes?.[0]?.fields?.file?.url;
    
    return {
      id: item.sys.id,
      nombre: item.fields.nombre,
      slug: item.fields.slug,
      descripcion: item.fields.descripcion,
      precio: item.fields.precio,
      sku: item.fields.sku,
      imagenes: item.fields.imagenes || [],
      categoria: item.fields.categoria,
      enStock: item.fields.enStock ?? true,
      thumb_src: imagen ? `https:${imagen}` : '/images/product1.jpg',
      thumb_alt: item.fields.nombre,
      title: item.fields.nombre,
      description: item.fields.descripcion,
      price: `$${item.fields.precio.toLocaleString('es-CO')}`,
      color: 'blue',
      colors: ['blue', 'gray', 'black'],
      rating: 4,
      reviews: 117,
    };
  } catch (error) {
    console.error('Error fetching producto from Contentful:', error);
    return null;
  }
}
