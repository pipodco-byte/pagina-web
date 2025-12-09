# Pipod E-commerce - Guía de Inicio

## Instalación

```bash
npm install
```

## Configuración de Contentful

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Edita `.env` con tus credenciales de Contentful

3. En Contentful, crea un Content Type llamado `producto` con estos campos:
   - nombre (Short text)
   - slug (Short text, unique)
   - descripcion (Long text)
   - precio (Integer)
   - sku (Short text)
   - imagenes (Media, multiple)
   - categoria (Reference)
   - enStock (Boolean)

## Desarrollo

```bash
npm run dev
```

Visita http://localhost:4321

## Ver productos de Contentful

Visita http://localhost:4321/productos

## Documentación completa

Ver SETUP.md para instrucciones detalladas
