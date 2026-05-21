# Proposal: Automatización de Google Reviews

## Objetivo
Eliminar la dependencia del archivo estático `public/data/reviews.json` y automatizar la sincronización de reseñas de Google Places utilizando Supabase como fuente de verdad.

## Contexto
Actualmente, el sistema depende de un archivo JSON estático (`public/data/reviews.json`) para mostrar las reseñas de Google Places. Esto impide la actualización dinámica de las reseñas y causa problemas de despliegue en entornos inmutables como Vercel, donde la escritura en el sistema de archivos no está permitida.

## Alcance
1.  **Migración de Datos:** Transferir las reseñas existentes de `public/data/reviews.json` a una nueva tabla `reviews` en Supabase.
2.  **Actualización del Backend (`/api/sync-reviews.ts`):** Modificar la API para que, en lugar de intentar escribir en un archivo, inserte o actualice las reseñas en la tabla `reviews` de Supabase.
3.  **Actualización del Frontend (`src/components/promo/pipodGoogleReviews.jsx`):** Modificar el componente para que consulte las reseñas directamente desde Supabase en lugar de hacer `fetch` a `/data/reviews.json`.

## Enfoque Técnico
-   **Supabase:** Utilizar el cliente de Supabase para interactuar con la base de datos PostgreSQL.
-   **API Route:** Refactorizar `src/pages/api/sync-reviews.ts` para usar `@supabase/supabase-js`.
-   **Frontend:** Refactorizar `src/components/promo/pipodGoogleReviews.jsx` para usar el cliente de Supabase o una nueva API endpoint si es necesario para el cliente.

## Riesgos y Mitigación
-   **Migración:** Riesgo bajo de pérdida de datos. Mitigación: Copia de seguridad del JSON actual.
-   **Cambios de Código:** Riesgo medio de regresión en el componente de UI. Mitigación: Pruebas unitarias y manuales tras el cambio.

## Resultados Esperados
-   Reseñas dinámicas y actualizadas automáticamente desde Google Places.
-   Eliminación de errores de escritura en el sistema de archivos.
-   Mejora en la fiabilidad del despliegue en producción.
