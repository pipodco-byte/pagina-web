# Colores Globales - Pipod Ecommerce

## Paleta de Colores Principal

### Colores Base
| Nombre | Código Hex | Uso |
|--------|-----------|-----|
| **Primary** | `#000000` | Color primario (Negro) |
| **Secondary** | `#1B1B1B` | Color secundario (Negro muy oscuro) |
| **Text** | `#4C4C4C` | Texto principal (Gris oscuro) |
| **Emphasis** | `#F2F2F2` | Énfasis/Highlights (Gris muy claro) |

### Colores Personalizados
| Nombre | Código Hex | Uso |
|--------|-----------|-----|
| **Custom1** | `#2E2E2E` | Gris oscuro personalizado |
| **Custom2** | `#3A506B` | Azul grisáceo (Botones, acentos) |
| **DimGrey** | `#6E6E6E` | Gris medio |
| **Platinum** | `#E0E0E0` | Gris claro (Bordes, divisores) |
| **WhiteSmoke** | `#F5F5F5` | Blanco humo (Fondos claros) |
| **Cultured** | `#F5F7F9` | Blanco cultured (Fondos muy claros) |

---

## Uso Recomendado

### Fondos
- **Oscuro**: `#000000` (Primary)
- **Oscuro Secundario**: `#1B1B1B` (Secondary)
- **Claro**: `#F5F5F5` (WhiteSmoke)
- **Muy Claro**: `#F5F7F9` (Cultured)

### Texto
- **Principal**: `#4C4C4C` (Text)
- **Secundario**: `#6E6E6E` (DimGrey)
- **Énfasis**: `#F2F2F2` (Emphasis)

### Elementos
- **Botones**: `#3A506B` (Custom2)
- **Bordes**: `#E0E0E0` (Platinum)
- **Acentos**: `#2E2E2E` (Custom1)

---

## Implementación en Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        pipod: {
          primary: '#000000',
          secondary: '#1B1B1B',
          text: '#4C4C4C',
          emphasis: '#F2F2F2',
          custom1: '#2E2E2E',
          custom2: '#3A506B',
          dimGrey: '#6E6E6E',
          platinum: '#E0E0E0',
          whiteSmoke: '#F5F5F5',
          cultured: '#F5F7F9'
        }
      }
    }
  }
}
```

---

## Contraste y Accesibilidad

### Combinaciones Recomendadas
- **Texto oscuro sobre fondo claro**: `#4C4C4C` sobre `#F5F5F5` ✅
- **Texto claro sobre fondo oscuro**: `#F5F5F5` sobre `#000000` ✅
- **Botones**: `#FFFFFF` sobre `#3A506B` ✅

---

## Notas
- Total de colores en paleta: **10**
- Esquema: Monocromático con acentos azul grisáceo
- Enfoque: Minimalista y profesional
- Accesibilidad: Buena relación de contraste

---

*Fuente: /Pipod-Ecommerce/src/styles/global-colors.json*
*Última actualización: 4 de diciembre de 2025*
