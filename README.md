# Pipod E-commerce

Plataforma de e-commerce construida con Astro, Contentful y arquitectura serverless.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm o pnpm
- Cuenta en Contentful

### Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Configura las variables de entorno:
```bash
cp .env.example .env
```

3. Edita `.env` con tus credenciales de Contentful:
   - `CONTENTFUL_SPACE_ID`: ID de tu espacio en Contentful
   - `CONTENTFUL_ACCESS_TOKEN`: Token de acceso de la API

### Configuración de Contentful

Crea un Content Type llamado `producto` con los siguientes campos:

- `nombre` (Short text)
- `slug` (Short text, unique)
- `descripcion` (Long text)
- `precio` (Integer)
- `sku` (Short text)
- `imagenes` (Media, multiple)
- `categoria` (Reference)
- `enStock` (Boolean)

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── layouts/         # Layouts de página
│   ├── lib/            # Utilidades y clientes API
│   └── pages/          # Rutas de la aplicación
├── public/             # Archivos estáticos
└── package.json
```

## 🛠️ Stack Tecnológico

- **Frontend**: Astro + Tailwind CSS
- **CMS**: Contentful (Headless)
- **Hosting**: Vercel/Netlify
- **Base de Datos**: Supabase (Fase 2+)
- **Pagos**: Wompi/Bold (Fase 3)

## 📝 Roadmap

- [x] Fase 1: Catálogo estático con Contentful
- [ ] Fase 2: Carrito y autenticación con Supabase
- [ ] Fase 3: Integración de pagos
- [ ] Fase 4: Panel de administración de órdenes

## 📄 Licencia

Privado - Pipod © 2024
