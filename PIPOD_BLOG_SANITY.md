# PROYECTO: Blog Pipod → Sanity CMS (Author Template)

## Updated: 2026-05-04

---

## 📋 RESUMEN EJECUTIVO

### Objetivo
Migrar el blog de pipod.co (actualmente en Astro Markdown) a Sanity CMS con la plantilla **Author**, adaptada al design system existente de pipod.

### Estado Actual
| Componente | Estado |
|------------|--------|
| Blog route | `/pipod-blog` (activo en localhost:4321) |
| Artículos | 1 solo artículo ("Historia Pipod") |
| CMS actual | Contentful (para otros contenidos, NO blog) |
| Sanity | NO integrado - empezar desde cero |
| Design system | `_tokens.css` existe pero NO integrado en Layout.astro |

### Líneas Editoriales
1. **SERVICIO TÉCNICO APPLE** — Guías de reparación, HowTos
2. **COMPRA INTELIGENTE** — Reviews, comparativas, tips de compra
3. **EXPERTOS CERTIFICADOS** — Autoridad técnica, certificaciones, casos de éxito
4. **HISTORIA PIPOD** — Origen de la empresa (artículo existente)

### Decisión de Template
**Template elegido: Author (Blog)** — Template de blog puro, simple y escalable.

**Por qué Author:**
- Simple — Sin funcionalidades extra que no se usarán
- Curva de aprendizaje baja — Ideal para usuario no-técnico
- Escalable — Funciona con 1, 10 o 150 artículos
- Foco en contenido — Sin distracciones de product schemas

---

## 🏗️ ARQUITECTURA ACTUAL

### Archivos del Blog

| Ruta | Descripción |
|------|-------------|
| `src/pages/pipod-blog.astro` | Página principal del blog (lista) |
| `src/pages/blog/historia-pipod-bogota.astro` | Artículo "Historia Pipod" |
| `src/components/blog/BlogHeroSection.astro` | Hero con search |
| `src/components/blog/BlogFilter.jsx` | Filtro de posts (React island) |
| `src/components/blog/BlogCtaSection.astro` | CTA con WhatsApp |

### Design System (Tokens)

**Colores:**
```css
--pipod-color-white: #ffffff
--pipod-color-black: #000000
--pipod-color-near-black: #1F1F1F
--pipod-color-deep-black: #0a0a0a
--pipod-color-tech-blue: #4A90E2    /* CTA primario */
--pipod-color-deep-blue: #3A506B   /* Acento secundario */
--pipod-color-light-surface: #F5F5F7 /* Background página */
--pipod-color-border-gray: #E5E5E7  /* Bordes */
```

**Tipografía:**
```css
--pipod-font-inter: 'Inter', sans-serif
--pipod-font-pt-mono: 'PT Mono', monospace
--pipod-font-noto-sans: 'Noto Sans', sans-serif
```

**Espaciado (base 8px):**
```css
--pipod-space-xs: 4px
--pipod-space-sm: 8px
--pipod-space-md: 16px
--pipod-space-lg: 24px
--pipod-space-xl: 32px
--pipod-space-2xl: 48px
--pipod-space-3xl: 80px
```

**Sombras:**
```css
--pipod-shadow-card: 0 4px 12px rgba(0, 0, 0, 0.06)
--pipod-shadow-elevated: 0 8px 24px rgba(0, 0, 0, 0.1)
```

### Archivo de Tokens
`src/styles/_tokens.css` — 179 líneas (NO integrado en Layout.astro)

---

## 🎯 ALCANCE DEL PROYECTO

### Incluido ✅
1. Crear proyecto Sanity Studio (`pipodco-studio`)
2. Crear schema `blogPost` con campos de Author
3. Migrar artículo existente "Historia Pipod"
4. Integrar Sanity client en Astro
5. Recrear páginas `/pipod-blog` y `/pipod-blog/[slug]`
6. Adaptar componentes al design system pipod
7. Documentación para el cliente (guía de uso)

### Excluido ❌
1. Integrar `_tokens.css` en Layout.astro (pendiente por separado)
2. Migrar其他 contenidos de Contentful
3. Configurar webhook para IndexNow (ya está en seo-10)
4. Deploy de Sanity Studio (solo se despliega el blog)

---

## 📦 SCHEMA SANITY: blogPost

```typescript
// Schema fields
{
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().max(80)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200)
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Historia Pipod', value: 'HISTORIA_PIPOD' },
          { title: 'Servicio Técnico Apple', value: 'SERVICIO_TECNICO_APPLE' },
          { title: 'Compra Inteligente', value: 'COMPRA_INTELIGENTE' },
          { title: 'Expertos Certificados', value: 'EXPERTOS_CERTIFICADOS' }
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'featuredImage',
      title: 'Imagen destacada',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },           // Rich text
        { type: 'image', options: { hotspot: true } },
        {
          type: 'object',
          name: 'ctaSection',
          fields: [
            { name: 'text', type: 'string' },
            { name: 'buttonText', type: 'string' },
            { name: 'buttonLink', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
      initialValue: 'Equipo Pipod'
    },
    {
      name: 'datePublished',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'readingTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
      initialValue: 5
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'featuredImage'
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media
      }
    }
  }
}
```

---

## 🔄 MAPA DE MIGRACIÓN

### Fase 1: Setup Sanity (Día 1)

| # | Tarea | Archivos |
|---|-------|----------|
| 1.1 | Crear proyecto Sanity | Terminal: `npx sanity init` |
| 1.2 | Configurar projectId en .env | `.env.local` |
| 1.3 | Crear schema blogPost | `schemas/blogPost.ts` |
| 1.4 | Configurar desk structure | `sanity.config.ts` |
| 1.5 | Verificar Sanity Studio local | `localhost:3333` |

### Fase 2: Migrar Contenido (Día 1-2)

| # | Tarea | Detalle |
|---|-------|---------|
| 2.1 | Crear documento en Sanity | Migrar "Historia Pipod" completo |
| 2.2 | Importar imágenes | Hero image del artículo |
| 2.3 | Verificar Portable Text | Renderizado correcto |

### Fase 3: Integrar Astro (Día 2-3)

| # | Tarea | Archivos |
|---|-------|----------|
| 3.1 | Crear cliente Sanity | `src/lib/sanity.ts` |
| 3.2 | Crear queries GROQ | `src/lib/sanity.ts` |
| 3.3 | Recrear página blog | `src/pages/pipod-blog/index.astro` |
| 3.4 | Recrear artículo | `src/pages/pipod-blog/[slug].astro` |
| 3.5 | Migrar componentes | BlogHeroSection, BlogFilter, BlogCtaSection |
| 3.6 | Aplicar design tokens | CSS variables en componentes |

### Fase 4: Testing (Día 3)

| # | Tarea |
|---|-------|
| 4.1 | Probar lista de artículos |
| 4.2 | Probar artículo individual |
| 4.3 | Probar filtros por categoría |
| 4.4 | Probar búsqueda |
| 4.5 | Verificar responsive |
| 4.6 | Verificar performance |

### Fase 5: Deploy (Día 3-4)

| # | Tarea |
|---|-------|
| 5.1 | Deploy blog a Vercel |
| 5.2 | Configurar Sanity Studio (opcional, puede ser local) |
| 5.3 | Documentación para cliente |

---

## 📁 ESTRUCTURA DE ARCHIVOS (Post-Migración)

```
/
├── sanity/                          # Sanity Studio (local)
│   ├── sanity.config.ts
│   ├── schemas/
│   │   └── blogPost.ts
│   └── desk/
├── src/
│   ├── lib/
│   │   └── sanity.ts               # Cliente + queries GROQ
│   ├── pages/
│   │   └── pipod-blog/
│   │       ├── index.astro         # Lista de posts
│   │       └── [slug].astro        # Artículo individual
│   └── components/
│       └── blog/
│           ├── BlogHeroSection.astro
│           ├── BlogCard.astro      # Card para lista
│           ├── BlogFilter.jsx
│           └── BlogArticle.astro   # Article layout
└── .env.local                      # SANITY_PROJECT_ID, SANITY_DATASET
```

---

## 🖼️ DESIGN SYSTEM - APLICACIÓN EN BLOG

### Colores en Blog

| Uso | Variable CSS | Valor |
|-----|--------------|-------|
| Background | `--pipod-color-light-surface` | `#F5F5F7` |
| Text primary | `--pipod-color-near-black` | `#1F1F1F` |
| CTA buttons | `--pipod-color-tech-blue` | `#4A90E2` |
| Category badges | `--pipod-color-deep-blue` | `#3A506B` |
| Borders | `--pipod-color-border-gray` | `#E5E5E7` |

### Tipografía en Blog

| Elemento | Font | Size | Weight |
|----------|------|------|--------|
| H1 (título post) | Inter | 2.8rem | 700 |
| H2 (secciones) | Inter | 2rem | 600 |
| H3 (subsecciones) | Inter | 1.5rem | 600 |
| Body | Noto Sans | 0.95rem | 400 |
| Meta (fecha, autor) | Inter | 0.85rem | 400 |
| Category badge | PT Mono | 0.7rem | 500 |

### Espaciado en Blog

| Elemento | Spacing |
|----------|---------|
| Container | max-width: 800px (artículos), 1200px (lista) |
| Entre secciones | `--pipod-space-2xl` (48px) |
| Entre cards | `--pipod-space-lg` (24px) |
| Padding interno cards | `--pipod-space-md` (16px) |

### Sombras en Blog

| Elemento | Shadow |
|----------|--------|
| Cards | `--pipod-shadow-card` |
| Hover cards | `--pipod-shadow-elevated` |

---

## 🔗 DEPENDENCIAS

### Paquetes npm

```json
{
  "@sanity/client": "^6.x",
  "@sanity/image-url": "^1.x",
  "next-sanity": "^9.x"  // Solo si se necesita Preview
}
```

### Variables de Entorno

```bash
# .env.local
SANITY_PROJECT_ID=tu_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
```

---

## ⚠️ RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Conflicto con Contentful | BAJA | ALTA | Clarificar scope: blog = Sanity, resto = Contentful |
| Design tokens no aplicados | MEDIA | BAJA | Aplicar CSS variables manualmente en componentes |
| Imágenes no cargan | BAJA | MEDIA | Usar `@sanity/image-url` con transformations |
| Cliente no aprende Sanity | MEDIA | MEDIA | Documentación detallada + video tutorial |
| Preview de contenido | BAJA | BAJA | Usar Sanity Preview si es necesario |

---

## 📊 MÉTRICAS DE ÉXITO

| Métrica | Target |
|---------|--------|
| Tiempo de carga blog | < 2s (LCP) |
| CLS blog | < 0.1 |
| Artículos migrados | 1/1 |
| Componentes adaptados | 3/3 |
| Documentación completa | Sí |

---

## 🚀 PRÓXIMOS PASOS

### Inmediato (Día 1)
1. [ ] Crear cuenta en sanity.io (si no existe)
2. [ ] `npx sanity init` en carpeta `/sanity`
3. [ ] Configurar schema blogPost
4. [ ] Migrar artículo "Historia Pipod"

### Corto plazo (Día 2-3)
5. [ ] Crear cliente Sanity en Astro
6. [ ] Recrear página de blog (lista)
7. [ ] Recrear página de artículo
8. [ ] Aplicar design system

### Entrega (Día 4)
9. [ ] Testing completo
10. [ ] Deploy a Vercel
11. [ ] Documentación para el cliente

---

## 📚 RECURSOS

- [Sanity Docs](https://www.sanity.io/docs)
- [Sanity Schema Reference](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/portable-text)
- [Author Template Demo](https://author-blog.sanity.io)

---

## 📝 NOTAS

- **Contentful no se toca** — Este proyecto solo afecta al blog
- **Sanity Studio puede correr localmente** — No es necesario desplegarlo
- **Design tokens NO integrados aún** — Se aplicarán manualmente en componentes blog
- **1 artículo por ahora** — El sistema está listo para escalar a 150+

---

**Última actualización:** 2026-05-04
**Responsable:** SDD pipeline
**Estado:** POR INICIAR