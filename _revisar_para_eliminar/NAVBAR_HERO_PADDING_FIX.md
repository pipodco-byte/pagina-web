# Navbar Hero Padding Fix

## Problema
El navbar fijo (`position: fixed`) con `z-index: 1000` estaba cubriendo la parte superior del contenido de los heroes en las páginas, específicamente:
- Tag de impacto
- Botón de sonido
- Otros elementos posicionados en la parte superior del hero

## Causa Raíz
Las páginas con heroes no tenían `padding-top` en el elemento `<main>`, lo que permitía que el navbar (que ocupa ~105px en desktop) se superpusiera sobre el contenido del hero.

## Solución
Agregar `padding-top: 120px` al elemento `<main>` en todas las páginas que contienen heroes (excepto `/home` que usa HeroBentoCarousel).

```html
<main style="padding-top: 120px;">
  <HeroComponent />
  <!-- resto del contenido -->
</main>
```

## Páginas Modificadas
- ✅ `/plan-retoma-apple.astro` - RetomaHero
- ✅ `/donar-fundacion-palafito.astro` - PalafitHero (ya tenía la solución)
- ✅ `/contacto-pipod.astro` - ContactHero
- ✅ `/servicio-tecnico-apple.astro` - ServiceHero
- ❌ `/index.astro` - HeroBentoCarousel (NO modificado, ya está correctamente posicionado)

## Por Qué Funciona
El `padding-top: 120px` crea espacio en la parte superior del contenido que respeta el navbar fijo, permitiendo que:
1. El navbar permanezca visible y funcional
2. El hero se vea completamente sin ser cubierto
3. Los elementos del hero (tag, botón de sonido, etc.) sean accesibles

## Valores de Referencia
- Navbar height (desktop): ~105px (35px padding × 2 + contenido)
- Padding aplicado: 120px (proporciona 15px de margen adicional)
- Responsive: El padding es consistente en todas las resoluciones

## Notas Técnicas
- El navbar tiene `position: fixed; z-index: 1000`
- Los heroes tienen `position: relative; z-index: 1`
- El padding-top no afecta el layout del hero (que usa `position: absolute`)
- La solución es agnóstica al contenido del hero
