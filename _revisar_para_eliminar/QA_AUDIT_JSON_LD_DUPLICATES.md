# 🔍 AUDITORÍA QA - Duplicación de JSON-LD LocalBusiness

## 📋 RESUMEN EJECUTIVO

**Problema Identificado:** Google detecta 4 elementos `LocalBusiness` cuando debería haber solo 1.

**Causa Raíz:** El componente `<LocalBusinessSchema />` está siendo renderizado en el Layout base, que se hereda en TODAS las páginas del sitio.

**Impacto:** 
- ❌ Duplicación de datos estructurados
- ❌ Confusión en Google Search Console
- ❌ Posible penalización de SEO
- ❌ Rich snippets inconsistentes

---

## 🔎 ANÁLISIS DE COLISIÓN DE LAYOUTS

### 1. **Punto de Inyección Principal**

**Archivo:** `src/layouts/Layout.astro` (Línea 28)
```astro
<!-- Local Business Schema -->
<LocalBusinessSchema />
```

**Problema:** Este componente se renderiza en CADA página que usa `<Layout>`.

### 2. **Páginas que Heredan el Layout**

Todas estas páginas usan `<Layout>` y por lo tanto incluyen el schema:

| Página | Archivo | Línea |
|--------|---------|-------|
| Home | `src/pages/index.astro` | 1 |
| Landing | `src/pages/landing.astro` | 1 |
| Product | `src/pages/product.astro` | 1 |
| Servicio Técnico | `src/pages/servicio-tecnico.astro` | 1 |
| Shopping Cart | `src/pages/shopping-cart.astro` | (no verificado) |
| Tienda | `src/pages/tienda-pipod.astro` | (no verificado) |
| Plan Retoma | `src/pages/plan-retoma.astro` | (no verificado) |
| Otros | `src/pages/*.astro` | (múltiples) |

**Resultado:** 4+ instancias de `LocalBusiness` en el sitio.

---

## 🔧 AUDITORÍA DE PLUGINS

### Package.json Analysis

**Dependencias Relevantes:**
```json
{
  "@astrojs/react": "^4.2.2",
  "astro": "^5.5.5",
  "react": "^18.2.0"
}
```

**Hallazgo:** ✅ NO hay plugins de SEO automáticos (astro-seo, astro-seo-schema, etc.)

**Conclusión:** La duplicación NO viene de plugins externos, es manual.

---

## 🔍 BÚSQUEDA DE INYECCIONES EXTERNAS

### GTM y Analytics

**Archivo:** `src/layouts/Layout.astro` (Líneas 40-60)

```astro
<!-- Google Tag Manager -->
<script>
  (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-KT7MTVGS');
</script>

<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8VJN7PNJ4E"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-8VJN7PNJ4E');
</script>
```

**Hallazgo:** ✅ GTM y GA4 NO inyectan JSON-LD automáticamente.

---

## 📊 VERIFICACIÓN DE ESTRUCTURA DE HEAD

### Orden de Renderizado en `<head>`

```astro
1. Meta tags (charset, viewport, description)
2. Fonts (Google Fonts)
3. Meta generator
4. Title
5. Canonical link
6. ⚠️ <LocalBusinessSchema /> ← AQUÍ (Línea 28)
7. Bootstrap CSS
8. Bootstrap Icons
9. GTM Script
10. GA4 Script
```

**Problema:** El schema se renderiza UNA VEZ por página, pero como está en el Layout, se repite en cada página.

---

## 🎯 UBICACIÓN EXACTA DE LOS 4 BLOQUES

### Bloque 1: Home Page
- **Archivo:** `src/pages/index.astro`
- **Herencia:** `<Layout title="...">` (Línea 21)
- **Schema Inyectado:** Vía `src/layouts/Layout.astro` (Línea 28)
- **Resultado:** 1 LocalBusiness en `/`

### Bloque 2: Landing Page
- **Archivo:** `src/pages/landing.astro`
- **Herencia:** `<Layout title="Landing Page">` (Línea 9)
- **Schema Inyectado:** Vía `src/layouts/Layout.astro` (Línea 28)
- **Resultado:** 1 LocalBusiness en `/landing`

### Bloque 3: Product Page
- **Archivo:** `src/pages/product.astro`
- **Herencia:** `<Layout title="Product Page">` (Línea 8)
- **Schema Inyectado:** Vía `src/layouts/Layout.astro` (Línea 28)
- **Resultado:** 1 LocalBusiness en `/product`

### Bloque 4: Servicio Técnico
- **Archivo:** `src/pages/servicio-tecnico.astro`
- **Herencia:** `<Layout title={title}>` (Línea 24)
- **Schema Inyectado:** Vía `src/layouts/Layout.astro` (Línea 28)
- **Resultado:** 1 LocalBusiness en `/servicio-tecnico`

---

## ✅ SOLUCIÓN RECOMENDADA

### Opción 1: Renderizar Solo en Home (RECOMENDADO)

**Paso 1:** Remover `<LocalBusinessSchema />` del Layout

```astro
// src/layouts/Layout.astro - ELIMINAR LÍNEA 28
<!-- Local Business Schema -->
<LocalBusinessSchema />
```

**Paso 2:** Agregar solo en Home

```astro
// src/pages/index.astro - AGREGAR LÍNEA 21
---
import LocalBusinessSchema from '../components/SEO/LocalBusinessSchema.astro';
---

<Layout title="Pipod - Servicio Técnico Apple Especializado">
  <LocalBusinessSchema />
  <main>
    {/* contenido */}
  </main>
</Layout>
```

**Ventajas:**
- ✅ Solo 1 LocalBusiness en el sitio
- ✅ Se renderiza en la página principal
- ✅ Google lo detecta correctamente
- ✅ Otras páginas no tienen duplicación

---

### Opción 2: Renderizar Condicionalmente (ALTERNATIVA)

```astro
// src/layouts/Layout.astro
---
export interface Props {
  title: string;
  description?: string;
  includeSchema?: boolean; // Nuevo parámetro
}

const { title, description, includeSchema = false } = Astro.props;
import LocalBusinessSchema from '../components/SEO/LocalBusinessSchema.astro';
---

<head>
  {/* ... otros elementos ... */}
  {includeSchema && <LocalBusinessSchema />}
</head>
```

Luego en cada página:

```astro
// src/pages/index.astro
<Layout title="..." includeSchema={true}>
  {/* contenido */}
</Layout>

// src/pages/landing.astro
<Layout title="..." includeSchema={false}>
  {/* contenido */}
</Layout>
```

---

## 🚀 IMPLEMENTACIÓN PASO A PASO

### Paso 1: Actualizar Layout.astro

```diff
- <!-- Local Business Schema -->
- <LocalBusinessSchema />
- <!-- Bootstrap CSS -->
+ <!-- Bootstrap CSS -->
```

### Paso 2: Actualizar index.astro

```diff
---
import Layout from '../layouts/Layout.astro';
+ import LocalBusinessSchema from '../components/SEO/LocalBusinessSchema.astro';
import '../../assets/scss/astro-ecommerce.scss';
// ... otros imports
---

<Layout title="Pipod - Servicio Técnico Apple Especializado">
+ <LocalBusinessSchema />
  <main>
    <PipodNavbar client:load />
    {/* resto del contenido */}
  </main>
</Layout>
```

### Paso 3: Verificar en Google

1. Build: `npm run build`
2. Verificar `/dist/index.html` - debe tener 1 LocalBusiness
3. Verificar `/dist/landing/index.html` - NO debe tener LocalBusiness
4. Verificar `/dist/product/index.html` - NO debe tener LocalBusiness
5. Verificar `/dist/servicio-tecnico/index.html` - NO debe tener LocalBusiness

---

## 📋 CHECKLIST DE VALIDACIÓN

- [ ] Remover `<LocalBusinessSchema />` de `src/layouts/Layout.astro`
- [ ] Agregar `<LocalBusinessSchema />` a `src/pages/index.astro`
- [ ] Ejecutar `npm run build`
- [ ] Verificar que `/dist/index.html` tiene 1 LocalBusiness
- [ ] Verificar que otras páginas NO tienen LocalBusiness
- [ ] Usar Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Verificar en Google Search Console
- [ ] Monitorear cambios en 24-48 horas

---

## 🔐 NOTAS DE SEGURIDAD

- ✅ No hay plugins externos causando duplicación
- ✅ No hay inyecciones dinámicas de GTM/GA4
- ✅ El problema es puramente arquitectónico
- ✅ La solución es simple y sin riesgos

---

## 📊 IMPACTO ESPERADO

**Antes:**
- 4 LocalBusiness en el sitio
- Google confundido
- Rich snippets inconsistentes

**Después:**
- 1 LocalBusiness en home
- Google reconoce correctamente
- Rich snippets consistentes
- Mejor SEO local
