#!/usr/bin/env node

/**
 * PIPOD - Script de Configuración Integral (Apple Pro Edition)
 * Fusiona: Estructura Original + Mejoras de Marketing y Rendimiento
 */

const contentful = require('contentful-management');
// Si usas .env.local, descomenta la siguiente línea:
// require('dotenv').config({ path: '.env.local' });

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!spaceId || !managementToken) {
  console.error('❌ Error: Falta CONTENTFUL_SPACE_ID o CONTENTFUL_MANAGEMENT_TOKEN');
  process.exit(1);
}

const client = contentful.createClient({ accessToken: managementToken });

async function createContentModels() {
  try {
    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment('master');
    console.log('✅ Conexión establecida con el espacio:', spaceId);

    // --- 1. MODELO: ESTADO DE PRODUCTO (Optimizado para Badges) ---
    console.log('📝 Configurando: Estado de Producto...');
    const estadoProductoModel = await environment.createContentTypeWithId('estadoProducto', {
      name: 'Estado de Producto',
      displayField: 'nombreEstado',
      fields: [
        { id: 'nombreEstado', name: 'Nombre (Nuevo, Seminuevo, etc)', type: 'Symbol', required: true },
        { id: 'etiquetaCorta', name: 'Etiqueta corta (Ej: "Grado A")', type: 'Symbol' },
        { id: 'descripcion', name: 'Descripción del estado', type: 'Text' }
      ],
    });
    await estadoProductoModel.publish();

    // --- 2. MODELO: FICHA TÉCNICA (Evolucionado para Apple) ---
    console.log('📝 Configurando: Ficha Técnica Apple...');
    const fichaTecnicaModel = await environment.createContentTypeWithId('fichaTecnica', {
      name: 'Ficha Técnica',
      displayField: 'nombreFicha',
      fields: [
        { id: 'nombreFicha', name: 'Nombre Identificador', type: 'Symbol', required: true },
        { id: 'procesador', name: 'Procesador', type: 'Symbol', required: true },
        { id: 'ram', name: 'Memoria RAM', type: 'Symbol' },
        { id: 'almacenamiento', name: 'Capacidad Almacenamiento', type: 'Symbol' },
        { id: 'saludBateria', name: 'Salud de Batería (%)', type: 'Integer' },
        { id: 'ciclosCarga', name: 'Ciclos de Carga (Solo Mac)', type: 'Integer' },
        { id: 'pantalla', name: 'Especificaciones de Pantalla', type: 'Symbol', required: true },
        { id: 'camaraPrincipal', name: 'Cámara Principal', type: 'Symbol' },
        { id: 'sistemaOperativo', name: 'Versión OS', type: 'Symbol', required: true }
      ],
    });
    await fichaTecnicaModel.publish();

    // --- 3. MODELO: CATEGORÍA (Con soporte Visual para Astra) ---
    console.log('📝 Configurando: Categoría...');
    const categoriaModel = await environment.createContentTypeWithId('categoria', {
      name: 'Categoría',
      displayField: 'nombre',
      fields: [
        { id: 'nombre', name: 'Nombre', type: 'Symbol', required: true },
        { id: 'slug', name: 'Slug', type: 'Symbol', required: true },
        { id: 'icono', name: 'Icono (Imagen)', type: 'Link', linkType: 'Asset' },
        { id: 'mostrarEnHome', name: '¿Destacar en Menú?', type: 'Boolean' }
      ],
    });
    await categoriaModel.publish();

    // --- 4. MODELOS DE PRODUCTOS (Loop consolidado con campos Apple) ---
    const productModels = [
      { id: 'celular', name: 'Celular' },
      { id: 'portatil', name: 'Portátil' },
      { id: 'tableta', name: 'Tableta' },
      { id: 'computadora', name: 'Computadora' },
      { id: 'wearable_audio', name: 'Wearable y Audio' }
    ];

    for (const model of productModels) {
      console.log(`📝 Configurando: ${model.name}...`);
      const pModel = await environment.createContentTypeWithId(model.id, {
        name: model.name,
        displayField: 'nombreProducto',
        fields: [
          { id: 'nombreProducto', name: 'Nombre del Producto', type: 'Symbol', required: true },
          { id: 'slug', name: 'Slug', type: 'Symbol', required: true },
          { id: 'precioVenta', name: 'Precio de Venta', type: 'Integer', required: true },
          { id: 'precioOriginal', name: 'Precio de Lista (Tachado)', type: 'Integer' },
          { id: 'galeriaFotos', name: 'Fotos', type: 'Array', items: { type: 'Link', linkType: 'Asset' }, required: true },
          { id: 'stockDisponible', name: 'Stock Disponible', type: 'Integer', required: true },
          { id: 'descripcionCorta', name: 'Descripción rápida', type: 'Symbol', required: true },
          { id: 'descripcionCompleta', name: 'Detalles del producto', type: 'RichText' },
          { id: 'prioridadDestacado', name: '¿Producto estrella?', type: 'Boolean' },
          { id: 'categoria', name: 'Categoría', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['categoria'] }], required: true },
          { id: 'estadoEquipo', name: 'Estado Físico', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['estadoProducto'] }], required: true },
          { id: 'especificacionesTecnicas', name: 'Ficha Técnica', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['fichaTecnica'] }], required: true },
          { id: 'sku', name: 'SKU / Serial', type: 'Symbol', required: true, validations: [{ unique: true }] },
          { id: 'garantiaMeses', name: 'Garantía Pipod (meses)', type: 'Integer' }
        ],
      });
      await pModel.publish();
    }

    // --- 5. MODELO: BANNERS (Marketing para la Home de Astra) ---
    console.log('📝 Configurando: Banners de Marketing...');
    const bannerModel = await environment.createContentTypeWithId('banner', {
      name: 'Banner de Inicio',
      displayField: 'titulo',
      fields: [
        { id: 'titulo', name: 'Título de Campaña', type: 'Symbol', required: true },
        { id: 'imagenDesktop', name: 'Imagen Desktop', type: 'Link', linkType: 'Asset', required: true },
        { id: 'imagenMobile', name: 'Imagen Mobile', type: 'Link', linkType: 'Asset' },
        { id: 'linkDestino', name: 'URL de destino', type: 'Symbol' },
        { id: 'activo', name: '¿Banner activo?', type: 'Boolean' }
      ],
    });
    await bannerModel.publish();

    // --- 6. MODELO: SERVICIO TÉCNICO (Reparaciones) ---
    console.log('📝 Configurando: Servicio Técnico...');
    const servicioModel = await environment.createContentTypeWithId('servicioTecnico', {
      name: 'Servicio Técnico',
      displayField: 'nombreServicio',
      fields: [
        { id: 'nombreServicio', name: 'Nombre del Servicio', type: 'Symbol', required: true },
        { id: 'slug', name: 'Slug', type: 'Symbol', required: true },
        { id: 'precio', name: 'Precio Base', type: 'Integer', required: true },
        { id: 'descripcion', name: '¿En qué consiste?', type: 'RichText', required: true },
        { id: 'tiempoEstimado', name: 'Tiempo de reparación', type: 'Symbol' }
      ],
    });
    await servicioModel.publish();

    console.log('\n🚀 ¡TODO LISTO! Pipod tiene ahora una estructura profesional.');

  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

createContentModels();