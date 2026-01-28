<aside class="pipod-sidebar">
  <div class="action-widget featured">
    <span class="mono-label">PLAN RETOMA</span>
    <h3>¿Vendes tu Apple?</h3>
    <p>Cotiza en 2 minutos y recibe tu oferta inmediata.</p>
    <a href="/plan-retoma" class="btn-pipod-dark">Cotizar ahora <i class="bi bi-arrow-right"></i></a>
  </div>

  <div class="action-widget border-only">
    <p class="small-text">¿Dudas con la garantía?</p>
    <a href="https://wa.me/573124813094" class="btn-pipod-outline">
      <i class="bi bi-whatsapp"></i> Chat de Soporte
    </a>
  </div>
</aside>

<style lang="scss">
  .pipod-sidebar {
    position: sticky;
    top: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .action-widget {
      padding: 24px;
      border-radius: 20px;
      
      &.featured {
        background: #F5F5F7; // Gris Apple muy sutil
        border: 1px solid rgba(0,0,0,0.05);
      }
      
      &.border-only {
        border: 1px solid #E5E5E5;
      }

      h3 { font-weight: 900; font-size: 18px; margin-bottom: 10px; text-transform: uppercase; }
      p { font-size: 13px; color: #6E6E73; margin-bottom: 15px; }
      
      .mono-label {
        font-family: 'PT Mono', monospace;
        font-size: 10px;
        color: #3A506B;
        font-weight: 700;
        display: block;
        margin-bottom: 8px;
      }
    }
  }

  // Estilos de botones unificados
  .btn-pipod-dark {
    background: #000;
    color: #fff;
    padding: 10px 20px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn-pipod-outline {
    border: 1.5px solid #000;
    color: #000;
    padding: 10px 20px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
</style>