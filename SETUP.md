# Guía de Configuración - Pipod E-commerce

## 📋 Pasos de Instalación

### 1. Instalar Dependencias

```bash
cd astro-ecommerce
npm install
```

### 2. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
CONTENTFUL_SPACE_ID=tu_space_id
CONTENTFUL_ACCESS_TOKEN=tu_access_token
```

### 3. Configurar Contentful

#### Crear Content Type "producto"

En tu espacio de Contentful, crea un Content Type llamado `producto` con estos campos:

| Campo ID    | Nombre      | Tipo           | Validaciones          |
|-------------|-------------|----------------|-----------------------|
| nombre      | Nombre      | Short text     | Required              |
| slug        | Slug        | Short text     | Required, Unique      |
| descripcion | Descripción | Long text      | Required              |
| precio      | Precio      | Integer        | Required              |
| sku         | SKU         | Short text     | Required, Unique      |
| imagenes    | Imágenes    | Media (multiple)| -                    |
| categoria   | Categoría   | Reference      | -                     |
| enStock     | En Stock    | Boolean        | Default: true         |

#### Obtener Credenciales

1. Ve a **Settings > API keys** en Contentful
2. Crea un nuevo API key o usa uno existente
3. Copia el **Space ID** y el **Content Delivery API - access token**
4. Pégalos en tu archivo `.env`

### 4. Ejecutar el Proyecto

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321)

### 5. Agregar Productos de Prueba

En Contentful:
1. Ve a **Content**
2. Click en **Add entry** > **producto**
3. Completa los campos:
   - Nombre: "AirPods Pro 2da Gen"
   - Slug: "airpods-pro-2"
   - Descripción: "Los mejores AirPods con cancelación de ruido"
   - Precio: 1299000
   - SKU: "APP-001"
   - En Stock: ✓
4. Sube una imagen
5. Click en **Publish**

### 6. Ver los Productos

Visita: [http://localhost:4321/productos](http://localhost:4321/productos)

## 🚀 Despliegue

### Vercel

```bash
npm install -g vercel
vercel
```

Agrega las variables de entorno en el dashboard de Vercel.

### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

Agrega las variables de entorno en el dashboard de Netlify.

## 📝 Próximos Pasos

- [ ] Personalizar estilos en `/assets/scss/`
- [ ] Agregar más productos en Contentful
- [ ] Configurar categorías
- [ ] Implementar carrito (Fase 2)
- [ ] Integrar Supabase (Fase 2)
- [ ] Agregar pasarela de pagos (Fase 3)

## 🆘 Soporte

Si tienes problemas:
1. Verifica que las credenciales de Contentful sean correctas
2. Asegúrate de que el Content Type se llame exactamente "producto"
3. Verifica que los productos estén publicados en Contentful
