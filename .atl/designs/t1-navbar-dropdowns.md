# SDD Design: t1-navbar-dropdowns

**Change:** `t1-navbar-dropdowns`  
**Status:** Active  
**Project:** Pipod.co (Astro-Ecommerce)  
**Date:** 2026-05-22  
**Engram:** #184  
**Parent:** seo-url-hierarchy (T1)

---

## 1. Component Structure (pipodNavbar.tsx)

### Estado actual vs nuevo

```tsx
// ACTUAL (simplificado)
const navItems = [
  { label: 'Servicio Técnico', href: '/servicio-tecnico-apple' },
  { label: 'Plan Retoma', href: '/plan-retoma-apple' },
  { label: 'Tienda', href: '/tienda-pipod' },
  // ...
];

// NUEVO
const serviceMenuItems = [
  { 
    label: 'iPhone', 
    href: '/servicio-tecnico-apple-bogota/iphone',
    image: '/images/devices/iphone.jpg',
    services: ['Batería', 'Pantalla', 'Carga']
  },
  // ... 4 más
];

const tiendaMenuItems = [
  { label: 'iPhone', href: '/tienda-pipod?filter=iphone' },
  // ... 8 más
];

const blogMenuItems = [
  { label: 'Reparaciones', href: '/blog/reparaciones' },
  { label: 'Guías de Compra', href: '/blog/guias' },
  { label: 'Confianza', href: '/blog/confianza' },
];
```

---

## 2. Dropdown Component

### ServicioDropdown (Desktop)

```tsx
const ServicioDropdown = () => {
  return (
    <div className="dropdown-service">
      <div className="dropdown-grid">
        {serviceMenuItems.map((item) => (
          <a href={item.href} className="dropdown-item">
            <div className="item-image">
              <img src={item.image} alt={item.label} />
            </div>
            <div className="item-content">
              <span className="item-title">{item.label}</span>
              <span className="item-services">{item.services.join(' · ')}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
```

### Mobile Accordion (todos los dropdowns)

```tsx
const MobileAccordion = ({ items, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="accordion-item">
      <button 
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>▶</span>
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {items.map((item) => (
          <a href={item.href} className="accordion-link">
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};
```

---

## 3. CSS Structure (pipodNavbar.css)

### Desktop Dropdown

```scss
// Dropdown base
.dropdown-service,
.dropdown-tienda,
.dropdown-blog {
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  border: 0.5px solid #E5E5E7;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  padding: 20px 24px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.2s ease;
  z-index: 1001;
}

.nav-item-dropdown:hover .dropdown-service,
.nav-item-dropdown:hover .dropdown-tienda,
.nav-item-dropdown:hover .dropdown-blog {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

### Grid Layouts

```scss
// Servicio Técnico: 5 columnas
.dropdown-service .dropdown-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
}

// Tienda: 3 columnas
.dropdown-tienda .dropdown-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

// Blog: 3 columnas
.dropdown-blog .dropdown-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

### Dropdown Item

```scss
.dropdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 16px;
  border-radius: 8px;
  transition: background 0.2s ease;
  
  &:hover {
    background: #F5F5F7;
    
    .item-image img {
      transform: scale(1.02);
    }
  }
}

.item-image {
  width: 80px;
  height: 80px;
  margin-bottom: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
    transition: transform 0.2s ease;
  }
}

.item-content {
  text-align: center;
}

.item-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #000;
  margin-bottom: 4px;
}

.item-services {
  display: block;
  font-size: 12px;
  color: #666;
}
```

### Mobile Accordion

```scss
.accordion-item {
  border-bottom: 0.5px solid #E5E5E7;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #444;
  cursor: pointer;
  
  &:hover {
    background: #F5F5F7;
  }
}

.accordion-icon {
  transition: transform 0.2s ease;
  
  &.open {
    transform: rotate(90deg);
  }
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  
  &.open {
    max-height: 300px;
  }
}

.accordion-link {
  display: block;
  padding: 12px 24px 12px 32px;
  font-size: 14px;
  color: #444;
  text-decoration: none;
  
  &:hover {
    background: #F5F5F7;
    color: #0066cc;
  }
}
```

---

## 4. Images Source

Las imágenes de dispositivos se encuentran en:

| Dispositivo | Ubicación probable |
|-------------|-------------------|
| iPhone | `public/images/iphone.png` o similar |
| MacBook | `public/images/macbook.png` |
| iMac | `public/images/imac.png` |
| Apple Watch | `public/images/apple-watch.png` |

**Fallback:** Usar Bootstrap Icons si las imágenes no existen:
```tsx
// Iconos como fallback
<i className="bi bi-phone"></i>
<i className="bi bi-laptop"></i>
<i className="bi bi-display"></i>
<i className="bi bi-smartwatch"></i>
<i className="bi bi-tools"></i>
```

---

## 5. Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| ≥1024px | Desktop: Grid horizontal con imágenes |
| <1024px | Mobile: Accordion simple |

---

## 6. Existing Code to Preserve

El navbar actual tiene:
- Logo PIPOD (no cambiar)
- Nav links centrados (no cambiar)
- Botón CTA "Cotizar servicio" (no cambiar)
- Carrito con badge (no cambiar)
- Animación scroll (no cambiar)
- Mobile hamburger (extender, no reemplazar)

---

## 7. State Management

```tsx
// Nuevo estado para dropdowns
const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

// Hover handlers
const handleMouseEnter = (dropdown: string) => {
  setActiveDropdown(dropdown);
};

const handleMouseLeave = () => {
  setActiveDropdown(null);
};
```

---

## 8. Accessibility

- `aria-expanded` en accordion buttons
- `aria-haspopup="true"` en dropdown triggers
- Focus visible en keyboard navigation
- Escape key cierra dropdown

---

*Design creado: 2026-05-22*
*Para implementar ver: `.atl/tasks/t1-navbar-dropdowns.md`*