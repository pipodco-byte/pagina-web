# Estructura Técnica - Endpoint /serviciotecnico

## Arquitectura de Carpetas

```
/src
├── /pages
│   └── /serviciotecnico
│       ├── index.astro (página principal)
│       ├── macbook.astro (landing MacBook)
│       ├── iphone.astro (landing iPhone)
│       └── planes.astro (planes de suscripción)
│
├── /components
│   └── /serviciotecnico
│       ├── /hero
│       │   ├── heroServicio.astro
│       │   ├── heroMacbook.astro
│       │   └── heroIphone.astro
│       │
│       ├── /segmentacion
│       │   ├── segmentoPremium.tsx (Pantalla + Board)
│       │   ├── segmentoRecurrente.tsx (Batería + Mantenimiento)
│       │   ├── segmentoCrecimiento.tsx (MacBook)
│       │   └── segmentoVolumen.tsx (iPhone Revisión)
│       │
│       ├── /servicios
│       │   ├── servicioCard.tsx
│       │   ├── servicioGrid.tsx
│       │   └── servicioComparador.tsx
│       │
│       ├── /planes
│       │   ├── planCard.tsx
│       │   ├── planComparador.tsx
│       │   └── planSuscripcion.tsx
│       │
│       ├── /formularios
│       │   ├── formularioDiagnostico.tsx
│       │   ├── formularioSegmentado.tsx
│       │   └── formularioSuscripcion.tsx
│       │
│       ├── /testimonios
│       │   ├── testimonialCard.tsx
│       │   ├── testimonialGrid.tsx
│       │   └── testimonialSegmentado.tsx
│       │
│       ├── /faq
│       │   ├── faqAccordion.tsx
│       │   ├── faqSegmentado.tsx
│       │   └── faqMacbook.tsx
│       │
│       ├── /stats
│       │   ├── statsServicio.astro
│       │   ├── statsSegmento.tsx
│       │   └── statsComparativo.tsx
│       │
│       └── /cta
│           ├── ctaPrincipal.tsx
│           ├── ctaSegmentada.tsx
│           └── ctaSticky.tsx
│
├── /data
│   └── /serviciotecnico
│       ├── servicios.json
│       ├── planes.json
│       ├── testimonios.json
│       ├── faq.json
│       ├── precios.json
│       └── estadisticas.json
│
└── /layouts
    └── layoutServicioTecnico.astro
```

---

## 1. Página Principal: `/serviciotecnico/index.astro`

```astro
---
import Layout from '../../layouts/Layout.astro';
import LayoutServicio from '../../layouts/layoutServicioTecnico.astro';
import HeroServicio from '../../components/serviciotecnico/hero/heroServicio.astro';
import StatsServicio from '../../components/serviciotecnico/stats/statsServicio.astro';
import SegmentoPremium from '../../components/serviciotecnico/segmentacion/segmentoPremium';
import SegmentoRecurrente from '../../components/serviciotecnico/segmentacion/segmentoRecurrente';
import SegmentoCrecimiento from '../../components/serviciotecnico/segmentacion/segmentoCrecimiento';
import SegmentoVolumen from '../../components/serviciotecnico/segmentacion/segmentoVolumen';
import ServicioGrid from '../../components/serviciotecnico/servicios/servicioGrid';
import PlanComparador from '../../components/serviciotecnico/planes/planComparador';
import FaqSegmentado from '../../components/serviciotecnico/faq/faqSegmentado';
import TestimonialSegmentado from '../../components/serviciotecnico/testimonios/testimonialSegmentado';
import FormularioSegmentado from '../../components/serviciotecnico/formularios/formularioSegmentado';
import CtaSticky from '../../components/serviciotecnico/cta/ctaSticky';

import { servicios, planes, testimonios, faq, estadisticas } from '../../data/serviciotecnico';
---

<Layout title="Servicio Técnico Apple - PIPOD">
  <LayoutServicio>
    <!-- 1. HERO -->
    <HeroServicio 
      headline="Reparamos Todos tus Productos Apple"
      subheadline="iPhone • MacBook • iMac • iPad • Apple Watch"
      cta="Diagnóstico Gratis"
      badge="Sin Compromiso"
    />

    <!-- 2. STATS BAR -->
    <StatsServicio 
      years={11}
      services={3100}
      success={98}
      warranty="12 meses"
    />

    <!-- 3. SEGMENTACIÓN (4 Pilares) -->
    <section class="segmentacion-container">
      <SegmentoPremium client:load />
      <SegmentoRecurrente client:load />
      <SegmentoCrecimiento client:load />
      <SegmentoVolumen client:load />
    </section>

    <!-- 4. SERVICIOS TOP (Grid) -->
    <ServicioGrid servicios={servicios} />

    <!-- 5. PLANES DE SUSCRIPCIÓN -->
    <PlanComparador planes={planes} />

    <!-- 6. PROCESO 3 PASOS -->
    <section class="proceso-container">
      <!-- Paso 1: Diagnóstico -->
      <!-- Paso 2: Presupuesto -->
      <!-- Paso 3: Reparación -->
    </section>

    <!-- 7. CASOS DE ÉXITO (Segmentado) -->
    <TestimonialSegmentado testimonios={testimonios} />

    <!-- 8. FAQ (Segmentado) -->
    <FaqSegmentado faq={faq} />

    <!-- 9. FORMULARIO SEGMENTADO -->
    <FormularioSegmentado client:load />

    <!-- 10. CTA STICKY -->
    <CtaSticky client:load />
  </LayoutServicio>
</Layout>
```

---

## 2. Estructura de Datos: `/data/serviciotecnico/servicios.json`

```json
{
  "servicios": [
    {
      "id": "pantalla-iphone",
      "nombre": "Pantalla iPhone",
      "categoria": "premium",
      "icono": "📱",
      "servicios": 549,
      "porcentaje": 35.4,
      "ingresos": 46665,
      "margen": 55,
      "ticketPromedio": 85,
      "descripcion": "Pantallas originales con garantía 12 meses",
      "tiempoExpress": "2 horas",
      "precioBase": 85,
      "precioExpress": 98,
      "garantia": "12 meses",
      "imagen": "/images/servicios/pantalla-iphone.jpg",
      "cta": "Solicitar Express Screen"
    },
    {
      "id": "bateria-recurrente",
      "nombre": "Batería (Plan Anual)",
      "categoria": "recurrente",
      "icono": "🔋",
      "servicios": 327,
      "porcentaje": 21.1,
      "ingresos": 19620,
      "margen": 50,
      "ticketPromedio": 60,
      "descripcion": "Cambio de batería con recordatorios automáticos",
      "planMensual": 70,
      "planAnual": 70,
      "descuentoAnual": 10,
      "frecuencia": "Anual",
      "imagen": "/images/servicios/bateria.jpg",
      "cta": "Suscribirse al Plan"
    },
    {
      "id": "macbook-especializacion",
      "nombre": "MacBook M1/M2/M3",
      "categoria": "crecimiento",
      "icono": "💻",
      "servicios": 712,
      "porcentaje": 22.9,
      "ingresos": 25000,
      "margen": 45,
      "ticketPromedio": 35,
      "descripcion": "Especialistas certificados en chips Apple Silicon",
      "modelos": ["M1", "M2", "M3", "M1 Pro", "M2 Pro", "M3 Pro"],
      "diagnosticoGratis": true,
      "imagen": "/images/servicios/macbook.jpg",
      "cta": "Diagnóstico Gratis"
    },
    {
      "id": "iphone-revision",
      "nombre": "Revisión Rápida iPhone",
      "categoria": "volumen",
      "icono": "📱",
      "servicios": 311,
      "porcentaje": 20.0,
      "ingresos": 7775,
      "margen": 65,
      "ticketPromedio": 25,
      "descripcion": "Revisión completa en 5 minutos",
      "tiempo": "5 minutos",
      "precio": 15,
      "imagen": "/images/servicios/revision.jpg",
      "cta": "Agendar Revisión"
    }
  ]
}
```

---

## 3. Estructura de Datos: `/data/serviciotecnico/planes.json`

```json
{
  "planes": [
    {
      "id": "plan-bateria-anual",
      "nombre": "Plan Batería Anual",
      "precio": 70,
      "frecuencia": "anual",
      "incluye": [
        "Cambio de batería",
        "Diagnóstico gratuito",
        "Recordatorios automáticos",
        "Garantía 12 meses"
      ],
      "ahorro": "10%",
      "margen": 50,
      "cta": "Suscribirse"
    },
    {
      "id": "plan-mantenimiento-trimestral",
      "nombre": "Plan Mantenimiento Trimestral",
      "precio": 150,
      "frecuencia": "trimestral",
      "incluye": [
        "Limpieza profunda",
        "Cambio de pasta térmica",
        "Diagnóstico completo",
        "Garantía 12 meses"
      ],
      "ahorro": "15%",
      "margen": 60,
      "cta": "Suscribirse"
    },
    {
      "id": "plan-mantenimiento-anual",
      "nombre": "Plan Mantenimiento Anual",
      "precio": 500,
      "frecuencia": "anual",
      "incluye": [
        "4 servicios de mantenimiento",
        "Limpieza profunda",
        "Pasta térmica premium",
        "Diagnóstico completo",
        "Garantía 12 meses",
        "Descuento 20% en otros servicios"
      ],
      "ahorro": "20%",
      "margen": 60,
      "cta": "Suscribirse"
    }
  ]
}
```

---

## 4. Componente: `segmentoPremium.tsx`

```tsx
import React from 'react';

interface SegmentoPremiumProps {
  servicios?: any[];
}

export default function SegmentoPremium({ servicios }: SegmentoPremiumProps) {
  return (
    <section className="segmento-premium">
      <div className="container">
        <h2>Servicios Premium (Alto Margen)</h2>
        
        <div className="grid-2">
          {/* Pantalla iPhone */}
          <div className="card-premium">
            <div className="header">
              <span className="icono">📱</span>
              <h3>Pantalla iPhone</h3>
            </div>
            <div className="stats">
              <p>549 servicios (35.4%)</p>
              <p className="margen">55% margen</p>
              <p className="ingresos">$46,665 USD</p>
            </div>
            <div className="cta-group">
              <button className="btn-primary">Express Screen (2h)</button>
              <button className="btn-secondary">Pantalla Premium</button>
            </div>
          </div>

          {/* Board Repair */}
          <div className="card-premium">
            <div className="header">
              <span className="icono">🔌</span>
              <h3>Reparación Board</h3>
            </div>
            <div className="stats">
              <p>87 servicios (5.6%)</p>
              <p className="margen">35% margen</p>
              <p className="ingresos">$13,050 USD</p>
            </div>
            <div className="cta-group">
              <button className="btn-primary">Diagnóstico Gratis</button>
              <button className="btn-secondary">M1/M2/M3 Especialista</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .segmento-premium {
          background: #FFFFFF;
          padding: 80px 0;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .card-premium {
          background: #F5F5F5;
          padding: 40px;
          border-radius: 24px;
          border-left: 4px solid #3A506B;
        }
        .margen {
          color: #2E7D32;
          font-weight: 700;
        }
        .ingresos {
          color: #3A506B;
          font-weight: 700;
        }
      `}</style>
    </section>
  );
}
```

---

## 5. Componente: `formularioSegmentado.tsx`

```tsx
import React, { useState } from 'react';

export default function FormularioSegmentado() {
  const [producto, setProducto] = useState('');
  const [problema, setProblema] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Enviar a WhatsApp o backend
    console.log({ producto, problema, telefono });
  };

  return (
    <section className="formulario-segmentado">
      <div className="container">
        <h2>¿Necesitas Reparación?</h2>
        
        <form onSubmit={handleSubmit} className="form-grid">
          {/* Selector de Producto */}
          <div className="form-group">
            <label>¿Qué producto tienes?</label>
            <select value={producto} onChange={(e) => setProducto(e.target.value)}>
              <option value="">Selecciona...</option>
              <option value="iphone">iPhone</option>
              <option value="macbook">MacBook</option>
              <option value="ipad">iPad</option>
              <option value="imac">iMac</option>
              <option value="watch">Apple Watch</option>
            </select>
          </div>

          {/* Selector de Problema */}
          <div className="form-group">
            <label>¿Cuál es el problema?</label>
            <select value={problema} onChange={(e) => setProblema(e.target.value)}>
              <option value="">Selecciona...</option>
              <option value="pantalla">Pantalla rota</option>
              <option value="bateria">Batería débil</option>
              <option value="calor">Sobrecalentamiento</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Teléfono */}
          <div className="form-group">
            <label>Tu teléfono</label>
            <input 
              type="tel" 
              value={telefono} 
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="+57 300 000 0000"
            />
          </div>

          {/* CTA */}
          <button type="submit" className="btn-submit">
            Agendar Diagnóstico Gratis
          </button>
        </form>
      </div>
    </section>
  );
}
```

---

## 6. Rutas Disponibles

```
/serviciotecnico
├── / (página principal - todos los servicios)
├── /macbook (landing especializada MacBook)
├── /iphone (landing especializada iPhone)
└── /planes (comparador de planes de suscripción)
```

---

## 7. Flujo de Datos

```
Usuario entra a /serviciotecnico
    ↓
Hero + Stats (confianza)
    ↓
Elige segmento (Premium/Recurrente/Crecimiento/Volumen)
    ↓
Ve servicios con números reales
    ↓
Completa formulario segmentado
    ↓
Envía a WhatsApp o backend
    ↓
Recibe confirmación + diagnóstico gratis
```

---

## 8. Componentes Reutilizables

```
✓ servicioCard.tsx (tarjeta de servicio)
✓ planCard.tsx (tarjeta de plan)
✓ testimonialCard.tsx (tarjeta de testimonio)
✓ faqAccordion.tsx (acordeón FAQ)
✓ formularioSegmentado.tsx (formulario dinámico)
✓ ctaSticky.tsx (CTA flotante)
✓ statsServicio.astro (barra de estadísticas)
```

---

## 9. Integración con Backend

```typescript
// POST /api/serviciotecnico/diagnostico
{
  producto: "macbook",
  problema: "sobrecalentamiento",
  telefono: "+57 300 000 0000",
  email: "cliente@example.com"
}

// Respuesta
{
  id: "diag-12345",
  status: "pendiente",
  mensaje: "Diagnóstico agendado para mañana",
  whatsapp: "https://wa.me/573124813094?text=..."
}
```

