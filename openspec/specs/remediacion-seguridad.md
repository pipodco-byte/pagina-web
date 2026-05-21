## SDD SPEC: Especificación de Remediación de Seguridad

### Objetivo
Definir los pasos técnicos para:
1. Eliminar archivos sensibles (.env.local, .vercel/, dist/) del historial de Git.
2. Refactorizar rutas de API para lectura de variables en runtime.

### Especificaciones técnicas
1. **Limpieza Git:**
   - Crear backup local del repo.
   - Instalar `git-filter-repo` (o usar método nativo `git filter-branch` si no hay herramientas adicionales).
   - Ejecutar filtro para borrar: `.env.local`, `.vercel/`, `dist/`, `*.mjs` (que contengan secretos).
   
2. **Refactor API Handlers:**
   - Ubicar: `/src/pages/api/newsletter.ts`, `sync-reviews.ts`, `send-order-email.ts`, `bold/webhook.ts`.
   - Cambio: Mover `import.meta.env.KEY` a dentro de la función handler usando `process.env.KEY`.

### Criterios de Aceptación
- [ ] `git log` no muestra secretos ni archivos sensibles.
- [ ] Los archivos de API solo leen variables durante la ejecución de la petición.
- [ ] Build de producción compila sin errores.
