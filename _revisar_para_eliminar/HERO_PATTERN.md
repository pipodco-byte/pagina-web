# Patrón de Hero Sections - Pipod

## Problema Resuelto
El navbar fijo cubre el contenido del hero si no se maneja correctamente el espaciado superior.

## Solución Final

### Estructura HTML
```astro
<section style="height: 70vh; display: flex; align-items: center; position: relative; overflow: hidden; margin-top: 120px;">
  <!-- Contenido del hero -->
</section>
```

### Estilos CSS
```css
section {
  margin-top: 120px;  /* Espacio para navbar en desktop */
}

@media (max-width: 768px) {
  section {
    height: auto !important;
    padding: 60px 0 !important;
    margin-top: 0 !important;  /* Sin margin en mobile */
  }
}
```

## Parámetros Clave

| Parámetro | Desktop | Mobile | Propósito |
|-----------|---------|--------|-----------|
| `height` | `70vh` | `auto` | Altura del hero |
| `margin-top` | `120px` | `0` | Espacio para navbar |
| `padding` | - | `60px 0` | Padding interno en mobile |

## Aplicación a Otros Heroes

### Paso 1: Actualizar el componente hero
```astro
<section style="height: 70vh; display: flex; align-items: center; position: relative; overflow: hidden; margin-top: 120px;">
```

### Paso 2: Agregar media query en `<style>`
```css
@media (max-width: 768px) {
  section {
    height: auto !important;
    padding: 60px 0 !important;
    margin-top: 0 !important;
  }
}
```

### Paso 3: NO agregar padding-top en el main
El main debe estar sin padding-top para que el hero maneje todo el espaciado.

## Ejemplos Implementados

✅ **ContactHero.astro** - `/contacto-pipod`
- Height: 70vh
- Margin-top: 120px (desktop), 0 (mobile)
- Resultado: Espacio superior correcto, sin ocultar navbar

## Notas Importantes

- El `margin-top: 120px` compensa la altura del navbar fijo
- En mobile, `margin-top: 0` porque el navbar no es fijo en ese breakpoint
- El `height: auto` en mobile permite que el contenido se expanda naturalmente
- No usar `padding-top` en el main cuando el hero usa este patrón

## Diferencia con Otros Patrones

| Patrón | Uso | Ventaja |
|--------|-----|---------|
| **Hero con margin-top** | Heros con altura fija | Controla espaciado superior |
| **Main con padding-top** | Páginas sin hero grande | Más simple para contenido estático |
| **Hero con height: 90vh** | Heros inmersivos | Ocupa más pantalla |

## Problema: Navbar Cubre Contenido en Mobile

### Síntoma
En mobile, el navbar fijo cubre el contenido superior (breadcrumb, títulos, etc.)

### Solución
Usar `margin-top` en lugar de `padding-top` en el contenedor principal en mobile:

```css
@media (max-width: 768px) {
  .container {
    padding: 24px 16px 24px 16px;  /* Sin padding-top */
    margin-top: 120px;              /* Usar margin-top en su lugar */
  }
}
```

### Por qué funciona
- `padding-top` es interno al contenedor, el navbar fijo sigue cubriendo
- `margin-top` empuja el contenedor completo hacia abajo, evitando la cobertura

### Ejemplo Implementado
✅ **TermsPage.astro** - `/terminos-condiciones-pipod`
- Desktop: `padding: 140px 20px 40px 20px`
- Mobile: `padding: 24px 16px 24px 16px` + `margin-top: 120px`
- Resultado: Contenido visible sin ser cubierto por navbar

