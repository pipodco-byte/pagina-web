# Script de Configuración Automática de Contentful

Este script crea automáticamente toda la estructura de modelos de contenido para Pipod en Contentful.

## Requisitos

1. Tener una cuenta en Contentful
2. Tener un espacio creado en Contentful
3. Tener Node.js instalado

## Instalación

### 1. Instalar dependencia

```bash
npm install contentful-management
```

### 2. Obtener el Management Token

1. Ve a https://app.contentful.com/
2. Selecciona tu espacio
3. Ve a **Settings** → **API keys**
4. Click en **Content management tokens**
5. Click en **Generate personal token**
6. Dale un nombre: "Pipod Setup"
7. Copia el token

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
CONTENTFUL_SPACE_ID="tu_space_id_aqui"
CONTENTFUL_MANAGEMENT_TOKEN="tu_management_token_aqui"
```

## Uso

```bash
node scripts/setup-contentful.js
```

El script creará automáticamente:

✅ **Modelos de Referencia (3):**
- `estadoProducto` - Estados: Nuevo, Seminuevo, Usado
- `fichaTecnica` - Especificaciones técnicas
- `categoria` - Categorías de productos

✅ **Modelos de Productos (5):**
- `celular` - iPhones y Smartphones
- `portatil` - MacBooks y Laptops
- `tableta` - iPads y Tablets
- `computadora` - iMacs y Desktops
- `wearable_audio` - Apple Watch, AirPods

✅ **Otros Modelos (2):**
- `accesorio` - Accesorios y periféricos
- `servicioTecnico` - Servicios de reparación

## Próximos Pasos

Después de ejecutar el script:

1. Ve a https://app.contentful.com/spaces/TU_SPACE_ID
2. Crea las 3 entradas en "Estado de Producto":
   - Nuevo
   - Seminuevo
   - Usado
3. Crea categorías en "Categoría"
4. Comienza a crear productos

## Solución de Problemas

### Error: "Falta CONTENTFUL_SPACE_ID o CONTENTFUL_MANAGEMENT_TOKEN"

Verifica que el archivo `.env.local` existe y tiene las variables correctas.

### Error: "Unauthorized"

El token de management no es válido. Genera uno nuevo en Contentful.

### Error: "Content type already exists"

Los modelos ya existen. Elimínalos manualmente en Contentful y vuelve a ejecutar el script.

## Notas

- El script publica automáticamente todos los modelos
- Los campos requeridos están marcados con `required: true`
- Los campos SKU tienen validación de unicidad
- Las referencias entre modelos están configuradas correctamente
