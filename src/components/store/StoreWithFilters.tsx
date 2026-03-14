import React, { useState, useMemo } from 'react';
import CardProduct from '../products/cardProduct';
import { CategoryIcon } from './CategoryIcon';

interface Product {
  thumb_src: string;
  thumb_alt: string;
  color: string;
  colors: string[];
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  condition: 'Nuevo' | 'Seminuevo' | 'Repotenciado';
  rating: number;
  batteryHealth: string;
  slug: string;
  useCase?: 'Diseñadores' | 'Profesionales' | 'Estudiantes' | 'Viajeros' | 'Deportistas';
}

interface Props {
  productos: Product[];
}

export default function StoreWithFilters({ productos }: Props) {
  const [filters, setFilters] = useState({
    conditions: [] as string[],
    devices: [] as string[],
    priceRange: [0, 10000000] as [number, number],
    useCases: [] as string[]
  });

  // Categorizar productos
  const categorizeProduct = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('iphone')) return 'iPhone';
    if (lower.includes('macbook') || lower.includes('mac')) return 'MacBook';
    if (lower.includes('ipad')) return 'iPad';
    if (lower.includes('watch')) return 'Apple Watch';
    if (lower.includes('airpods') || lower.includes('beats') || lower.includes('homepod')) return 'Audio';
    if (lower.includes('magsafe') || lower.includes('cable') || lower.includes('cubo') || lower.includes('carga')) return 'Energía y Carga';
    if (lower.includes('hub') || lower.includes('adaptador') || lower.includes('conectividad')) return 'Conectividad';
    return 'Complementos';
  };

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return productos.filter(product => {
      // Filtro de condición
      if (filters.conditions.length > 0 && !filters.conditions.includes(product.condition)) {
        return false;
      }

      // Filtro de dispositivo
      if (filters.devices.length > 0) {
        const category = categorizeProduct(product.title);
        if (!filters.devices.includes(category)) {
          return false;
        }
      }

      // Filtro de precio
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Filtro de caso de uso
      if (filters.useCases.length > 0 && product.useCase && !filters.useCases.includes(product.useCase)) {
        return false;
      }

      return true;
    });
  }, [filters, productos]);

  // Agrupar productos filtrados por categoría
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: Product[] } = {
      'iPhone': [],
      'MacBook': [],
      'iPad': [],
      'Apple Watch': [],
      'Audio': [],
      'Energía y Carga': [],
      'Conectividad': [],
      'Complementos': []
    };

    filteredProducts.forEach(product => {
      const category = categorizeProduct(product.title);
      if (groups[category]) {
        groups[category].push(product);
      }
    });

    return groups;
  }, [filteredProducts]);

  const handleConditionChange = (condition: string) => {
    setFilters(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const handleDeviceChange = (device: string) => {
    setFilters(prev => ({
      ...prev,
      devices: prev.devices.includes(device)
        ? prev.devices.filter(d => d !== device)
        : [...prev.devices, device]
    }));
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

  const handleUseCaseChange = (useCase: string) => {
    setFilters(prev => ({
      ...prev,
      useCases: prev.useCases.includes(useCase)
        ? prev.useCases.filter(u => u !== useCase)
        : [...prev.useCases, useCase]
    }));
  };

  const resetFilters = () => {
    setFilters({
      conditions: [],
      devices: [],
      priceRange: [0, 10000000],
      useCases: []
    });
  };

  const categoryDescriptions: { [key: string]: string } = {
    'iPhone': 'Últimos modelos con garantía técnica y diagnóstico gratis',
    'MacBook': 'Computadoras portátiles y de escritorio con rendimiento certificado',
    'iPad': 'Tablets Apple con pantalla retina y batería verificada',
    'Apple Watch': 'Smartwatches Apple con funciones completas',
    'Audio': 'AirPods, Beats, HomePod y más',
    'Energía y Carga': 'MagSafe, Cables, Cubos de carga',
    'Conectividad': 'Hubs, Adaptadores y accesorios de conectividad',
    'Complementos': 'Pulseras, Stands, Lentes y más'
  };

  const hasActiveFilters = filters.conditions.length > 0 || filters.devices.length > 0 || filters.useCases.length > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 10000000;
  const totalFiltered = filteredProducts.length;

  return (
    <div className="store-with-filters">
      <div className="store-layout">
        {/* FILTROS SIDEBAR */}
        <aside className="filters-sidebar">
          <div className="filters-wrapper">
            <div className="filters-header">
              <h2 className="filters-title">Filtrar Selección</h2>
              {hasActiveFilters && (
                <button className="reset-filters" onClick={resetFilters}>
                  Limpiar Todo
                </button>
              )}
            </div>

            {/* CONDICIÓN */}
            <div className="filter-section">
              <h3 className="filter-section-title">Condición</h3>
              <div className="filter-options">
                {[
                  { value: 'Nuevo', label: 'Nuevo', desc: 'Sellado, garantía Apple' },
                  { value: 'Seminuevo', label: 'Seminuevo', desc: 'Como nuevo, inspección 360°' },
                  { value: 'Repotenciado', label: 'Repotenciado', desc: 'Certificado Pipod, máximo rendimiento' }
                ].map(condition => (
                  <label key={condition.value} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.conditions.includes(condition.value)}
                      onChange={() => handleConditionChange(condition.value)}
                    />
                    <div className="checkbox-content">
                      <span className="checkbox-label">{condition.label}</span>
                      <span className="checkbox-desc">{condition.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* DISPOSITIVO */}
            <div className="filter-section">
              <h3 className="filter-section-title">Dispositivo</h3>
              <div className="filter-options">
                {[
                  'iPhone',
                  'MacBook',
                  'iPad',
                  'Apple Watch',
                  'Audio',
                  'Energía y Carga',
                  'Conectividad',
                  'Complementos'
                ].map(device => (
                  <label key={device} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.devices.includes(device)}
                      onChange={() => handleDeviceChange(device)}
                    />
                    <span>{device}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* RANGO DE PRESUPUESTO */}
            <div className="filter-section">
              <h3 className="filter-section-title">Rango de Presupuesto</h3>
              <div className="price-slider-container">
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value))}
                  className="price-slider"
                />
                <div className="price-display">
                  <span>${filters.priceRange[0].toLocaleString('es-CO')}</span>
                  <span>-</span>
                  <span>${filters.priceRange[1].toLocaleString('es-CO')}</span>
                </div>
                <p className="price-microcopy">Desliza para ajustar tu inversión</p>
              </div>
            </div>

            {/* ÚSALO PARA */}
            <div className="filter-section">
              <h3 className="filter-section-title">Úsalo Para</h3>
              <div className="filter-options">
                {[
                  { value: 'Diseñadores', label: 'Diseñadores', desc: 'Creativos, editores de video, fotógrafos' },
                  { value: 'Profesionales', label: 'Profesionales', desc: 'Oficina, ejecutivos, negocios' },
                  { value: 'Estudiantes', label: 'Estudiantes', desc: 'Colegio hasta postgrado' },
                  { value: 'Viajeros', label: 'Viajeros', desc: 'Nómadas digitales, constante movimiento' },
                  { value: 'Deportistas', label: 'Deportistas', desc: 'Seguimiento de rendimiento, fitness' }
                ].map(useCase => (
                  <label key={useCase.value} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.useCases.includes(useCase.value)}
                      onChange={() => handleUseCaseChange(useCase.value)}
                    />
                    <div className="checkbox-content">
                      <span className="checkbox-label">{useCase.label}</span>
                      <span className="checkbox-desc">{useCase.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* NOTA ESPECIAL */}
            <div className="filter-note">
              <span className="note-icon">🛡️</span>
              <div className="note-content">
                <strong>Blindaje Pipod</strong>
                <p>Para garantizar una aplicación perfecta y sin burbujas, nuestros protectores de pantalla se instalan exclusivamente en tienda física por nuestros expertos.</p>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="filter-actions">
              <button className="btn-apply">Aplicar Filtros</button>
              <button className="btn-clear" onClick={resetFilters}>Limpiar Todo</button>
            </div>
          </div>
        </aside>

        {/* PRODUCTOS */}
        <section className="products-section">
          {totalFiltered > 0 ? (
            <div className="categories-container">
              {Object.entries(groupedProducts).map(([category, products]) => (
                products.length > 0 && (
                  <div key={category} className="category-block">
                    <div className="category-header">
                      <div className="icon-container">
                        <CategoryIcon category={category} size={32} />
                      </div>
                      <div className="header-content">
                        <div className="header-text">
                          <h2 className="category-title">{category}</h2>
                        </div>
                      </div>
                      <div className="header-divider"></div>
                    </div>

                    <div className="products-grid">
                      {products.map(producto => (
                        <div key={producto.slug} className="product-wrapper">
                          <CardProduct 
                            thumb_src={producto.thumb_src}
                            thumb_alt={producto.thumb_alt}
                            color={producto.color}
                            colors={producto.colors}
                            title={producto.title}
                            description={producto.description}
                            price={producto.price}
                            oldPrice={producto.oldPrice}
                            condition={producto.condition}
                            rating={producto.rating}
                            batteryHealth={producto.batteryHealth}
                            slug={producto.slug}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No encontramos productos</h3>
              <p>Intenta ajustar los filtros para ver más opciones</p>
              <button className="reset-btn" onClick={resetFilters}>
                Limpiar filtros
              </button>
            </div>
          )}
        </section>
      </div>

      <style>{`
        .store-with-filters {
          width: 100%;
        }

        .store-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
        }

        .filters-sidebar {
          position: sticky;
          top: 160px;
          height: fit-content;
        }

        .filters-wrapper {
          background: #FFFFFF;
          padding: 24px;
          border-radius: 18px;
          border: 1px solid #D5D5D7;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .filters-title {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          margin: 0;
          color: #86868B;
        }

        .reset-filters {
          background: none;
          border: none;
          color: #3A506B;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .reset-filters:hover {
          color: #4A90E2;
        }

        .filter-section {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #E5E5E7;
        }

        .filter-section:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .filter-section-title {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #1D1D1F;
          margin: 0 0 12px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .filter-checkbox {
          display: flex;
          align-items: flex-start;
          cursor: pointer;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.95rem;
          color: #555;
          transition: all 0.2s;
          gap: 8px;
        }

        .filter-checkbox:hover {
          color: #1D1D1F;
        }

        .filter-checkbox input {
          margin-top: 2px;
          cursor: pointer;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          accent-color: #3A506B;
        }

        .checkbox-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .checkbox-label {
          font-weight: 500;
          color: #1D1D1F;
        }

        .checkbox-desc {
          font-size: 0.8rem;
          color: #86868B;
          line-height: 1.3;
        }

        .price-slider-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .price-slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #E5E5E7;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
        }

        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3A506B;
          cursor: pointer;
          transition: all 0.2s;
        }

        .price-slider::-webkit-slider-thumb:hover {
          background: #4A90E2;
          transform: scale(1.1);
        }

        .price-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3A506B;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        .price-slider::-moz-range-thumb:hover {
          background: #4A90E2;
          transform: scale(1.1);
        }

        .price-display {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1D1D1F;
        }

        .price-microcopy {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.75rem;
          color: #86868B;
          margin: 0;
          text-align: center;
        }

        .filter-note {
          background: #F5F5F7;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          gap: 10px;
          margin-top: 24px;
          margin-bottom: 24px;
        }

        .note-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .note-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .note-content strong {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.85rem;
          color: #1D1D1F;
        }

        .note-content p {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.75rem;
          color: #555;
          margin: 0;
          line-height: 1.4;
        }

        .filter-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 24px;
        }

        .btn-apply,
        .btn-clear {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 600;
          padding: 10px 16px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .btn-apply {
          background: #4A90E2;
          color: #FFFFFF;
        }

        .btn-apply:hover {
          background: #3A506B;
        }

        .btn-clear {
          background: #F5F5F7;
          color: #1D1D1F;
        }

        .btn-clear:hover {
          background: #E5E5E7;
        }

        .products-section {
          width: 100%;
        }

        .categories-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .category-block {
          animation: fadeInUp 0.6s ease-out;
        }

        .category-header {
          margin-bottom: 24px;
          position: relative;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          height: auto;
          padding-bottom: 12px;
        }

        .header-content {
          display: contents;
        }

        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: #FFFFFF;
          border: 1px solid #E5E5E7;
          border-radius: 12px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          color: #1D1D1F;
        }

        .category-icon-svg {
          color: #1D1D1F;
        }

        .header-text {
          display: contents;
        }

        .category-title {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1D1D1F;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .header-divider {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, #E5E5E7 0%, #E5E5E7 60%, transparent 100%);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
          margin-left: 0;
        }

        .product-wrapper {
          animation: fadeInUp 0.6s ease-out;
        }

        .no-results {
          text-align: center;
          padding: 80px 40px;
          background: #F5F5F7;
          border-radius: 24px;
        }

        .no-results-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .no-results h3 {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1D1D1F;
          margin: 0 0 8px 0;
        }

        .no-results p {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.95rem;
          color: #86868B;
          margin: 0 0 24px 0;
        }

        .reset-btn {
          background: #000;
          color: #fff;
          border: none;
          padding: 12px 32px;
          border-radius: 100px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .reset-btn:hover {
          background: #0066cc;
          transform: translateY(-2px);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .store-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .filters-sidebar {
            position: relative;
            top: 0;
          }
        }

        @media (max-width: 768px) {
          .filters-wrapper {
            padding: 16px;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
          }

          .category-title {
            font-size: 1.5rem;
          }

          .categories-container {
            gap: 60px;
          }

          .icon-container {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </div>
  );
}
