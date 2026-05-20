# QA Checklist - Pipod Ecommerce

## 1. Factor "Centavos" con Bold ✓

**Estado:** VERIFICADO
**Hallazgo:** Estamos usando `Math.round(finalTotal * 100)` para convertir a centavos.

**Pruebas a realizar:**
- [ ] Test con $1.000 COP en Sandbox de Bold
- [ ] Test con $150.000 COP (monto típico)
- [ ] Test con $1.500.000 COP (monto alto)
- [ ] Verificar que Bold recibe: 100000 (para $1.000), 15000000 (para $150.000)

**Nota:** En Colombia, Bold generalmente espera centavos (multiplicar por 100).

---

## 2. Falla de Red - Cliente Cierra Pestaña

**Problema:** Si el cliente paga en Bold pero cierra la pestaña antes de llegar a `/checkout-success`, el email no se envía.

**Solución Actual:** 
- Email se envía desde el cliente en `/checkout-success`
- Si cierra la pestaña, el email NO se envía

**Solución Recomendada (Fase 2):**
- Implementar Webhook de Bold
- Bold notifica directamente a `/api/bold-webhook`
- Email se envía desde el servidor, no desde el cliente

**Implementación Temporal:**
```typescript
// En /api/send-order-email.ts
// Agregar retry logic si falla el envío
```

---

## 3. Validación de "Barrio" ✓

**Estado:** IMPLEMENTADO
- Campo "Barrio / Localidad" es OBLIGATORIO
- Validación en el formulario
- Se incluye en el email a ventas@pipod.co
- Se incluye en la descripción de Bold

**Barrios comunes en Bogotá para referencia:**
- Usaquén
- Chapinero
- Santa Bárbara
- Teusaquillo
- Los Mártires
- La Candelaria
- Puente Aranda
- La Sabana
- Bosa
- Kennedy
- Fontibón
- Engativá
- Suba
- Barrios Unidos
- Teusaquillo
- Mártires
- Antonio Nariño
- Tunjuelito
- Raffael Uribe Umaña
- Ciudad Bolívar
- Sumapaz

---

## 4. Flujo de Pago - Checklist Completo

### 4.1 Carrito
- [ ] Agregar producto al carrito
- [ ] Verificar que aparece en el Navbar (contador)
- [ ] Abrir drawer del carrito
- [ ] Aumentar/disminuir cantidad
- [ ] Eliminar producto
- [ ] Limpiar carrito
- [ ] Verificar persistencia en localStorage

### 4.2 Checkout
- [ ] Ir a `/checkout` desde el carrito
- [ ] Formulario carga correctamente
- [ ] Resumen sticky funciona
- [ ] Validación: Campo vacío → error
- [ ] Validación: Email inválido → error
- [ ] Validación: Teléfono inválido → error
- [ ] Llenar todos los campos correctamente
- [ ] Clic en "Continuar al Pago"

### 4.3 Bold Checkout
- [ ] Se abre el checkout de Bold
- [ ] Datos del cliente aparecen correctamente
- [ ] Monto es correcto
- [ ] Descripción incluye dirección
- [ ] Completar pago en Sandbox

### 4.4 Confirmación
- [ ] Redirige a `/checkout-success?reference=PIPOD-xxx&status=approved`
- [ ] Muestra mensaje de éxito
- [ ] Email se envía a ventas@pipod.co
- [ ] Email incluye todos los datos
- [ ] Carrito se limpia
- [ ] localStorage se limpia

### 4.5 Email (Brevo)
- [ ] Email llega a ventas@pipod.co
- [ ] Asunto: "¡NUEVO PEDIDO! PIPOD-xxx - $150.000"
- [ ] Incluye datos del cliente
- [ ] Incluye dirección de envío
- [ ] Incluye listado de productos
- [ ] Incluye total
- [ ] Formato HTML es legible

---

## 5. Edge Cases

### 5.1 Múltiples Productos
- [ ] Agregar 3+ productos diferentes
- [ ] Verificar cantidades en checkout
- [ ] Verificar total correcto
- [ ] Email muestra todos los productos

### 5.2 Productos con Precios Decimales
- [ ] Agregar producto con precio $1.500,50
- [ ] Verificar que se redondea correctamente
- [ ] Verificar en Bold
- [ ] Verificar en email

### 5.3 Caracteres Especiales
- [ ] Nombre con acentos: "José María"
- [ ] Dirección con caracteres: "Calle 123 #45-67, Apto 3-B"
- [ ] Email con punto: "jose.maria@example.com"
- [ ] Verificar en email y Bold

### 5.4 Teléfonos Diferentes
- [ ] +57 312 1234567
- [ ] 57 312 1234567
- [ ] 312 1234567
- [ ] 3121234567
- [ ] Todos deben validar correctamente

### 5.5 Barrios con Espacios
- [ ] "Los Mártires"
- [ ] "La Candelaria"
- [ ] "Barrios Unidos"
- [ ] Verificar que se guardan correctamente

---

## 6. Fase 2 - Webhook de Bold

**Implementar cuando sea posible:**

```typescript
// POST /api/bold-webhook
// Bold envía:
{
  "reference": "PIPOD-1234567890",
  "status": "approved",
  "amount": 15000000,
  "customerEmail": "cliente@example.com"
}

// Nuestro servidor:
// 1. Verifica firma de Bold
// 2. Busca checkoutData en BD (guardar en Supabase)
// 3. Envía email a ventas@pipod.co
// 4. Envía email de confirmación a cliente
// 5. Registra la venta en BD
```

---

## 7. Monitoreo Post-Live

- [ ] Revisar logs de Bold diariamente
- [ ] Revisar emails en ventas@pipod.co
- [ ] Verificar que no hay pagos sin email
- [ ] Monitorear errores en consola
- [ ] Revisar performance del checkout

---

## Notas Importantes

1. **Bold Sandbox:** Usar para todas las pruebas antes de live
2. **Brevo:** Verificar que los emails no van a spam
3. **localStorage:** Limpiar después de cada test
4. **Referencia:** Debe ser única (usamos timestamp)
5. **Barrio:** Es crítico para logística, validar bien

---

## Comandos Útiles para Testing

```bash
# Limpiar localStorage en consola del navegador
localStorage.clear()

# Ver datos guardados
JSON.parse(localStorage.getItem('pipod-cart'))
JSON.parse(localStorage.getItem('checkoutData'))

# Test de email en Brevo
# Usar cuenta de test: test@pipod.co
```

---

**Última actualización:** 2024
**Estado:** Listo para QA
