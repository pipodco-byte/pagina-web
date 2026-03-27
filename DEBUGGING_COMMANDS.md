# 🛠️ Comandos Útiles - Debugging y Testing

## 📱 Console del Navegador (F12)

### Ver Carrito
```javascript
// Ver todos los items del carrito
JSON.parse(localStorage.getItem('pipod-cart'))

// Ver cantidad de items
JSON.parse(localStorage.getItem('pipod-cart')).length

// Ver total del carrito
JSON.parse(localStorage.getItem('pipod-cart')).reduce((sum, item) => sum + item.precio * item.cantidad, 0)
```

### Ver Datos de Checkout
```javascript
// Ver datos guardados del checkout
JSON.parse(localStorage.getItem('checkoutData'))

// Ver solo el monto
JSON.parse(localStorage.getItem('checkoutData')).amount

// Ver datos de envío
JSON.parse(localStorage.getItem('checkoutData')).shipping
```

### Limpiar Datos
```javascript
// Limpiar TODO
localStorage.clear()

// Limpiar solo carrito
localStorage.removeItem('pipod-cart')

// Limpiar solo checkout
localStorage.removeItem('checkoutData')
```

### Agregar Producto Manualmente
```javascript
// Agregar un producto al carrito (para testing rápido)
const cart = JSON.parse(localStorage.getItem('pipod-cart') || '[]');
cart.push({
  id: 'test-product',
  nombre: 'Producto Test',
  precio: 150000,
  cantidad: 1,
  thumb_src: '/images/test.jpg',
  slug: 'test-product'
});
localStorage.setItem('pipod-cart', JSON.stringify(cart));
```

### Simular Pago Exitoso
```javascript
// Guardar datos de checkout para simular pago
localStorage.setItem('checkoutData', JSON.stringify({
  shipping: {
    fullName: 'Test User',
    phone: '+57 312 1234567',
    address: 'Calle 123 #45-67, Apto 301',
    neighborhood: 'Usaquén',
    email: 'test@example.com'
  },
  items: [{
    id: 'test',
    nombre: 'Test Product',
    precio: 150000,
    cantidad: 1,
    thumb_src: '/images/test.jpg',
    slug: 'test'
  }],
  reference: 'PIPOD-1234567890',
  amount: 150000,
  total: 150000
}));

// Luego ir a: /checkout-success?reference=PIPOD-1234567890&status=approved
```

---

## 🔍 Validaciones en Console

### Validar Email
```javascript
// Importar función de validación
import { validateEmail } from '/src/lib/checkoutValidations.ts';

// Probar emails
validateEmail('test@example.com')        // true
validateEmail('test@')                   // false
validateEmail('test.example.com')        // false
```

### Validar Teléfono
```javascript
// Importar función de validación
import { validatePhoneColombia } from '/src/lib/checkoutValidations.ts';

// Probar teléfonos
validatePhoneColombia('+57 312 1234567') // true
validatePhoneColombia('57 312 1234567')  // true
validatePhoneColombia('312 1234567')     // true
validatePhoneColombia('3121234567')      // true
validatePhoneColombia('123456')          // false
```

### Validar Dirección
```javascript
// Importar función de validación
import { validateAddress } from '/src/lib/checkoutValidations.ts';

// Probar direcciones
validateAddress('Calle 123 #45-67, Apto 301')  // true
validateAddress('Calle 123')                   // false (menos de 10 caracteres)
```

---

## 🧪 Testing Rápido

### Test 1: Agregar Producto y Verificar Carrito
```javascript
// 1. Agregar producto
const cart = JSON.parse(localStorage.getItem('pipod-cart') || '[]');
cart.push({
  id: 'airpods-pro',
  nombre: 'AirPods Pro',
  precio: 150000,
  cantidad: 1,
  thumb_src: '/images/airpods-pro.jpg',
  slug: 'airpods-pro'
});
localStorage.setItem('pipod-cart', JSON.stringify(cart));

// 2. Verificar
JSON.parse(localStorage.getItem('pipod-cart'))
```

### Test 2: Verificar Monto en Bold
```javascript
// Simular checkout
const total = 150000;
const amount = Math.round(total); // Debe ser 150000, no 15000000

console.log('Monto para Bold:', amount); // 150000 ✓
```

### Test 3: Verificar Sanitización
```javascript
// Importar función
import { sanitizeInput } from '/src/lib/checkoutValidations.ts';

// Probar sanitización
sanitizeInput('José María')              // "José María" ✓
sanitizeInput('<script>alert(1)</script>') // "scriptalert(1)/script" ✓
sanitizeInput('   Texto   ')             // "Texto" ✓
```

---

## 📊 Monitoreo

### Ver Logs de Bold
```javascript
// En CheckoutForm.tsx se ejecuta:
console.log('Iniciando pago con Bold:', checkoutData);

// Buscar en console este log para verificar datos
```

### Ver Errores de Email
```javascript
// En /api/send-order-email.ts se ejecutan logs
// Revisar en servidor si hay errores

// En /checkout-success.astro se ejecuta:
console.log('Email enviado:', data);
console.error('Error enviando email:', err);
```

### Ver Datos Guardados
```javascript
// Verificar que localStorage se actualiza correctamente
localStorage.getItem('pipod-cart')
localStorage.getItem('checkoutData')

// Verificar que se limpia después del pago
// (debería ser null después de /checkout-success)
```

---

## 🔧 Debugging Avanzado

### Monitorear Cambios en localStorage
```javascript
// Crear observer para localStorage
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  console.log(`localStorage.setItem('${key}', ...)`, JSON.parse(value));
  originalSetItem.apply(this, arguments);
};

// Ahora cada vez que se guarde algo, verás un log
```

### Monitorear Llamadas a API
```javascript
// En DevTools → Network tab
// Filtrar por "send-order-email"
// Verificar:
// - Status: 200
// - Response: { success: true }
```

### Monitorear Errores de Validación
```javascript
// En CheckoutForm.tsx, los errores se muestran con:
alert(validation.errors.join('\n'));

// Buscar en console cualquier error
console.error()
```

---

## 📈 Performance

### Medir Tiempo de Carga
```javascript
// En console
performance.mark('checkout-start');
// ... hacer algo ...
performance.mark('checkout-end');
performance.measure('checkout', 'checkout-start', 'checkout-end');
performance.getEntriesByName('checkout')[0].duration; // ms
```

### Verificar Tamaño de localStorage
```javascript
// Calcular tamaño total
let total = 0;
for (let key in localStorage) {
  total += localStorage[key].length + key.length;
}
console.log('localStorage size:', (total / 1024).toFixed(2), 'KB');
```

---

## 🚀 Comandos de Terminal

### Iniciar Servidor de Desarrollo
```bash
npm run dev
```

### Build para Producción
```bash
npm run build
```

### Preview de Build
```bash
npm run preview
```

### Limpiar Cache
```bash
rm -rf .astro
rm -rf dist
npm run build
```

---

## 📋 Checklist de Debugging

- [ ] Verificar carrito en localStorage
- [ ] Verificar datos de checkout en localStorage
- [ ] Verificar monto correcto (pesos sin centavos)
- [ ] Verificar validaciones funcionan
- [ ] Verificar email se envía
- [ ] Verificar localStorage se limpia después del pago
- [ ] Verificar no hay errores en console
- [ ] Verificar Bold recibe datos correctos

---

## 🆘 Problemas Comunes

### Problema: Email no llega
```javascript
// 1. Verificar que Brevo API key está configurada
console.log(import.meta.env.BREVO_API_KEY) // No debe ser undefined

// 2. Verificar que el email se envía
// Buscar en console: "Email enviado:"

// 3. Revisar spam en ventas@pipod.co
```

### Problema: Carrito vacío después de pagar
```javascript
// Esto es CORRECTO - se limpia después del pago
// Verificar en /checkout-success que se ejecuta:
localStorage.removeItem('checkoutData');
```

### Problema: Monto incorrecto en Bold
```javascript
// Verificar que se usa Math.round(finalTotal)
// NO Math.round(finalTotal * 100)

const amount = Math.round(150000); // 150000 ✓
const amount = Math.round(150000 * 100); // 15000000 ✗
```

### Problema: Validación no funciona
```javascript
// Verificar que se importa correctamente
import { validateCheckoutForm } from '../../lib/checkoutValidations';

// Verificar que se llama correctamente
const validation = validateCheckoutForm(sanitizedData);
if (!validation.valid) {
  alert(validation.errors.join('\n'));
}
```

---

## 📞 Contacto para Soporte

- **Bold:** Revisar documentación de Sandbox
- **Brevo:** Revisar logs de email
- **Astro:** Revisar documentación oficial
- **Nano Stores:** Revisar documentación oficial

---

**Última actualización:** 2024
**Estado:** Listo para usar
