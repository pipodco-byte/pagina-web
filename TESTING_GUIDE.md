# 🧪 Guía de Testing - Paso a Paso

## Test 1: Validación de Centavos

### Objetivo
Verificar que Bold recibe el monto correcto en pesos sin centavos.

### Pasos
1. Agregar producto de $1.000 COP al carrito
2. Ir a checkout
3. Abrir DevTools (F12) → Console
4. Ejecutar: `JSON.parse(localStorage.getItem('checkoutData'))`
5. Verificar que `amount: 1000` (no 100000)
6. Completar pago en Sandbox de Bold
7. Verificar en panel de Bold que muestra $1.000 COP

### Resultado Esperado
```javascript
{
  amount: 1000,  // ✓ Correcto (pesos sin centavos)
  total: 1000
}
```

---

## Test 2: Validación de Barrio Obligatorio

### Objetivo
Verificar que el campo "Barrio" es obligatorio y valida correctamente.

### Pasos
1. Ir a `/checkout`
2. Llenar todos los campos EXCEPTO "Barrio"
3. Clic en "Continuar al Pago"
4. Verificar que aparece error: "Barrio/Localidad es requerido"
5. Llenar "Barrio" con "Usaquén"
6. Clic en "Continuar al Pago"
7. Debe proceder sin error

### Resultado Esperado
```
Error: "Barrio/Localidad es requerido"
Después de llenar: Procede al pago ✓
```

---

## Test 3: Validación de Teléfono

### Objetivo
Verificar que acepta múltiples formatos de teléfono colombiano.

### Pasos
Probar cada formato:

#### Formato 1: +57 312 1234567
1. Llenar teléfono: `+57 312 1234567`
2. Clic en "Continuar al Pago"
3. Debe proceder ✓

#### Formato 2: 57 312 1234567
1. Llenar teléfono: `57 312 1234567`
2. Clic en "Continuar al Pago"
3. Debe proceder ✓

#### Formato 3: 312 1234567
1. Llenar teléfono: `312 1234567`
2. Clic en "Continuar al Pago"
3. Debe proceder ✓

#### Formato 4: 3121234567
1. Llenar teléfono: `3121234567`
2. Clic en "Continuar al Pago"
3. Debe proceder ✓

#### Formato Inválido: 123456
1. Llenar teléfono: `123456`
2. Clic en "Continuar al Pago"
3. Debe mostrar error ✓

### Resultado Esperado
```
✓ +57 312 1234567 → Procede
✓ 57 312 1234567 → Procede
✓ 312 1234567 → Procede
✓ 3121234567 → Procede
✗ 123456 → Error
```

---

## Test 4: Email a ventas@pipod.co

### Objetivo
Verificar que el email se envía correctamente después del pago.

### Pasos
1. Agregar producto al carrito
2. Ir a checkout
3. Llenar formulario:
   - Nombre: "Test User"
   - Celular: "+57 312 1234567"
   - Dirección: "Calle 123 #45-67, Apto 301"
   - Barrio: "Usaquén"
   - Email: "test@example.com"
4. Clic en "Continuar al Pago"
5. Completar pago en Sandbox de Bold
6. Esperar a `/checkout-success`
7. Revisar email en ventas@pipod.co

### Resultado Esperado
```
Email recibido en ventas@pipod.co con:
✓ Asunto: "¡NUEVO PEDIDO! PIPOD-xxx - $150.000"
✓ Datos del cliente
✓ Dirección: "Calle 123 #45-67, Apto 301"
✓ Barrio: "Usaquén"
✓ Listado de productos
✓ Total correcto
```

---

## Test 5: Múltiples Productos

### Objetivo
Verificar que el checkout funciona con múltiples productos.

### Pasos
1. Agregar 3 productos diferentes al carrito
2. Aumentar cantidad de uno a 2
3. Ir a checkout
4. Verificar resumen muestra todos los productos
5. Verificar total es correcto
6. Completar pago
7. Verificar email incluye todos los productos

### Resultado Esperado
```
Resumen:
- Producto 1: 1x $50.000 = $50.000
- Producto 2: 2x $75.000 = $150.000
- Producto 3: 1x $25.000 = $25.000
Total: $225.000 ✓

Email incluye todos ✓
```

---

## Test 6: Caracteres Especiales

### Objetivo
Verificar que maneja correctamente acentos y caracteres especiales.

### Pasos
1. Llenar formulario con:
   - Nombre: "José María García"
   - Dirección: "Calle 123 #45-67, Apto 3-B"
   - Barrio: "Los Mártires"
   - Email: "jose.maria@example.com"
2. Clic en "Continuar al Pago"
3. Completar pago
4. Verificar email muestra caracteres correctamente

### Resultado Esperado
```
Email muestra:
✓ "José María García"
✓ "Calle 123 #45-67, Apto 3-B"
✓ "Los Mártires"
✓ "jose.maria@example.com"
```

---

## Test 7: Falla de Red (Cierra Pestaña)

### Objetivo
Verificar qué pasa si el cliente cierra la pestaña después de pagar.

### Pasos
1. Agregar producto al carrito
2. Ir a checkout
3. Llenar formulario
4. Clic en "Continuar al Pago"
5. En Bold, completar pago
6. **ANTES de que redirija**, cerrar la pestaña
7. Esperar 5 minutos
8. Revisar si email llegó a ventas@pipod.co

### Resultado Esperado (Actual)
```
❌ Email NO llega (depende del cliente)
```

### Resultado Esperado (Fase 2 con Webhook)
```
✓ Email llega (Bold notifica al servidor)
```

---

## Test 8: Persistencia de Carrito

### Objetivo
Verificar que el carrito persiste en localStorage.

### Pasos
1. Agregar producto al carrito
2. Abrir DevTools → Console
3. Ejecutar: `JSON.parse(localStorage.getItem('pipod-cart'))`
4. Cerrar navegador completamente
5. Abrir navegador nuevamente
6. Verificar que el producto sigue en el carrito

### Resultado Esperado
```javascript
// Antes de cerrar
[{
  id: "airpods-pro",
  nombre: "AirPods Pro",
  precio: 150000,
  cantidad: 1,
  thumb_src: "...",
  slug: "airpods-pro"
}]

// Después de abrir navegador
[{
  id: "airpods-pro",
  nombre: "AirPods Pro",
  precio: 150000,
  cantidad: 1,
  thumb_src: "...",
  slug: "airpods-pro"
}] ✓
```

---

## Test 9: Limpiar Carrito Después del Pago

### Objetivo
Verificar que el carrito se limpia después de un pago exitoso.

### Pasos
1. Agregar producto al carrito
2. Ir a checkout
3. Completar pago
4. En `/checkout-success`, abrir DevTools → Console
5. Ejecutar: `JSON.parse(localStorage.getItem('pipod-cart'))`
6. Ejecutar: `JSON.parse(localStorage.getItem('checkoutData'))`

### Resultado Esperado
```javascript
// pipod-cart
[] // ✓ Vacío

// checkoutData
null // ✓ Limpio
```

---

## Test 10: Validación de Email

### Objetivo
Verificar que valida correctamente emails.

### Pasos
Probar cada email:

#### Email Válido: test@example.com
1. Llenar email: `test@example.com`
2. Clic en "Continuar al Pago"
3. Debe proceder ✓

#### Email Inválido: test@
1. Llenar email: `test@`
2. Clic en "Continuar al Pago"
3. Debe mostrar error ✓

#### Email Inválido: test.example.com
1. Llenar email: `test.example.com`
2. Clic en "Continuar al Pago"
3. Debe mostrar error ✓

### Resultado Esperado
```
✓ test@example.com → Procede
✗ test@ → Error
✗ test.example.com → Error
```

---

## Checklist Final

- [ ] Test 1: Centavos ✓
- [ ] Test 2: Barrio obligatorio ✓
- [ ] Test 3: Teléfono múltiples formatos ✓
- [ ] Test 4: Email a ventas@pipod.co ✓
- [ ] Test 5: Múltiples productos ✓
- [ ] Test 6: Caracteres especiales ✓
- [ ] Test 7: Falla de red ✓
- [ ] Test 8: Persistencia carrito ✓
- [ ] Test 9: Limpiar carrito ✓
- [ ] Test 10: Validación email ✓

---

## Notas Importantes

1. **Sandbox de Bold:** Usar siempre para testing
2. **Brevo:** Revisar spam si no llega email
3. **localStorage:** Limpiar entre tests
4. **DevTools:** F12 para abrir consola
5. **Referencia:** Cada pago tiene referencia única (timestamp)

---

**Última actualización:** 2024
**Estado:** Listo para ejecutar
