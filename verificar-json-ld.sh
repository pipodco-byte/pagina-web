#!/bin/bash

# Script de verificación: Confirmar que JSON-LD está en el HTML estático
# Uso: bash verificar-json-ld.sh

echo "🔍 Verificando JSON-LD en HTML estático..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar en desarrollo (npm run dev)
echo "${YELLOW}1. Verificando en desarrollo (localhost:4321)...${NC}"
echo ""

# Obtener el HTML de contacto-pipod
echo "📄 Descargando HTML de contacto-pipod..."
curl -s http://localhost:4321/contacto-pipod > /tmp/contacto-pipod.html

# Buscar application/ld+json
if grep -q "application/ld+json" /tmp/contacto-pipod.html; then
    echo -e "${GREEN}✅ Script JSON-LD encontrado en HTML${NC}"
    
    # Contar cuántos hay
    COUNT=$(grep -c "application/ld+json" /tmp/contacto-pipod.html)
    echo "   Total de scripts JSON-LD: $COUNT"
    
    # Extraer y mostrar el primero
    echo ""
    echo "📋 Contenido del primer script JSON-LD:"
    echo "---"
    grep -A 50 "application/ld+json" /tmp/contacto-pipod.html | head -60
    echo "---"
else
    echo -e "${RED}❌ Script JSON-LD NO encontrado en HTML${NC}"
    echo "   Esto significa que Astro no está inyectando el componente"
fi

echo ""
echo "${YELLOW}2. Verificando en términos-condiciones...${NC}"
echo ""

# Obtener el HTML de términos
echo "📄 Descargando HTML de términos-condiciones..."
curl -s http://localhost:4321/terminos-condiciones-pipod > /tmp/terminos.html

# Buscar application/ld+json
if grep -q "application/ld+json" /tmp/terminos.html; then
    echo -e "${GREEN}✅ Script JSON-LD encontrado en HTML${NC}"
    
    # Contar cuántos hay
    COUNT=$(grep -c "application/ld+json" /tmp/terminos.html)
    echo "   Total de scripts JSON-LD: $COUNT"
else
    echo -e "${RED}❌ Script JSON-LD NO encontrado en HTML${NC}"
fi

echo ""
echo "${YELLOW}3. Validando JSON sintaxis...${NC}"
echo ""

# Extraer JSON y validar
if grep -q "application/ld+json" /tmp/contacto-pipod.html; then
    # Extraer el JSON
    JSON=$(grep -A 100 "application/ld+json" /tmp/contacto-pipod.html | sed -n '/<script/,/<\/script>/p' | sed 's/<script[^>]*>//g' | sed 's/<\/script>//g')
    
    # Validar con jq si está disponible
    if command -v jq &> /dev/null; then
        if echo "$JSON" | jq . > /dev/null 2>&1; then
            echo -e "${GREEN}✅ JSON válido${NC}"
        else
            echo -e "${RED}❌ JSON inválido${NC}"
            echo "Error:"
            echo "$JSON" | jq . 2>&1 | head -20
        fi
    else
        echo -e "${YELLOW}⚠️  jq no instalado, no se puede validar JSON${NC}"
        echo "   Instala con: brew install jq (macOS) o apt-get install jq (Linux)"
    fi
fi

echo ""
echo "${YELLOW}4. Resumen${NC}"
echo ""
echo "Para verificar manualmente:"
echo "1. Abre: http://localhost:4321/contacto-pipod"
echo "2. Presiona: Ctrl + U (Ver código fuente)"
echo "3. Busca: application/ld+json"
echo "4. Si aparece, copia el JSON y pégalo en:"
echo "   https://search.google.com/test/rich-results"
echo ""
