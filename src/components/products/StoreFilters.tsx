export default function StoreFilters() {
  return (
    <div className="store-filters">
      <div className="accordion" id="filtersAccordion">
        {/* CONDICIÓN */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCondition">
              Condición
            </button>
          </h2>
          <div id="collapseCondition" className="accordion-collapse collapse show" data-bs-parent="#filtersAccordion">
            <div className="accordion-body">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="nuevo" />
                <label className="form-check-label" htmlFor="nuevo">Nuevo</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="seminuevo" />
                <label className="form-check-label" htmlFor="seminuevo">Seminuevo</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="repotenciado" />
                <label className="form-check-label" htmlFor="repotenciado">Repotenciado</label>
              </div>
            </div>
          </div>
        </div>

        {/* DISPOSITIVO */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDevice">
              Dispositivo
            </button>
          </h2>
          <div id="collapseDevice" className="accordion-collapse collapse" data-bs-parent="#filtersAccordion">
            <div className="accordion-body">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="iphone" />
                <label className="form-check-label" htmlFor="iphone">iPhone</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="macbook" />
                <label className="form-check-label" htmlFor="macbook">MacBook</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="ipad" />
                <label className="form-check-label" htmlFor="ipad">iPad</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="watch" />
                <label className="form-check-label" htmlFor="watch">Apple Watch</label>
              </div>
            </div>
          </div>
        </div>

        {/* RANGO DE PRECIO */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePrice">
              Rango de Precio
            </button>
          </h2>
          <div id="collapsePrice" className="accordion-collapse collapse" data-bs-parent="#filtersAccordion">
            <div className="accordion-body">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="price1" />
                <label className="form-check-label" htmlFor="price1">Menos de $500k</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="price2" />
                <label className="form-check-label" htmlFor="price2">$500k - $1M</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="price3" />
                <label className="form-check-label" htmlFor="price3">$1M - $2M</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="price4" />
                <label className="form-check-label" htmlFor="price4">Más de $2M</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .store-filters {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 20px;
        }

        .accordion-button {
          font-weight: 600;
          font-size: 14px;
          padding: 12px 0;
        }

        .accordion-button:not(.collapsed) {
          background-color: transparent;
          color: #000;
        }

        .form-check {
          margin-bottom: 10px;
        }

        .form-check-label {
          font-size: 14px;
          margin-left: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
