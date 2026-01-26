src/components/service/ServiceHero.astro

Estrategia: Conversión inmediata + Transparencia de Meta.

Fragmento de código
---
// Regla: Nombres sin espacios, Estilo Píldora, Tipografía Inter.
---
<div class="q1-banner">
  <div class="container d-flex justify-content-center align-items-center gap-3">
    <span class="mono-text">🎯 Q1 2026: <strong>MACBOOK SPECIALIST</strong></span>
    <a href="https://wa.me/573124813094" class="btn-pill-light py-1 px-3">Agendar Ahora</a>
  </div>
</div>

<section class="hero-section text-center">
  <div class="container">
    <div class="tech-tag mb-4">[ META 2026: 165 SERVICIOS • PROGRESO: 58% ]</div>
    <h1 class="display-2 fw-bold mb-4">Especialistas Apple.<br/><span class="text-blue">Bogotá, desde 2014.</span></h1>
    <p class="lead mb-5 mx-auto" style="max-width: 650px;">
      Diagnóstico express en 30 min. Pantallas, baterías y reparaciones de placa con 12 meses de garantía.
    </p>
    <div class="d-flex justify-content-center gap-3">
      <a href="#booking" class="btn-pill-dark">Agendar Diagnóstico Gratis</a>
      <a href="#prices" class="btn-pill-outline">Ver Lista de Precios</a>
    </div>
  </div>
</section>

<style>
  .q1-banner { background: #3A506B; color: white; padding: 10px 0; font-size: 0.85rem; }
  .hero-section { padding: 100px 0 60px; background: #fff; }
  .tech-tag { font-family: 'PT Mono', monospace; font-size: 0.7rem; color: #666; letter-spacing: 2px; }
  .text-blue { color: #3A506B; }
  .mono-text { font-family: 'PT Mono', monospace; }
  
  .btn-pill-dark { background: #000; color: #fff; padding: 14px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; }
  .btn-pill-outline { border: 1.5px solid #000; color: #000; padding: 14px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; }
  .btn-pill-light { background: #fff; color: #3A506B; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 0.75rem; }
</style>
2. src/components/service/ServiceStats.astro

Estructura Gema: 1440px x 119px.

Fragmento de código
<section class="gema-stats-bar">
  <div class="gema-wrapper">
    <div class="stat-node">
      <span class="val">11 AÑOS</span>
      <span class="lab">TRAYECTORIA</span>
    </div>
    <div class="stat-node">
      <span class="val">+30%</span>
      <span class="lab">META CRECIMIENTO</span>
    </div>
    <div class="stat-node">
      <span class="val">127→165</span>
      <span class="lab">KPI RECUPERACIÓN</span>
    </div>
    <div class="stat-node">
      <span class="val text-blue">24H</span>
      <span class="lab">REPARACIÓN MAC</span>
    </div>
  </div>
</section>

<style>
  .gema-stats-bar { width: 100%; background: #000; height: 119px; display: flex; align-items: center; justify-content: center; }
  .gema-wrapper { width: 100%; max-width: 1440px; padding: 0 80px; display: flex; justify-content: space-between; }
  .stat-node { display: flex; flex-direction: column; }
  .val { color: #fff; font-size: 1.4rem; font-weight: 800; font-family: 'Inter', sans-serif; }
  .lab { color: rgba(255,255,255,0.5); font-size: 0.65rem; font-family: 'PT Mono', monospace; margin-top: 4px; }
  .text-blue { color: #3A506B !important; }
</style>

3. src/components/service/DeviceBento.astro

Grid de dispositivos con radios de 28px.

Fragmento de código
<section id="prices" class="py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-md-8">
        <div class="bento-card bg-light p-5 h-100">
          <span class="badge bg-dark rounded-pill mb-3">LO MÁS SOLICITADO</span>
          <h3 class="display-5 fw-bold">iPhone Specialist</h3>
          <p class="mb-4 opacity-75">Cambio de batería y pantallas en 2 horas. Repuestos con certificación de calidad AA+.</p>
          <div class="d-flex gap-4">
             <div><small class="d-block mono">BATERÍA</small><strong>Desde $149k</strong></div>
             <div><small class="d-block mono">PANTALLA</small><strong>Desde $190k</strong></div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="bento-card bg-blue text-white p-5 h-100">
          <h3 class="h2 fw-bold">MacBook</h3>
          <p class="small mb-4">Placa base, limpieza y upgrade de SSD.</p>
          <a href="#" class="btn-pill-light d-inline-block text-center w-100 py-3">Ver precios Mac</a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .bento-card { border-radius: 28px; transition: transform 0.3s ease; border: 1px solid rgba(0,0,0,0.05); }
  .bg-blue { background-color: #3A506B; }
  .mono { font-family: 'PT Mono', monospace; font-size: 0.6rem; color: #888; }
  .btn-pill-light { background: #fff; color: #000; border-radius: 50px; text-decoration: none; font-weight: 700; }
</style>
4. src/components/service/TransparencyModule.astro

Estrategia: Social Proof basado en datos reales de 2025.

Fragmento de código
<section class="py-6 bg-dark text-white">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-5">
        <h2 class="display-6 fw-bold mb-4">Nuestros Números <br/><span class="opacity-50 text-blue">2025</span></h2>
        <div class="data-row">
          <span class="mono">TOTAL SERVICIOS:</span>
          <span class="fw-bold">127</span>
        </div>
        <div class="data-row">
          <span class="mono">BATERÍAS:</span>
          <span class="fw-bold">28.3%</span>
        </div>
        <div class="data-row">
          <span class="mono">PANTALLAS:</span>
          <span class="fw-bold">26.0%</span>
        </div>
      </div>
      <div class="col-lg-7 text-center">
        <div class="p-5 border border-secondary rounded-5">
          <p class="mono small mb-2">// DIAGNÓSTICO PROFESIONAL</p>
          <h3 class="display-3 fw-black">$25,000</h3>
          <p class="opacity-75">Informe técnico detallado para seguros o decisiones complejas.</p>
          <button class="btn-pill-dark bg-white text-dark border-0">Solicitar Informe</button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .data-row { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #333; }
  .mono { font-family: 'PT Mono', monospace; font-size: 0.75rem; }
  .text-blue { color: #3A506B; }
  .fw-black { font-weight: 900; }
</style>
5. src/pages/servicio-tecnico.astro (Archivo Maestro)

El ensamblaje final que limpia el index.astro.

Fragmento de código
---
import Layout from '../layouts/Layout.astro';
import ServiceHero from '../components/service/ServiceHero.astro';
import ServiceStats from '../components/service/ServiceStats.astro';
import DeviceBento from '../components/service/DeviceBento.astro';
import TransparencyModule from '../components/service/TransparencyModule.astro';
import Footer from '../components/pipodFooter';
import PipodNavbar from '../components/pipodNavbar';

// SEO Metas
const title = "Servicio Técnico Apple Bogotá | Pipod.co";
---

<Layout title={title}>
  <PipodNavbar client:load />
  
  <main>
    <ServiceHero />
    <ServiceStats />
    <DeviceBento />
    <TransparencyModule />
    
    <section class="py-5 container text-center">
      <div class="p-4 bg-light rounded-4 border">
        <p class="mono small mb-0">Mantenimiento Preventivo desde $85,000</p>
      </div>
    </section>
  </main>

  <Footer client:load />
</Layout>

<style is:global>
  /* Reset y tipografía global */
  body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
  .text-gradient { background: linear-gradient(90deg, #3A506B, #000); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
</style>