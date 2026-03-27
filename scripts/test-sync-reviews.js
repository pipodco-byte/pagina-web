#!/usr/bin/env node

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer .env.local manualmente
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');

const apiKey = envContent.match(/GOOGLE_PLACES_API_KEY=([^\n]+)/)?.[1]?.trim().replace(/"/g, '');
const placeId = envContent.match(/GOOGLE_PLACE_ID=([^\n]+)/)?.[1]?.trim().replace(/"/g, '');

console.log('🔍 Iniciando prueba de sincronización de reseñas...\n');

if (!apiKey || !placeId) {
  console.error('❌ Error: Falta GOOGLE_PLACES_API_KEY o GOOGLE_PLACE_ID en .env.local');
  process.exit(1);
}

console.log('✅ Credenciales encontradas');
console.log(`   API Key: ${apiKey.substring(0, 10)}...`);
console.log(`   Place ID: ${placeId}\n`);

const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`;

console.log('📡 Consultando Google Places API...\n');

https.get(url, (res) => {
  let data = '';
  
  res.on('data', chunk => data += chunk);
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      console.log('📊 Respuesta de Google Places API:');
      console.log(JSON.stringify(response, null, 2));
      console.log('\n');
      
      if (response.status !== 'OK') {
        console.error(`❌ Error: ${response.status}`);
        if (response.error_message) {
          console.error(`   ${response.error_message}`);
        }
        process.exit(1);
      }
      
      const { rating, user_ratings_total } = response.result;
      
      console.log('✅ Datos obtenidos:');
      console.log(`   Rating: ${rating} ⭐`);
      console.log(`   Total Reviews: ${user_ratings_total} 📝\n`);
      
      const reviewsData = {
        rating: rating ? parseFloat(rating).toFixed(1) : '5.0',
        totalReviews: user_ratings_total || 0,
        lastUpdated: new Date().toISOString(),
        comments: [
          'Datos sincronizados desde Google Places API',
          'Archivos que usan este dato:',
          '- src/components/promo/pipodGoogleReviews.jsx',
          '- src/components/SEO/LocalBusinessSchema.astro',
          '- src/components/SEO/RetomaPageSchema.astro',
          '- src/components/SEO/ServicePageSchema.astro',
          '- src/components/SEO/ContactPageSchema.astro'
        ]
      };
      
      const reviewsPath = path.join(__dirname, '..', 'public', 'data', 'reviews.json');
      
      console.log('💾 Actualizando reviews.json...');
      console.log(`   Ruta: ${reviewsPath}\n`);
      
      fs.writeFileSync(reviewsPath, JSON.stringify(reviewsData, null, 2));
      
      console.log('✅ Archivo actualizado exitosamente!\n');
      console.log('📄 Contenido de reviews.json:');
      console.log(JSON.stringify(reviewsData, null, 2));
      console.log('\n✨ Prueba completada exitosamente!');
      
    } catch (error) {
      console.error('❌ Error al procesar respuesta:', error.message);
      process.exit(1);
    }
  });
}).on('error', (error) => {
  console.error('❌ Error en la solicitud HTTP:', error.message);
  process.exit(1);
});
