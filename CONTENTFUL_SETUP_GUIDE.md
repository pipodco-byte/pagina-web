# Guía de Configuración de Contentful para Pipod (v2 - Mejorada)

## Paso 1: Crear Cuenta y Espacio en Contentful

1. Ve a https://www.contentful.com/sign-up/
2. Crea una cuenta gratuita
3. Crea un nuevo espacio llamado "Pipod"
4. Selecciona "Empty space" (espacio vacío)

---

## Paso 2: Crear Modelos de Referencia (PRIMERO)

### 2.1. Modelo: Estado de Producto

1. Ve a **Content model** en el menú lateral
2. Click en **Add content type**
3. Configura:
   - **Name**: Estado de Producto
   - **API Identifier**: `estadoProducto`
4. Click **Create**
5. Añade el campo:
   - Click **Add field** → **Text**
   - **Name**: Nombre de Estado
   - **Field ID**: `nombreEstado`
   - **Validations**: 
     - ✅ Required field
     - ✅ Unique field
   - Click **Create and configure**
6. Click **Save** en la parte superior

**Crear las 3 entradas:**
1. Ve a **Content** en el menú lateral
2. Click **Add entry** → Selecciona "Estado de Producto"
3. Crea 3 entradas:
   - Entrada 1: `Nuevo`
   - Entrada 2: `Seminuevo`
   - Entrada 3: `Usado`
4. **Publica** cada una (botón verde "Publish")

---

### 2.2. Modelo: Ficha Técnica

1. Ve a **Content model**
2. Click **Add content type**
3. Configura:
   - **Name**: Ficha Técnica
   - **API Identifier**: `fichaTecnica`
4. Click **Create**

**Añade los siguientes campos (en orden):**

| Campo | Tipo | Field ID | Requerido | Notas |
|-------|------|----------|-----------|-------|
| Nombre de Ficha | Text (Short) | `nombreFicha` | ✅ | Este es el título |
| Almacenamiento | Text (Short) | `almacenamiento` | ❌ | Ej: "256GB" |
| RAM | Text (Short) | `ram` | ❌ | Ej: "8GB" |
| Procesador | Text (Short) | `procesador` | ✅ | Ej: "M2" |
| Pantalla | Text (Short) | `pantalla` | ✅ | Ej: "13.6 pulgadas" |
| Tarjeta Gráfica | Text (Short) | `tarjetaGrafica` | ❌ | Ej: "Integrada" |
| Cámara Principal | Text (Short) | `camaraPrincipal` | ❌ | Ej: "12MP" |
| Capacidad Batería | Text (Short) | `capacidadBateria` | ❌ | Ej: "3000mAh" |
| Sistema Operativo | Text (Short) | `sistemaOperativo` | ✅ | Ej: "iOS 17" |

5. Click **Save**

---

### 2.3. Modelo: Categoría (NUEVO - Importante)

1. Ve a **Content model** → **Add content type**
2. Configura:
   - **Name**: Categoría
   - **API Identifier**: `categoria`
3. Click **Create**

**Campos:**

| Campo | Tipo | Field ID | Requerido |
|-------|------|----------|-----------|
| Nombre | Text (Short) | `nombre` | ✅ |
| Slug | Slug | `slug` | ✅ |
| Descripción | Text (Long) | `descripcion` | ❌ |
| Icono/Emoji | Text (Short) | `icono` | ❌ |

4. Click **Save**

**Crear categorías de ejemplo:**
- Celulares
- Portátiles
- Tabletas
- Computadoras
- Wearables y Audio
- Accesorios
- Servicios Técnicos

---

## Paso 3: Crear Modelos de Productos (Los 7)

### 3.1. Modelo: Celular (iPhones y Smartphones)

1. Ve a **Content model** → **Add content type**
2. Configura:
   - **Name**: Celular
   - **API Identifier**: `celular`
3. Click **Create**

**Añade estos campos:**

| Campo | Tipo | Field ID | Requerido | Configuración |
|-------|------|----------|-----------|---------------|
| Nombre del Producto | Text (Short) | `nombreProducto` | ✅ | Entry title |
| Slug | Slug | `slug` | ✅ | |
| Categoría | Reference (One) | `categoria` | ✅ | Apunta a `categoria` |
| Precio de Venta | Number (Integer) | `precioVenta` | ✅ | |
| Precio Original | Number (Integer) | `precioOriginal` | ❌ | Para descuentos |
| Galería de Fotos | Media (Multiple) | `galeriaFotos` | ✅ | |
| Disponibilidad | Boolean | `disponibilidad` | ✅ | |
| Stock Disponible | Number (Integer) | `stockDisponible` | ✅ | Cantidad en inventario |
| Descripción Corta | Text (Short) | `descripcionCorta` | ✅ | Para tarjetas |
| Descripción Completa | Rich Text | `descripcionCompleta` | ❌ | Detalles completos |
| Prioridad Destacado | Boolean | `prioridadDestacado` | ❌ | Mostrar en inicio |
| Estado del Equipo | Reference (One) | `estadoEquipo` | ✅ | Apunta a `estadoProducto` |
| Especificaciones Técnicas | Reference (One) | `especificacionesTecnicas` | ✅ | Apunta a `fichaTecnica` |
| Garantía (meses) | Number (Integer) | `garantiaMeses` | ❌ | Ej: 12 |
| Notas de Garantía | Text (Long) | `notasGarantia` | ❌ | Detalles de cobertura |
| SKU | Text (Short) | `sku` | ✅ | Identificador único |

4. Click **Save**

---

### 3.2. Modelo: Portátil (MacBooks y Laptops)

Repite el mismo proceso que `celular` pero con:
- **Name**: Portátil
- **API Identifier**: `portatil`
- **Mismos campos** que celular

---

### 3.3. Modelo: Tableta (iPads y Tablets)

- **Name**: Tableta
- **API Identifier**: `tableta`
- **Mismos campos** que celular

---

### 3.4. Modelo: Computadora (iMacs y Desktops)

- **Name**: Computadora
- **API Identifier**: `computadora`
- **Mismos campos** que celular

---

### 3.5. Modelo: Wearable y Audio

- **Name**: Wearable y Audio
- **API Identifier**: `wearable_audio`
- **Mismos campos** que celular

---

### 3.6. Modelo: Accesorio

1. Ve a **Content model** → **Add content type**
2. Configura:
   - **Name**: Accesorio
   - **API Identifier**: `accesorio`

**Campos (SIN fichaTecnica):**

| Campo | Tipo | Field ID | Requerido |
|-------|------|----------|-----------|
| Nombre del Producto | Text (Short) | `nombreProducto` | ✅ |
| Slug | Slug | `slug` | ✅ |
| Categoría | Reference (One) | `categoria` | ✅ |
| Precio de Venta | Number (Integer) | `precioVenta` | ✅ |
| Precio Original | Number (Integer) | `precioOriginal` | ❌ |
| Galería de Fotos | Media (Multiple) | `galeriaFotos` | ✅ |
| Disponibilidad | Boolean | `disponibilidad` | ✅ |
| Stock Disponible | Number (Integer) | `stockDisponible` | ✅ |
| Descripción Corta | Text (Short) | `descripcionCorta` | ✅ |
| Descripción Completa | Rich Text | `descripcionCompleta` | ❌ |
| Prioridad Destacado | Boolean | `prioridadDestacado` | ❌ |
| Estado del Equipo | Reference (One) | `estadoEquipo` | ✅ |
| SKU | Text (Short) | `sku` | ✅ |

---

### 3.7. Modelo: Servicio Técnico

1. Ve a **Content model** → **Add content type**
2. Configura:
   - **Name**: Servicio Técnico
   - **API Identifier**: `servicioTecnico`

**Campos:**

| Campo | Tipo | Field ID | Requerido |
|-------|------|----------|-----------|
| Nombre del Servicio | Text (Short) | `nombreServicio` | ✅ |
| Slug | Slug | `slug` | ✅ |
| Categoría | Reference (One) | `categoria` | ✅ |
| Precio | Number (Integer) | `precio` | ✅ |
| Descripción | Rich Text | `descripcion` | ✅ |
| Tiempo Estimado | Text (Short) | `tiempoEstimado` | ❌ | Ej: "2-3 horas" |
| Disponible | Boolean | `disponible` | ✅ |
| Equipos Compatibles | Text (Long) | `equiposCompatibles` | ❌ | Ej: "iPhone, iPad" |

---

## Paso 4: Obtener las Credenciales de API

1. Ve a **Settings** → **API keys**
2. Click **Add API key**
3. Dale un nombre: "Pipod Astro"
4. Copia y guarda:
   - **Space ID**
   - **Content Delivery API - access token**

---

## Paso 5: Configurar el Proyecto Astro

Actualiza el archivo `.env` en `/astro-ecommerce/`:

```env
CONTENTFUL_SPACE_ID="tu_space_id_aqui"
CONTENTFUL_ACCESS_TOKEN="tu_token_aqui"
CONTENTFUL_ENVIRONMENT="master"
```

---

## Paso 6: Actualizar src/lib/contentful.ts

Reemplaza el contenido con código que lea desde Contentful:

```typescript
import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export interface Producto {
  id: string;
  nombreProducto: string;
  slug: string;
  precioVenta: number;
  precioOriginal?: number;
  descripcionCorta: string;
  descripcionCompleta?: string;
  galeriaFotos: any[];
  disponibilidad: boolean;
  stockDisponible: number;
  estadoEquipo: any;
  especificacionesTecnicas?: any;
  garantiaMeses?: number;
  sku: string;
  prioridadDestacado?: boolean;
}

export async function getProductos(contentType: string): Promise<Producto[]> {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
    });

    return entries.items.map((item: any) => ({
      id: item.sys.id,
      nombreProducto: item.fields.nombreProducto,
      slug: item.fields.slug,
      precioVenta: item.fields.precioVenta,
      precioOriginal: item.fields.precioOriginal,
      descripcionCorta: item.fields.descripcionCorta,
      descripcionCompleta: item.fields.descripcionCompleta,
      galeriaFotos: item.fields.galeriaFotos || [],
      disponibilidad: item.fields.disponibilidad,
      stockDisponible: item.fields.stockDisponible,
      estadoEquipo: item.fields.estadoEquipo,
      especificacionesTecnicas: item.fields.especificacionesTecnicas,
      garantiaMeses: item.fields.garantiaMeses,
      sku: item.fields.sku,
      prioridadDestacado: item.fields.prioridadDestacado,
    }));
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return [];
  }
}

export async function getProductoPorSlug(slug: string, contentType: string): Promise<Producto | null> {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) return null;

    const item = entries.items[0];
    return {
      id: item.sys.id,
      nombreProducto: item.fields.nombreProducto,
      slug: item.fields.slug,
      precioVenta: item.fields.precioVenta,
      precioOriginal: item.fields.precioOriginal,
      descripcionCorta: item.fields.descripcionCorta,
      descripcionCompleta: item.fields.descripcionCompleta,
      galeriaFotos: item.fields.galeriaFotos || [],
      disponibilidad: item.fields.disponibilidad,
      stockDisponible: item.fields.stockDisponible,
      estadoEquipo: item.fields.estadoEquipo,
      especificacionesTecnicas: item.fields.especificacionesTecnicas,
      garantiaMeses: item.fields.garantiaMeses,
      sku: item.fields.sku,
      prioridadDestacado: item.fields.prioridadDestacado,
    };
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return null;
  }
}
```

---

## Resumen de Mejoras Agregadas

✅ **Campos adicionales para mejor gestión:**
- `precioOriginal` - Para mostrar descuentos
- `stockDisponible` - Control de inventario
- `garantiaMeses` - Información de garantía
- `notasGarantia` - Detalles de cobertura
- `categoria` - Referencia a categorías
- `equiposCompatibles` - Para servicios

✅ **Modelo nuevo:**
- `categoria` - Centralizar categorías

✅ **Modelos de Referencia (2):**
1. `estadoProducto` - 3 entradas (Nuevo, Seminuevo, Usado)
2. `fichaTecnica` - Reutilizable para especificaciones
3. `categoria` - Reutilizable para categorización

✅ **Modelos de Productos (7):**
1. `celular` - iPhones y Smartphones
2. `portatil` - MacBooks y Laptops
3. `tableta` - iPads y Tablets
4. `computadora` - iMacs y Desktops
5. `wearable_audio` - Apple Watch, AirPods
6. `accesorio` - Cargadores, Forros, etc.
7. `servicioTecnico` - Reparaciones y servicios

---

## Próximos Pasos

1. ✅ Crear contenido de prueba en cada modelo
2. ✅ Publicar las entradas
3. ✅ Instalar `contentful` en package.json (ya está)
4. ✅ Actualizar `.env` con credenciales
5. ✅ Reemplazar `src/lib/contentful.ts` con código real
6. ✅ Crear páginas dinámicas para cada tipo de producto

---

## Notas Importantes

- **Siempre publica** las entradas después de crearlas
- Los campos de tipo **Reference** deben apuntar al modelo correcto
- El campo **Entry title** debe estar marcado en `nombreProducto` o `nombreServicio`
- Las validaciones de **Required** son críticas para mantener la integridad de datos
- El `stockDisponible` es esencial para el control de inventario
- Los precios `precioOriginal` permiten mostrar descuentos dinámicamente
