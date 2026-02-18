// GTM Events for PIPOD
// Usage: import { trackDiagnosticoGratis, trackAgendarServicio, etc } from '@/lib/gtmEvents'
// Or use the GTMTracker component or useGTM hook from '@/components/gtm'

interface GTMEvent {
  event: string;
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer: GTMEvent[];
  }
}

const trackEvent = (eventData: GTMEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      ...eventData,
      timestamp: new Date().toISOString(),
    });
  }
};

// CONVERSIÓN EVENTS
export const trackDiagnosticoGratis = (location: string) => {
  trackEvent({
    event: 'click_diagnostico_gratis',
    location: location, // 'hero', 'sticky', 'servicios'
    timestamp: new Date().toISOString(),
  });
};

export const trackAgendarServicio = (servicio: string) => {
  trackEvent({
    event: 'click_agendar_servicio',
    servicio: servicio, // 'reparacion', 'retoma', 'accesorios'
    timestamp: new Date().toISOString(),
  });
};

export const trackFormSubmit = (formType: string, data?: any) => {
  trackEvent({
    event: 'form_submit_diagnostico',
    form_type: formType, // 'diagnostico', 'contacto'
    producto: data?.producto,
    problema: data?.problema,
    timestamp: new Date().toISOString(),
  });
};

export const trackWhatsAppClick = (source: string) => {
  trackEvent({
    event: 'click_whatsapp',
    source: source, // 'cta_principal', 'sticky', 'footer'
    timestamp: new Date().toISOString(),
  });
};

// ENGAGEMENT EVENTS
export const trackViewServicio = (servicio: string, margen: string) => {
  trackEvent({
    event: 'view_servicio',
    servicio: servicio, // 'pantalla', 'bateria', 'macbook'
    margen: margen, // 'premium', 'recurrente', 'crecimiento'
    timestamp: new Date().toISOString(),
  });
};

export const trackViewPlan = (planName: string, precio: number) => {
  trackEvent({
    event: 'view_plan_suscripcion',
    plan_name: planName,
    precio: precio,
    timestamp: new Date().toISOString(),
  });
};

// PRODUCTO EVENTS
export const trackViewProduct = (productId: string, productName: string, categoria: string) => {
  trackEvent({
    event: 'view_product',
    product_id: productId,
    product_name: productName,
    categoria: categoria, // 'iphone', 'macbook', 'ipad'
    timestamp: new Date().toISOString(),
  });
};

export const trackClickProduct = (productId: string, productName: string) => {
  trackEvent({
    event: 'click_product_detail',
    product_id: productId,
    product_name: productName,
    timestamp: new Date().toISOString(),
  });
};

// NAVEGACIÓN EVENTS
export const trackNavbarClick = (item: string) => {
  trackEvent({
    event: 'click_navbar_item',
    item: item,
    timestamp: new Date().toISOString(),
  });
};

export const trackFooterClick = (link: string) => {
  trackEvent({
    event: 'click_footer_link',
    link: link,
    timestamp: new Date().toISOString(),
  });
};

export const trackPageScroll = (scrollPercentage: number) => {
  trackEvent({
    event: 'page_scroll',
    scroll_percentage: scrollPercentage,
    timestamp: new Date().toISOString(),
  });
};
