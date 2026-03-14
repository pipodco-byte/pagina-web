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
}

interface Props {
  productos: Product[];
}

export default function StoreWithFilters({ productos }: Props) {
  const [filters, setFilters] = useState({
    conditions: [] as string[],
    devices: [] as string[],
    priceRanges: [] as string[]
  });

  // Categorizar productos
  const categorizeProduct = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('iphone')) return 'iPhone';
    if (lower.includes('macbook') || lower.includes('mac')) return 'MacBook';
    if (lower.includes('ipad')) return 'iPad';
    if (lower.includes('watch')) return 'Apple Watch';
    return 'Accesorios';
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
      if (filters.priceRanges.length > 0) {
        const price = product.price;
        const inRange = filters.priceRanges.some(range => {
          if (range === 'price1' && price < 500000) return true;
          if (range === 'price2' && price >= 500000 && price < 1000000) return true;
          if (range === 'price3' && price >= 1000000 && price < 2000000) return true;
          if (range === 'price4' && price >= 2000000) return true;
          return false;
        });
        if (!inRange) return false;
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
      'Accesorios': []
    };

    filteredProducts.forEach(product => {
      const category = categorizeProduct(product.title);
      groups[category].push(product);
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

  const handlePriceChange = (range: string) => {
    setFilters(prev => ({
      ...prev,
      priceRanges: prev.priceRanges.includes(range)
        ? prev.priceRanges.filter(r => r !== range)
        : [...prev.priceRanges, range]
    }));
  };

  const resetFilters = () => {
    setFilters({
      conditions: [],
      devices: [],
      priceRanges: []
    });
  };

  const categoryDescriptions: { [key: string]: string } = {
    'iPhone': 'Últimos modelos con garantía técnica y diagnóstico gratis',
    'MacBook': 'Computadoras portátiles y de escritorio con rendimiento certificado',
    'iPad': 'Tablets Apple con pantalla retina y batería verificada',
    'Apple Watch': 'Smartwatches Apple con funciones completas',
    'Accesorios': 'Accesorios originales y certificados para tu ecosistema Apple'
  };

  const hasActiveFilters = filters.conditions.length > 0 || filters.devices.length > 0 || filters.priceRanges.length > 0;
  const totalFiltered = filteredProducts.length;

  return (
    <div className="store-with-filters">
      <div className="store-layout">
        {/* FILTROS SIDEBAR */}
        <aside className="filters-sidebar">
          <div className="filters-wrapper">
            <div className="filters-header">
              <h2 className="filters-title">Filtrar</h2>
              {hasActiveFilters && (
                <button className="reset-filters" onClick={resetFilters}>
                  Limpiar
                </button>
              )}
            </div>

            {/* CONDICIÓN */}
            <div className="filter-section">
              <h3 className="filter-section-title">Condición</h3>
              <div className="filter-options">
                {['Nuevo', 'Seminuevo', 'Repotenciado'].map(condition => (
                  <label key={condition} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.conditions.includes(condition)}
                      onChange={() => handleConditionChange(condition)}
                    />
                    <span>{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* DISPOSITIVO */}
            <div className="filter-section">
              <h3 className="filter-section-title">Dispositivo</h3>
              <div className="filter-options">
                {['iPhone', 'MacBook', 'iPad', 'Apple Watch'].map(device => (
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

            {/* RANGO DE PRECIO */}
            <div className="filter-section">
              <h3 className="filter-section-title">Rango de Precio</h3>
              <div className="filter-options">
                {[
                  { id: 'price1', label: 'Menos de $500k' },
                  { id: 'price2', label: '$500k - $1M' },
                  { id: 'price3', label: '$1M - $2M' },
                  { id: 'price4', label: 'Más de $2M' }
                ].map(price => (
                  <label key={price.id} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.priceRanges.includes(price.id)}
                      onChange={() => handlePriceChange(price.id)}
                    />
                    <span>{price.label}</span>
                  </label>
                ))}
              </div>
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

        .filter-section:last-child {
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
          align-items: center;
          cursor: pointer;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.95rem;
          color: #555;
          transition: all 0.2s;
        }

        .filter-checkbox:hover {
          color: #1D1D1F;
        }

        .filter-checkbox input {
          margin-right: 8px;
          cursor: pointer;
          width: 16px;
          height: 16px;
          accent-color: #3A506B;
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
          border-radius: 50px;
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
