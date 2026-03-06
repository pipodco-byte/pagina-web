## Validación de Metadatos Sociales - El Palafito de Don Gu

### 1. VALIDACIÓN DE OPEN GRAPH (Facebook, LinkedIn, WhatsApp)

**Herramienta:** https://www.opengraphcheck.com/
**URL a validar:** https://www.pipod.co/donar-fundacion-palafito

**Metadatos esperados:**
```
og:type: website
og:url: https://www.pipod.co/donar-fundacion-palafito
og:title: El Palafito de Don Gu | Donar - PIPOD
og:description: Apoya al Palafito de Don Gu en Ciudad Bolívar. Escuela comunitaria de música y luthería del Pacífico colombiano. Donaciones desde COP $3,000.
og:image: https://www.pipod.co/images/palafito-don-gu.webp
```

**Qué verás en WhatsApp/Facebook:**
- Título: "El Palafito de Don Gu | Donar - PIPOD"
- Descripción: "Apoya al Palafito de Don Gu en Ciudad Bolívar..."
- Imagen: palafito-don-gu.webp (1200x630px recomendado)

---

### 2. VALIDACIÓN DE TWITTER CARD

**Herramienta:** https://cards-dev.twitter.com/validator
**URL a validar:** https://www.pipod.co/donar-fundacion-palafito

**Metadatos esperados:**
```
twitter:card: summary_large_image
twitter:url: https://www.pipod.co/donar-fundacion-palafito
twitter:title: El Palafito de Don Gu | Donar - PIPOD
twitter:description: Apoya al Palafito de Don Gu en Ciudad Bolívar...
twitter:image: https://www.pipod.co/images/palafito-don-gu.webp
```

---

### 3. VALIDACIÓN DE JSON-LD (Schema.org)

**Herramienta:** https://validator.schema.org/
**URL a validar:** https://www.pipod.co/donar-fundacion-palafito

**Qué buscar:**
- ✅ DonateAction detectado
- ✅ NGO (El Palafito de Don Gu) identificado
- ✅ ContactPoint con teléfono y email
- ✅ Ubicación: Barrio México, Ciudad Bolívar

---

### 4. VALIDACIÓN EN GOOGLE SEARCH CONSOLE

**Herramienta:** https://search.google.com/test/rich-results
**URL a validar:** https://www.pipod.co/donar-fundacion-palafito

**Qué buscar:**
- ✅ Rich Results detectados (DonateAction)
- ✅ Sin errores de validación
- ✅ Warnings mínimos

---

### 5. VALIDACIÓN MANUAL EN NAVEGADOR

**Pasos:**
1. Abre https://www.pipod.co/donar-fundacion-palafito
2. Click derecho → "Ver código fuente"
3. Busca (Ctrl+F):
   - `<meta property="og:` → Debe encontrar 5 metadatos OG
   - `<meta property="twitter:` → Debe encontrar 5 metadatos Twitter
   - `<script type="application/ld+json"` → Debe encontrar 1 script JSON-LD

---

### 6. PRUEBA DE COMPARTIDO EN REDES

**WhatsApp:**
- Copia: https://www.pipod.co/donar-fundacion-palafito
- Pega en chat
- Espera 3-5 segundos
- Debe mostrar: Imagen + Título + Descripción

**Facebook:**
- Usa: https://www.facebook.com/sharer/sharer.php?u=https://www.pipod.co/donar-fundacion-palafito
- Debe mostrar preview con imagen y descripción

**Twitter:**
- Usa: https://twitter.com/intent/tweet?url=https://www.pipod.co/donar-fundacion-palafito
- Debe mostrar card con imagen grande

---

### 7. CHECKLIST DE VALIDACIÓN

- [ ] og:image existe y es accesible (1200x630px mínimo)
- [ ] og:title tiene menos de 60 caracteres
- [ ] og:description tiene 120-160 caracteres
- [ ] twitter:card es "summary_large_image"
- [ ] JSON-LD valida sin errores
- [ ] DonateAction tiene al menos 1 EntryPoint
- [ ] ContactPoint tiene teléfono y email
- [ ] URL canónica es correcta
- [ ] No hay caracteres especiales sin escapar en JSON

---

### 8. OPTIMIZACIONES RECOMENDADAS

**Si la imagen no se ve:**
- Verifica que `/public/images/palafito-don-gu.webp` existe
- Asegúrate que sea mínimo 1200x630px
- Considera usar JPG como fallback

**Si el título se corta:**
- Máximo 60 caracteres para og:title
- Actual: "El Palafito de Don Gu | Donar - PIPOD" (38 caracteres) ✅

**Si la descripción se corta:**
- Máximo 160 caracteres para og:description
- Actual: 127 caracteres ✅

---

### 9. MONITOREO CONTINUO

Ejecuta validaciones cada vez que:
- Cambies el título o descripción
- Actualices la imagen
- Modifiques el schema JSON-LD
- Hagas cambios en MetaSocial.astro
