# Guía de Verificación JSON-LD para Googlebot

## 1. Verificación en Network Tab (Chrome DevTools)

### Paso 1: Abrir DevTools
- Presiona `F12` o `Cmd+Option+I` (Mac)
- Ve a la pestaña **Network**

### Paso 2: Cargar la página
- Recarga la página (`Cmd+R` o `F5`)
- Busca la solicitud principal (el documento HTML)

### Paso 3: Verificar el HTML
- Haz clic en la solicitud principal
- Ve a la pestaña **Response**
- Busca `<script type="application/ld+json">`

**Deberías ver algo como:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.pipod.co/contacto-pipod",
  ...
}
</script>
```

### Paso 4: Confirmar SSR
- El script debe estar **ANTES** de cualquier script de cliente
- Debe estar en el `<head>` del documento
- No debe tener atributos `client:load` o `client:idle`

---

## 2. Verificación en Consola del Navegador

Ejecuta esto en la consola para verificar que el schema está presente:

```javascript
// Verificar que el script JSON-LD existe
const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
console.log(`Total de scripts JSON-LD encontrados: ${jsonLdScripts.length}`);

// Mostrar cada uno
jsonLdScripts.forEach((script, index) => {
  try {
    const data = JSON.parse(script.textContent);
    console.log(`Schema ${index + 1}:`, {
      type: data['@type'],
      url: data['url'] || data['mainEntityOfPage'],
      valid: true
    });
  } catch (e) {
    console.error(`Schema ${index + 1} tiene error de JSON:`, e);
  }
});
```

---

## 3. Validación con Google Rich Results Test

1. Ve a: https://search.google.com/test/rich-results
2. Ingresa la URL: `https://www.pipod.co/contacto-pipod`
3. Haz clic en **Test URL**
4. Verifica que aparezcan los tipos de schema detectados

**Deberías ver:**
- ✅ ContactPage
- ✅ LocalBusiness
- ✅ BreadcrumbList

---

## 4. Validación con Schema.org Validator

1. Ve a: https://validator.schema.org/
2. Ingresa la URL o pega el HTML
3. Verifica que no haya errores críticos

---

## 5. Verificación en Astro (Desarrollo)

### En la consola de desarrollo (npm run dev):
Deberías ver logs como:
```
[JsonLdSchema] ContactPage renderizado en SSR {
  valid: true,
  context: 'https://schema.org',
  type: 'ContactPage',
  url: 'https://www.pipod.co/contacto-pipod'
}
```

### Verificar archivo HTML generado:
```bash
# En producción (build)
npm run build

# Inspeccionar el HTML generado
cat dist/contacto-pipod/index.html | grep -A 20 "application/ld+json"
```

---

## 6. Verificación con curl (Línea de Comandos)

```bash
# Obtener el HTML y buscar JSON-LD
curl -s https://www.pipod.co/contacto-pipod | grep -A 50 'application/ld+json'

# Verificar que está en el <head>
curl -s https://www.pipod.co/contacto-pipod | grep -B 5 'application/ld+json' | head -20
```

---

## 7. Checklist de Verificación

- [ ] El script `<script type="application/ld+json">` está presente en el HTML
- [ ] El script está en el `<head>` del documento
- [ ] El JSON es válido (sin errores de sintaxis)
- [ ] El `@context` es `https://schema.org`
- [ ] El `@type` es correcto (ContactPage, WebPage, etc.)
- [ ] Las URLs son absolutas (https://www.pipod.co/...)
- [ ] Las fechas están en formato ISO 8601 (YYYY-MM-DD)
- [ ] No hay caracteres especiales sin escapar
- [ ] Google Rich Results Test no muestra errores
- [ ] Schema.org Validator no muestra errores críticos

---

## 8. Errores Comunes y Soluciones

### Error: "Script no aparece en el HTML"
**Causa:** El componente no se está renderizando en SSR
**Solución:** Verifica que no tenga `client:load` o `client:idle`

### Error: "JSON inválido"
**Causa:** Caracteres especiales sin escapar o comillas mal cerradas
**Solución:** Usa `JSON.stringify()` para sanitizar

### Error: "URLs relativas"
**Causa:** URLs que comienzan con `/` en lugar de `https://`
**Solución:** Usa URLs absolutas completas

### Error: "Fechas en formato incorrecto"
**Causa:** Fechas como "2026-02-12 10:30" en lugar de "2026-02-12"
**Solución:** Usa `toISOString().split('T')[0]` para obtener solo la fecha

---

## 9. Monitoreo Continuo

### Google Search Console
1. Ve a: https://search.google.com/search-console
2. Selecciona tu propiedad (pipod.co)
3. Ve a **Mejoras** → **Datos estructurados**
4. Verifica que los tipos de schema aparezcan sin errores

### Logs de Googlebot
- Astro renderiza en SSR por defecto
- Googlebot verá el JSON-LD en la primera solicitud
- No necesita ejecutar JavaScript para ver el schema

---

## 10. Verificación Final

Ejecuta esto en la consola para un reporte completo:

```javascript
const report = {
  jsonLdScripts: document.querySelectorAll('script[type="application/ld+json"]').length,
  schemas: [],
  errors: []
};

document.querySelectorAll('script[type="application/ld+json"]').forEach((script, i) => {
  try {
    const data = JSON.parse(script.textContent);
    report.schemas.push({
      index: i + 1,
      type: data['@type'],
      url: data['url'] || data['mainEntityOfPage'],
      hasContext: !!data['@context']
    });
  } catch (e) {
    report.errors.push({
      index: i + 1,
      error: e.message
    });
  }
});

console.table(report.schemas);
if (report.errors.length) console.table(report.errors);
console.log('Reporte completo:', report);
```

---

## Conclusión

✅ **ContactPageSchema** y **TermsPageSchema** están optimizados para:
- Renderización SSR (lado del servidor)
- Rastreo por Googlebot
- Validación de schema.org
- Debugging en desarrollo

El componente `JsonLdSchema.astro` garantiza que el JSON-LD se inyecte de forma segura y verificable.
