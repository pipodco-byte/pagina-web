#!/usr/bin/env node

/**
 * Script interactivo para configurar Contentful
 * Uso: node scripts/setup-env.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function setupEnv() {
  console.log('\n🚀 Configuración de Contentful para Pipod\n');
  console.log('Este script te ayudará a configurar las credenciales de Contentful.\n');

  console.log('📋 Pasos para obtener tus credenciales:');
  console.log('1. Ve a https://app.contentful.com/');
  console.log('2. Selecciona tu espacio "Pipod"');
  console.log('3. Ve a Settings > General (para Space ID)');
  console.log('4. Ve a Settings > API keys > Content management tokens\n');

  const spaceId = await question('📌 Ingresa tu CONTENTFUL_SPACE_ID: ');
  const managementToken = await question('🔑 Ingresa tu CONTENTFUL_MANAGEMENT_TOKEN: ');

  if (!spaceId || !managementToken) {
    console.error('\n❌ Error: Ambos valores son requeridos');
    process.exit(1);
  }

  const envContent = `# Contentful Configuration
# Generado automáticamente por setup-env.js

CONTENTFUL_SPACE_ID="${spaceId}"
CONTENTFUL_MANAGEMENT_TOKEN="${managementToken}"
CONTENTFUL_ENVIRONMENT="master"
`;

  const envPath = path.join(process.cwd(), '.env.local');

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Archivo .env.local creado exitosamente');
    console.log(`📁 Ubicación: ${envPath}\n`);

    console.log('📋 Próximos pasos:');
    console.log('1. Instala la dependencia: npm install contentful-management');
    console.log('2. Ejecuta el script de setup: node scripts/setup-contentful.js\n');

    rl.close();
  } catch (error) {
    console.error('\n❌ Error al crear .env.local:', error.message);
    process.exit(1);
  }
}

setupEnv();
