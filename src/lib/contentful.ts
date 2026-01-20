// Mock data - Inventario ficticio de iPhones y MacBooks
const mockProductos = [
  {
    sys: { id: '1' },
    fields: {
      nombre: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
      descripcion: 'El iPhone más avanzado con pantalla Super Retina XDR y chip A17 Pro',
      precio: 4999000,
      precioAnterior: 5499000,
      condicion: 'Nuevo',
      sku: 'IPHONE-15-PM-256',
      imagenes: [{ fields: { file: { url: 'iPhone-11_Black_Front_c58d1663-99b0-433b-bd78-8496d0fe89ac_1200x.jpg.webp' } } }],
      enStock: true,
    },
  },
  {
    sys: { id: '2' },
    fields: {
      nombre: 'iPhone 15',
      slug: 'iphone-15',
      descripcion: 'iPhone 15 con chip A16 Bionic y cámara mejorada',
      precio: 3299000,
      condicion: 'Seminuevo',
      sku: 'IPHONE-15-128',
      imagenes: [{ fields: { file: { url: 'iPhone-11_Black_Front_c58d1663-99b0-433b-bd78-8496d0fe89ac_1200x.jpg.webp' } } }],
      enStock: true,
    },
  },
  {
    sys: { id: '3' },
    fields: {
      nombre: 'MacBook Pro 16" M3 Max',
      slug: 'macbook-pro-16-m3-max',
      descripcion: 'MacBook Pro con chip M3 Max, 36GB RAM y 512GB SSD',
      precio: 8999000,
      condicion: 'Usado',
      sku: 'MBP-16-M3MAX-512',
      imagenes: [{ fields: { file: { url: 'MacBook_Pro_14-in_Space_Black_Pure_Front_Screen__USEN_dba9e232-238a-454c-b1d2-76d00adc5385_1500x.webp.jpeg' } } }],
      enStock: true,
    },
  },
  {
    sys: { id: '4' },
    fields: {
      nombre: 'MacBook Air 15" M2',
      slug: 'macbook-air-15-m2',
      descripcion: 'MacBook Air ultradelgada con chip M2 y batería de 18 horas',
      precio: 4499000,
      condicion: 'Nuevo',
      sku: 'MBA-15-M2-256',
      imagenes: [{ fields: { file: { url: 'MacBook_Pro_14-in_Space_Black_Pure_Front_Screen__USEN_dba9e232-238a-454c-b1d2-76d00adc5385_1500x.webp.jpeg' } } }],
      enStock: true,
    },
  },
  {
    sys: { id: '5' },
    fields: {
      nombre: 'iPhone 15 Pro',
      slug: 'iphone-15-pro',
      descripcion: 'iPhone 15 Pro con titanio y cámara de 48MP',
      precio: 4299000,
      condicion: 'Repotenciado',
      sku: 'IPHONE-15-PRO-256',
      imagenes: [{ fields: { file: { url: 'iPhone-11_Black_Front_c58d1663-99b0-433b-bd78-8496d0fe89ac_1200x.jpg.webp' } } }],
      enStock: true,
    },
  },
  {
    sys: { id: '6' },
    fields: {
      nombre: 'MacBook Pro 14" M3',
      slug: 'macbook-pro-14-m3',
      descripcion: 'MacBook Pro 14" con chip M3 y pantalla Liquid Retina XDR',
      precio: 6999000,
      condicion: 'Nuevo',
      sku: 'MBP-14-M3-512',
      imagenes: [{ fields: { file: { url: 'MacBook_Pro_14-in_Space_Black_Pure_Front_Screen__USEN_dba9e232-238a-454c-b1d2-76d00adc5385_1500x.webp.jpeg' } } }],
      enStock: false,
    },
  },
];

export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  precioAnterior?: number;
  condicion?: string;
  sku: string;
  imagenes: any[];
  categoria?: any;
  enStock: boolean;
  thumb_src?: string;
  thumb_alt?: string;
  title?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  color?: string;
  colors?: string[];
  rating?: number;
  reviews?: number;
  condition?: string;
}

export async function getProductos(): Promise<Producto[]> {
  try {
    return mockProductos.map((item: any) => {
      const imagen = item.fields.imagenes?.[0]?.fields?.file?.url;
      return {
        id: item.sys.id,
        nombre: item.fields.nombre,
        slug: item.fields.slug,
        descripcion: item.fields.descripcion,
        precio: item.fields.precio,
        precioAnterior: item.fields.precioAnterior,
        condicion: item.fields.condicion,
        sku: item.fields.sku,
        imagenes: item.fields.imagenes || [],
        categoria: item.fields.categoria,
        enStock: item.fields.enStock ?? true,
        thumb_src: `images/${imagen}`,
        thumb_alt: item.fields.nombre,
        title: item.fields.nombre,
        description: item.fields.descripcion,
        price: item.fields.precio,
        oldPrice: item.fields.precioAnterior,
        color: 'blue',
        colors: ['blue', 'gray', 'black'],
        rating: 4,
        reviews: 117,
        condition: item.fields.condicion || 'Nuevo',
      };
    });
  } catch (error) {
    console.error('Error fetching productos:', error);
    return [];
  }
}

export async function getProductoPorSlug(slug: string): Promise<Producto | null> {
  try {
    const item = mockProductos.find((p: any) => p.fields.slug === slug);
    if (!item) return null;

    const imagen = item.fields.imagenes?.[0]?.fields?.file?.url;
    
    return {
      id: item.sys.id,
      nombre: item.fields.nombre,
      slug: item.fields.slug,
      descripcion: item.fields.descripcion,
      precio: item.fields.precio,
      precioAnterior: item.fields.precioAnterior,
      condicion: item.fields.condicion,
      sku: item.fields.sku,
      imagenes: item.fields.imagenes || [],
      categoria: item.fields.categoria,
      enStock: item.fields.enStock ?? true,
      thumb_src: `images/${imagen}`,
      thumb_alt: item.fields.nombre,
      title: item.fields.nombre,
      description: item.fields.descripcion,
      price: item.fields.precio,
      oldPrice: item.fields.precioAnterior,
      color: 'blue',
      colors: ['blue', 'gray', 'black'],
      rating: 4,
      reviews: 117,
      condition: item.fields.condicion || 'Nuevo',
    };
  } catch (error) {
    console.error('Error fetching producto:', error);
    return null;
  }
}
