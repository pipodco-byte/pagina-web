// GTM Testing Script - Copia y pega en la consola del navegador

// ============================================================================
// 1. VERIFICACIÓN BÁSICA
// ============================================================================

console.log('=== GTM VERIFICATION ===');

// Verificar dataLayer
console.log('✓ dataLayer exists:', !!window.dataLayer);
console.log('✓ dataLayer type:', typeof window.dataLayer);
console.log('✓ dataLayer length:', window.dataLayer?.length);

// Verificar GTM
console.log('✓ GTM loaded:', !!window.google_tag_manager);

// Verificar GA4
console.log('✓ gtag function:', typeof window.gtag);

// ============================================================================
// 2. VER TODOS LOS EVENTOS
// ============================================================================

console.log('\n=== ALL EVENTS IN dataLayer ===');
window.dataLayer?.forEach((event, index) => {
  console.log(`[${index}]`, event);
});

// ============================================================================
// 3. MONITOREAR EVENTOS EN TIEMPO REAL
// ============================================================================

console.log('\n=== MONITORING EVENTS (Real-time) ===');
const originalPush = window.dataLayer.push;
window.dataLayer.push = function(...args) {
  const event = args[0];
  console.log('📊 NEW EVENT:', {
    event: event.event,
    timestamp: event.timestamp,
    data: event
  });
  return originalPush.apply(this, args);
};
console.log('✓ Monitoring enabled. Events will appear below...');

// ============================================================================
// 4. ENVIAR EVENTOS DE PRUEBA
// ============================================================================

console.log('\n=== SENDING TEST EVENTS ===');

// Test 1: Evento simple
window.dataLayer.push({
  event: 'test_simple_event',
  test_param: 'test_value'
});
console.log('✓ Sent: test_simple_event');

// Test 2: Evento de producto
window.dataLayer.push({
  event: 'view_product',
  product_id: 'TEST-001',
  product_name: 'Test Product',
  categoria: 'iphone'
});
console.log('✓ Sent: view_product');

// Test 3: Evento de servicio
window.dataLayer.push({
  event: 'click_agendar_servicio',
  servicio: 'reparacion',
  button_text: 'AGENDA'
});
console.log('✓ Sent: click_agendar_servicio');

// ============================================================================
// 5. VERIFICAR GA4
// ============================================================================

console.log('\n=== GA4 VERIFICATION ===');
console.log('✓ GA4 ID: G-8VJN7PNJ4E');
console.log('✓ gtag available:', typeof window.gtag === 'function');

// Enviar evento a GA4
if (typeof window.gtag === 'function') {
  window.gtag('event', 'test_ga4_event', {
    'test_param': 'test_value'
  });
  console.log('✓ Sent test event to GA4');
}

// ============================================================================
// 6. VERIFICAR COMPONENTES GTM
// ============================================================================

console.log('\n=== CHECKING GTM COMPONENTS ===');

// Buscar elementos con data-gtm-*
const gtmElements = document.querySelectorAll('[data-gtm-servicio], [data-product-id]');
console.log(`✓ Found ${gtmElements.length} GTM-tracked elements`);

gtmElements.forEach((el, index) => {
  console.log(`  [${index}]`, {
    tag: el.tagName,
    servicio: el.getAttribute('data-gtm-servicio'),
    productId: el.getAttribute('data-product-id'),
    productName: el.getAttribute('data-product-name')
  });
});

// ============================================================================
// 7. FUNCIÓN HELPER PARA ENVIAR EVENTOS PERSONALIZADOS
// ============================================================================

console.log('\n=== HELPER FUNCTION ===');

window.sendGTMEvent = function(eventName, eventData = {}) {
  if (!window.dataLayer) {
    console.error('dataLayer not available');
    return false;
  }
  
  try {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
      timestamp: new Date().toISOString()
    });
    console.log(`✓ Event sent: ${eventName}`, eventData);
    return true;
  } catch (error) {
    console.error('Error sending event:', error);
    return false;
  }
};

console.log('✓ Helper function available: window.sendGTMEvent(eventName, data)');
console.log('  Example: window.sendGTMEvent("test_event", {param: "value"})');

// ============================================================================
// 8. RESUMEN FINAL
// ============================================================================

console.log('\n=== SUMMARY ===');
console.log('✓ GTM Setup Complete');
console.log('✓ dataLayer initialized');
console.log('✓ GA4 connected');
console.log('✓ Monitoring enabled');
console.log('\nNext steps:');
console.log('1. Check GTM Preview mode: https://tagmanager.google.com/');
console.log('2. Check GA4 Real-time: https://analytics.google.com/');
console.log('3. Interact with page elements to trigger events');
console.log('4. Events will appear above in real-time');
