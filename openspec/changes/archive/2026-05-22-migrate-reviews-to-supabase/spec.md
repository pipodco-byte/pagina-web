# Especificación: Migración de Reseñas de Google a Supabase

## Objetivo
Migrar la gestión de reseñas desde `public/data/reviews.json` (estático, no recomendado en serverless) a una base de datos Supabase para permitir actualizaciones dinámicas en tiempo real.

## Cambios Necesarios

### 1. Base de Datos (Supabase)
Crear tabla `reviews`:
- `id` (bigint/uuid, primary key)
- `author` (text)
- `rating` (int)
- `text` (text)
- `date` (timestamp)
- `profile_photo_url` (text)
- `review_url` (text)

### 2. Backend (`/src/pages/api/sync-reviews.ts`)
- Mantener la lógica de fetch a Google Places API.
- Reemplazar la simulación de escritura en `fs` por `supabase.from('reviews').upsert()`.
- Asegurar manejo de errores y manejo de credenciales en runtime (usando `process.env`).

### 3. Frontend (`/src/components/promo/pipodGoogleReviews.jsx`)
- Reemplazar `fetch('/data/reviews.json')` por `supabase.from('reviews').select('*')`.
- Asegurar que el componente reaccione al estado de carga de datos desde Supabase.
- Eliminar dependencia del archivo local después de la migración exitosa.

## Criterios de Aceptación
- [ ] Tabla `reviews` creada en Supabase.
- [ ] `sync-reviews.ts` inserta/actualiza datos en Supabase.
- [ ] Componente `PipodGoogleReviews` carga reseñas desde Supabase.
- [ ] `reviews.json` eliminado o dejado de utilizar.
