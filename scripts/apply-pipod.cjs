const fs = require('fs');
const path = require('path');

const BLOG_PATH = './src/content/blog';

// 1. CONSTANTES DEFINIDAS
const T_C_WARRANTY = 'Garantía extendida específica por componente (revisar T&C).';
const T_C_DIAGNOSTICO = 'Diagnóstico especializado de 1.5 horas en laboratorio.';
const T_C_BACKUP = 'Backup obligatorio realizado por el cliente previo a la intervención.';
const T_C_ESTANQUEIDAD = 'Nota técnica sobre estanqueidad: La resistencia al agua original de fábrica puede verse comprometida tras la apertura física del dispositivo. Por seguridad, recomendamos evitar el contacto con líquidos después de cualquier intervención.';

const RULES = {
    bateria: { warranty: '6 meses de garantía técnica.', tip: 'Las baterías son piezas consumibles de alta calidad. Muestran mensaje de "batería genuina" al ser reemplazos originales Apple de segundo uso.' },
    pantalla: { warranty: '15 días de garantía técnica.', tip: 'Evita presiones extremas en el panel OLED. Un golpe en el borde puede fracturar internamente el panel.' },
    default: { warranty: '12 meses de garantía técnica.', tip: 'La calibración del True Tone es obligatoria tras cualquier cambio de componentes.' }
};

function getRule(slug) {
    if (slug.includes('bateria')) return RULES.bateria;
    if (slug.includes('pantalla')) return RULES.pantalla;
    return RULES.default;
}

// 2. EXCLUSIONES (Lista definitiva)
const EXCLUDED_SLUGS = [
    'historia-pipod-bogota', 
    'protocolo-diagnostico-pipod-bogota',
    'por-que-elegir-pipod-bogota',
    'tecnico-apple-confiable-bogota',
    'experiencia-pipod-16-anos-bogota',
    'resenas-pipod-bogota',
    'casos-exito-pipod-bogota'
];

function processFile(filePath, dryRun = true) {
    let content = fs.readFileSync(filePath, 'utf8');
    const slug = path.basename(filePath, '.md');
    
    if (EXCLUDED_SLUGS.includes(slug)) {
        console.log(`Skipping: ${slug}`);
        return;
    }

    const rule = getRule(slug);
    console.log(`\n--- ${dryRun ? 'Dry-Run' : 'Aplicando'}: ${slug} ---`);

    // Inyectar bloques
    const trustNugget = `\n\n### 🛡️ Seguridad Pipod (Protocolo de Garantía)\n- **Garantía:** ${rule.warranty}\n- **Seguridad:** ${T_C_BACKUP}\n- **Estanqueidad:** ${T_C_ESTANQUEIDAD}\n- **Proceso:** ${T_C_DIAGNOSTICO}\n`;
    const expertTip = `\n\n### 🤖 Pipod Expert Tip\n${rule.tip}\n`;

    if (!content.includes('Seguridad Pipod')) content += trustNugget;
    if (!content.includes('Pipod Expert Tip')) content += expertTip;

    if (!dryRun) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Archivo actualizado.');
    } else {
        console.log('Cambios simulados.');
    }
}

// Ejecutar sobre todo el directorio
const files = fs.readdirSync(BLOG_PATH).filter(f => f.endsWith('.md'));
files.forEach(f => processFile(path.join(BLOG_PATH, f), true)); // dryRun = true por seguridad
