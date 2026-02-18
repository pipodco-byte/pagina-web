// GTM Integration Guide for Astro

// ============================================================================
// 1. LAYOUT INTEGRATION - src/layouts/Layout.astro
// ============================================================================

/*
CORRECTO: Usar scripts separados, sin is:inline para GA4
- GTM script: IIFE que se ejecuta inmediatamente
- GA4 script: async, se ejecuta cuando carga
- dataLayer: inicializado por GTM automáticamente
*/

// En src/layouts/Layout.astro <head>:

---
// Script de GTM (se ejecuta inmediatamente, crea dataLayer)
<script>
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),
    dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-KT7MTVGS');
</script>

// Script de GA4 (async, se ejecuta después)
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8VJN7PNJ4E"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-8VJN7PNJ4E');
</script>

// noscript fallback
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KT7MTVGS"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
---

// ============================================================================
// 2. ASTRO ISLAND IMPLEMENTATION
// ============================================================================

/*
CORRECTO: Usar client:load para componentes que necesitan interactividad
- GTMTracker: client:load (necesita click events)
- SectionTracker: client:load (necesita IntersectionObserver)
- useGTM hook: solo funciona en componentes client:*
*/

// En src/pages/index.astro:

---
import { SectionTracker } from '../components/gtm';
import ServiceBentoDark from '../components/serviceCard';
---

// Opción 1: Envolver sección completa
<SectionTracker sectionName="servicios" client:load>
  <section class="services">
    <ServiceBentoDark 
      title="Reparación"
      link="/repair"
      servicio="reparacion"
      client:load
    />
  </section>
</SectionTracker>

// Opción 2: Usar GTMTracker para eventos específicos
import { GTMTracker } from '../components/gtm';

<GTMTracker 
  eventName="view_hero"
  triggerOn="view"
  client:load
>
  <section class="hero">
    {/* contenido */}
  </section>
</GTMTracker>

// ============================================================================
// 3. DATALAYER SAFETY - src/lib/gtmEvents.ts
// ============================================================================

interface GTMEvent {
  event: string;
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer?: GTMEvent[];
  }
}

// Función segura que verifica window y dataLayer
const trackEvent = (eventData: GTMEvent): boolean => {
  // Verificar que estamos en el navegador (no en SSR)
  if (typeof window === 'undefined') {
    console.warn('GTM: No window object available (SSR)');
    return false;
  }

  // Verificar que dataLayer existe
  if (!window.dataLayer) {
    console.warn('GTM: dataLayer not initialized');
    return false;
  }

  try {
    window.dataLayer.push({
      ...eventData,
      timestamp: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('GTM: Error pushing event', error);
    return false;
  }
};

// Eventos específicos con type-safety
export const trackDiagnosticoGratis = (location: 'hero' | 'sticky' | 'servicios'): boolean => {
  return trackEvent({
    event: 'click_diagnostico_gratis',
    location,
  });
};

export const trackAgendarServicio = (servicio: 'reparacion' | 'retoma' | 'accesorios'): boolean => {
  return trackEvent({
    event: 'click_agendar_servicio',
    servicio,
  });
};

export const trackViewProduct = (
  productId: string,
  productName: string,
  categoria: 'iphone' | 'macbook' | 'ipad'
): boolean => {
  return trackEvent({
    event: 'view_product',
    product_id: productId,
    product_name: productName,
    categoria,
  });
};

// ============================================================================
// 4. COMPONENTES REACT CON GTM - CORRECTO
// ============================================================================

// src/components/gtm/useGTM.ts
import { useCallback } from 'react';

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export const useGTM = () => {
  const track = useCallback((eventName: string, eventData: Record<string, any> = {}) => {
    if (typeof window === 'undefined') return;
    
    if (!window.dataLayer) {
      console.warn('GTM: dataLayer not available');
      return;
    }

    try {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('GTM tracking error:', error);
    }
  }, []);

  return { track };
};

// src/components/gtm/SectionTracker.tsx
import { useEffect, useRef } from 'react';
import { useGTM } from './useGTM';

interface SectionTrackerProps {
  sectionName: string;
  sectionData?: Record<string, any>;
  children: React.ReactNode;
}

export const SectionTracker: React.FC<SectionTrackerProps> = ({
  sectionName,
  sectionData = {},
  children,
}) => {
  const { track } = useGTM();
  const ref = useRef<HTMLDivElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          track(`view_${sectionName}`, sectionData);
          hasTracked.current = true;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [track, sectionName, sectionData]);

  return <div ref={ref}>{children}</div>;
};

// src/components/gtm/GTMTracker.tsx
import { useEffect, useRef } from 'react';

interface GTMTrackerProps {
  eventName: string;
  eventData?: Record<string, any>;
  triggerOn?: 'mount' | 'click' | 'view';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GTMTracker: React.FC<GTMTrackerProps> = ({
  eventName,
  eventData = {},
  triggerOn = 'mount',
  children,
  className,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const trackEvent = (data: Record<string, any>) => {
    if (typeof window === 'undefined') return;
    if (!window.dataLayer) return;

    try {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
        ...data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('GTM tracking error:', error);
    }
  };

  useEffect(() => {
    if (triggerOn === 'mount') {
      trackEvent({});
    }

    if (triggerOn === 'view' && ref.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          trackEvent({ view_type: 'intersection' });
          observer.unobserve(entry.target);
        }
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [eventName, eventData, triggerOn]);

  const handleClick = () => {
    if (triggerOn === 'click') {
      trackEvent({ interaction_type: 'click' });
    }
    onClick?.();
  };

  if (triggerOn === 'click' && children) {
    return (
      <div ref={ref} className={className} onClick={handleClick}>
        {children}
      </div>
    );
  }

  return <div ref={ref}>{children}</div>;
};

// ============================================================================
// 5. VERIFICACIÓN EN BROWSER CONSOLE
// ============================================================================

/*
Copia y pega esto en la consola del navegador para verificar:
*/

// 1. Verificar que GTM está cargado
console.log('dataLayer:', window.dataLayer);
console.log('GTM loaded:', !!window.google_tag_manager);

// 2. Ver todos los eventos enviados
window.dataLayer.forEach((event, index) => {
  console.log(`Event ${index}:`, event);
});

// 3. Enviar evento de prueba manualmente
window.dataLayer.push({
  event: 'test_event',
  test_data: 'manual test',
  timestamp: new Date().toISOString()
});

// 4. Monitorear eventos en tiempo real
const originalPush = window.dataLayer.push;
window.dataLayer.push = function(...args) {
  console.log('📊 GTM Event:', args[0]);
  return originalPush.apply(this, args);
};

// 5. Verificar GA4
console.log('GA4 config:', window.gtag);

// 6. Enviar evento a GA4 directamente
gtag('event', 'test_event', {
  'test_param': 'test_value'
});

// ============================================================================
// 6. CHECKLIST DE IMPLEMENTACIÓN
// ============================================================================

/*
✅ Layout.astro:
  - [ ] GTM script en <head> (IIFE)
  - [ ] GA4 script async en <head>
  - [ ] noscript fallback en <body>
  - [ ] Sin is:inline en GA4

✅ Componentes React:
  - [ ] useGTM importado desde '../gtm/useGTM'
  - [ ] client:load en componentes que usan GTM
  - [ ] try-catch en track() calls
  - [ ] typeof window !== 'undefined' checks

✅ Astro Pages:
  - [ ] SectionTracker con client:load
  - [ ] GTMTracker con client:load
  - [ ] Componentes React con client:load

✅ Testing:
  - [ ] dataLayer visible en console
  - [ ] Eventos aparecen en dataLayer
  - [ ] GA4 recibe eventos
  - [ ] GTM Preview mode muestra eventos
*/
