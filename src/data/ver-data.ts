export const CONTENT = `
<h1>Arquitectura del Sistema Pipod Next.js</h1>

<h2>1. Estructura de Carpetas (Estilo VS Code)</h2>

<p>Esta es la arquitectura de carpetas que separa la parte pública (el tracking), la parte privada (el dashboard) y la lógica de backend (API, Supabase, Brevo).</p>

<pre><code class="language-text">pipod-nextgen/
├── src/
│   ├── app/                        # Rutas de Next.js (App Router)
│   │   ├── (dashboard)/            # Grupo de rutas privadas (requieren login)
│   │   │   ├── layout.tsx          # Menú lateral (Sidebar) y barra superior
│   │   │   ├── page.tsx            # Inicio (Métricas rápidas)
│   │   │   ├── clientes/
│   │   │   │   └── page.tsx        # Buscador global y tabla de 2,300 clientes
│   │   │   ├── ordenes/
│   │   │   │   ├── nueva/page.tsx  # Formulario de recepción y firma
│   │   │   │   └── [id]/page.tsx  # Vista detallada de una orden
│   │   │   ├── inventario/
│   │   │   │   └── page.tsx       # Stock de repuestos
│   │   │   └── finanzas/
│   │   │       └── page.tsx        # Ingresos, egresos y contabilidad
│   │   │
│   │   ├── api/                    # Backend Serverless
│   │   │   ├── brevo/route.ts      # API para disparar correos transaccionales
│   │   │   └── pdf/route.ts       # Generador de PDFs en el servidor
│   │   │
│   │   ├── track/                  # Portal público para clientes
│   │   │   └── [id]/page.tsx      # Vista sin login para ver el estado del equipo
│   │   │
│   │   ├── login/                  # Pantalla de autenticación para técnicos
│   │   │   └── page.tsx
│   │   └── layout.tsx              # Root layout
│   │
│   ├── components/                 # Componentes reutilizables de React
│   │   ├── ui/                    # Componentes de shadcn/ui (botones, inputs, modales)
│   │   ├── forms/                 # Formularios complejos (ej. ClienteForm)
│   │   ├── layout/                # Sidebar, Navbar
│   │   └── pdf/                   # Plantillas de React-PDF (@react-pdf/renderer)
│   │
│   ├── lib/                       # Lógica de negocio e integraciones
│   │   ├── supabase/
│   │   │   ├── client.ts          # Cliente de Supabase para el frontend
│   │   │   └── server.ts          # Cliente de Supabase para rutas seguras/API
│   │   ├── brevo.ts               # Funciones para hablar con la API de Brevo
│   │   └── utils.ts               # Funciones de ayuda (formatear moneda, fechas)
│   │
│   └── types/                     # Definiciones de TypeScript
│       └── database.types.ts      # Tipos exportados de PostgreSQL
│
├── public/                        # Logos de Pipod, fuentes, iconos estáticos
├── middleware.ts                  # Protege las rutas (redirecciona si no hay sesión)
├── tailwind.config.ts
└── package.json
</code></pre>

<hr>

<h2>2. Diagrama de Integración y Flujo de Datos</h2>

<p>Flujo completo de una orden, desde que entra hasta que impacta la contabilidad:</p>

<pre class="mermaid">
sequenceDiagram
    autonumber
    actor Tecnico as Técnico (Pipod)
    participant Front as Frontend (Next.js)
    participant DB as Supabase (PostgreSQL)
    participant Storage as Supabase Storage (PDF/Fotos)
    participant Brevo as Brevo API (Correos)
    actor Cliente as Cliente

    %% Fase 1: Recepción
    Tecnico->>Front: Crea "Nueva Orden" (Llena datos, sube fotos, firma)
    Front->>DB: Inserta registro en \`ordenes_servicio\`
    Front->>Storage: Sube el PDF generado y firma digital
    DB-->>Front: Confirma creación (ID Orden: 1045)
    
    %% Fase 2: Notificación Inicial
    Front->>Brevo: Dispara trigger "Notificación de Ingreso"
    Brevo->>Cliente: Envía Email con PDF adjunto y Link de Tracking (track/1045)
    
    %% Fase 3: Proceso y Tracking
    Cliente->>Front: Visita link de Tracking (Público)
    Front->>DB: Consulta estado actual
    DB-->>Front: Devuelve: "En Diagnóstico"
    
    %% Fase 4: Reparación y Contabilidad
    Tecnico->>Front: Marca Orden como "Lista y Facturada"
    Front->>DB: Actualiza estado a "Listo"
    Front->>DB: Descuenta repuesto de la tabla \`inventario\`
    Front->>DB: Inserta registro de ingreso en \`transacciones\` (Contabilidad)
    
    %% Fase 5: Notificación Final
    DB->>Brevo: Trigger automático (Webhook) por cambio de estado
    Brevo->>Cliente: Envía Email "Tu equipo está listo para recoger"
</pre>

<hr>

<h2>3. Explicación del Flujo Integrado</h2>

<ol>
<li><strong>La Entrada:</strong> Cuando haces la recepción del equipo en la ruta <code>app/(dashboard)/ordenes/nueva/page.tsx</code>, envías la información a tu base de datos en Supabase (<code>lib/supabase/client.ts</code>).</li>
<li><strong>El Archivo:</strong> Inmediatamente, la librería <code>@react-pdf/renderer</code> construye el recibo. Ese PDF se sube a Supabase Storage y se guarda la URL en la orden.</li>
<li><strong>El Correo Inicial:</strong> Next.js llama a <code>lib/brevo.ts</code> y le dice: <em>"Manda la plantilla de ingreso a este cliente y adjunta el link del PDF"</em>.</li>
<li><strong>La Consulta Pública:</strong> El cliente abre su correo, hace clic en el enlace y entra a <code>app/track/[id]/page.tsx</code>. Esta ruta lee de Supabase pero <strong>solo tiene permisos de lectura</strong> (RLS), garantizando que el cliente vea el progreso pero no pueda alterar nada.</li>
<li><strong>La Facturación/Contabilidad:</strong> Cuando el técnico marca la orden como "Entregada", ocurren tres cosas exactas en la base de datos (con una transacción SQL para que no haya errores):
<ul>
<li>Se cambia el estado de la orden.</li>
<li>Se resta un ítem (ej. "Pantalla iPhone 13") de la tabla <code>inventario</code>.</li>
<li>Se suma el valor total del servicio a la tabla <code>transacciones</code>, impactando el panel de la ruta <code>app/(dashboard)/finanzas/page.tsx</code>.</li>
</ul>
</li>
<li><strong>El Cierre:</strong> Supabase detecta el cambio a "Entregado" y le avisa automáticamente a Brevo para que dispare el correo final de retiro.</li>
</ol>

<p><em>Esta página no está indexada - solo es visible para uso interno.</em></p>
`;
