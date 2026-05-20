# Technical Design: Remediación de Seguridad

## 1. Overview
Esta remediación aborda dos puntos críticos:
1. **Limpieza de historial Git:** Eliminación definitiva de archivos sensibles (`.env.local`, `.vercel/`, `dist/`) que fueron expuestos accidentalmente.
2. **Refactorización de seguridad:** Cambio en la forma en que los endpoints de API acceden a variables de entorno para evitar posibles exposiciones en el cliente y cumplir con estándares de seguridad en ejecución.

## 2. Git History Cleanup
Utilizaremos `git-filter-repo` por ser la herramienta recomendada oficialmente por Git para reescribir la historia, siendo más rápida y segura que `git filter-branch`.

### Plan de ejecución:
1. **Backup:** Crear una copia de seguridad completa del repositorio actual.
2. **Instalación:** Asegurar que `git-filter-repo` esté instalado en la máquina de trabajo.
3. **Ejecución:**
   ```bash
   git filter-repo --path .env.local --path .vercel/ --path dist/ --invert-paths --force
   ```
   *Nota: Se debe verificar si existen otros archivos sensibles generados automáticamente.*
4. **Post-acción:**
   - Forzar push al repositorio remoto (advertir a los miembros del equipo que deben clonar de nuevo o rebasear).
   - Rotar inmediatamente todas las credenciales/secretos que estuvieron en esos archivos.

## 3. Refactorización de API Handlers
Actualmente, los handlers importan variables de entorno al cargar el módulo mediante `import.meta.env`. Se refactorizarán para acceder a `process.env` *dentro* del scope de la función, asegurando que las variables se lean solo durante el runtime de la petición.

### Archivos a modificar:
- `/src/pages/api/newsletter.ts`
- `/src/pages/api/sync-reviews.ts`
- `/src/pages/api/send-order-email.ts`
- `/src/pages/api/bold/webhook.ts`

### Patrón de implementación:
```typescript
// ANTES
const SECRET = import.meta.env.SECRET;

export const POST: APIRoute = async () => { ... }

// AHORA
export const POST: APIRoute = async () => {
  const SECRET = process.env.SECRET; // Lectura en runtime
  if (!SECRET) throw new Error('...');
  ...
}
```

## 4. Architecture Decision Records (ADR)

### ADR-001: Uso de process.env en runtime
- **Estado:** Aceptado
- **Contexto:** Astro, al compilar endpoints API en modo SSR, permite acceder a variables de entorno de forma segura durante la ejecución.
- **Consecuencia:** Mejora la seguridad al no depender de la resolución de variables en tiempo de construcción (o carga del módulo), permitiendo una configuración dinámica si es necesario en entornos de Vercel.

## 5. Testing Strategy
- **Validación de entorno:** Crear un test unitario que simule la inyección de variables de entorno y verifique que el handler las lee correctamente al ejecutar el `handler()`.
- **Mocks:** Utilizar `vi.stubEnv` (si se usa Vitest) o simplemente setear `process.env` antes de ejecutar la función en pruebas de integración para asegurar que la lógica de validación de falta de variables funciona.

## 6. Migration & Deployment Plan
1. **Local:** Aplicar cambios de código y verificar con pruebas unitarias.
2. **Commit:** Realizar el commit de la refactorización.
3. **Limpieza:** Ejecutar `git-filter-repo`.
4. **Vercel:** Actualizar las "Environment Variables" en el dashboard de Vercel con las nuevas credenciales (rotadas).
5. **Push:** Subir los cambios limpios y verificar el despliegue automático.
