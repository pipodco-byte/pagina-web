# 🔍 Verificación Crítica: JSON-LD en HTML Estático

## El Problema

Google Rich Results Test dice "no hay nada" porque el script `<script type="application/ld+json">` no está en el HTML estático que Googlebot recibe.

## La Solución: Verificación en 3 Pasos

### Paso 1: Ver el Código Fuente (NO Inspeccionar)

**IMPORTANTE**: No uses "Inspeccionar elemento" (F12). Usa "Ver código fuente".

1. Abre: `http://localhost:4321/contacto-pipod`
2. Presiona: `Ctrl + U` (Windows/Linux) o `Cmd + Option + U` (Mac)
3. Se abrirá una pestaña con el HTML plano
4. Presiona: `Ctrl + F` (buscar)
5. Escribe: `application/ld+json`

**Resultado esperado:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  ...
}
</script>
```

**Si NO aparece:**
- El componente `JsonLdSchema` no se está renderizando en SSR
- Astro está procesando el script de forma incorrecta
- Necesitamos agregar `is:inline` (ya lo hicimos)

---

### Paso 2: Verificar con curl (Línea de Comandos)

Ejecuta esto en tu terminal:

```bash
# Descargar el HTML de contacto-pipod
curl -s http://localhost:4321/contacto-pipod | grep -A 20 "application/ld+json"
```

**Resultado esperado:**
```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  ...
}
</script>
```

**Si NO aparece:**
- El servidor no está inyectando el script
- Verifica que el servidor esté corriendo: `npm run dev`

---

### Paso 3: Validar el JSON

Si el script aparece en el código fuente, copia exactamente el contenido JSON y pégalo en:

**Google Rich Results Test:**
https://search.google.com/test/rich-results

**Pasos:**
1. Haz clic en "Código"
2. Selecciona "JSON-LD"
3. Pega el JSON que copiaste
4. Haz clic en "Validar"

**Resultado esperado:**
- ✅ Sin errores
- ✅ Detecta: ContactPage, LocalBusiness, BreadcrumbList

---

## Checklist de Verificación

- [ ] El script `<script type="application/ld+json">` aparece en "Ver código fuente"
- [ ] El script está en el `<head>` del documento
- [ ] El JSON es válido (sin errores de sintaxis)
- [ ] Google Rich Results Test no muestra errores
- [ ] El `@context` es `https://schema.org`
- [ ] El `@type` es correcto (ContactPage, WebPage, etc.)

---

## Si el Script NO Aparece

### Causa 1: Astro no está inyectando en SSR

**Solución:**
```astro
// Asegúrate de que el componente está en el <head>
<head>
  <ContactPageSchema />  {/* Debe estar aquí */}
</head>
```

### Causa 2: El componente tiene `client:load`

**Problema:**
```astro
<ContactPageSchema client:load />  {/* ❌ INCORRECTO */}
```

**Solución:**
```astro
<ContactPageSchema />  {/* ✅ CORRECTO - Sin directiva client */}
```

### Causa 3: Astro está procesando el script

**Solución:**
Asegúrate de que el script tenga `is:inline`:
```astro
<script type="application/ld+json" set:html={...} is:inline>
</script>
```

---

## Verificación Automática

Ejecuta el script de verificación:

```bash
bash verificar-json-ld.sh
```

Este script:
1. Descarga el HTML de ambas páginas
2. Busca `application/ld+json`
3. Valida el JSON con `jq`
4. Muestra un resumen

---

## Resultado Final

Si todo está correcto, verás:

**En "Ver código fuente":**
```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": "https://www.pipod.co/contacto-pipod",
      ...
    }
    </script>
  </head>
  <body>
    ...
  </body>
</html>
```

**En Google Rich Results Test:**
- ✅ ContactPage
- ✅ LocalBusiness
- ✅ BreadcrumbList
- ✅ Sin errores

---

## Próximos Pasos

1. Verifica que el script aparece en "Ver código fuente"
2. Si aparece, copia el JSON y valida en Google Rich Results Test
3. Si no aparece, revisa que:
   - El componente está en el `<head>`
   - No tiene `client:load`
   - Tiene `is:inline`
4. Reconstruye: `npm run build`
5. Verifica nuevamente

¡Listo! 🚀
