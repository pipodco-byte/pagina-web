import React, { useState, useMemo } from 'react';

export default function BlogFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const posts = [
    {
      id: 0,
      title: 'De Reparar Nokia a Ser Especialistas Apple: La Historia de Pipod en Bogotá',
      excerpt: 'Descubre cómo Pipod pasó de reparar móviles en 2007 a convertirse en el servicio técnico especializado en Apple más confiable de Bogotá. 15+ años de transparencia y excelencia.',
      category: 'HISTORIA PIPOD',
      link: '/blog/historia-pipod-bogota',
      date: '12 Mayo 2026',
      readingTime: '5 min de lectura'
    }
  ];

  const categories = ['HISTORIA PIPOD'];

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section className="blog-filter-section">
      <div className="container">
        <div className="filter-container">
          {/* Buscador */}
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-btn"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros por categoría */}
          <div className="category-filters">
            <button
              className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              Todos
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Contador de resultados */}
          <div className="results-count">
            Mostrando <strong>{filteredPosts.length}</strong> de <strong>{posts.length}</strong> artículos
          </div>
        </div>

        {/* Grid de posts */}
        {filteredPosts.length > 0 ? (
          <div className="row mt-5">
            {filteredPosts.map(post => (
              <div key={post.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <a href={post.link} className="blog-card">
                  <div className="blog-card__inner">
                    <span className="blog-card__category">{post.category}</span>
                    <h4 className="blog-card__title">{post.title}</h4>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <footer className="blog-card__footer">
                      <div className="blog-card__meta">
                        <span>{post.date}</span>
                        <span className="blog-card__separator">·</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <span className="blog-card__link">
                        LEER ARTÍCULO <i className="bi bi-arrow-right-short"></i>
                      </span>
                    </footer>
                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="blog-empty-state">
            <i className="bi bi-search"></i>
            <p>No encontramos artículos que coincidan con tu búsqueda.</p>
            <button
              className="reset-btn"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      <style>{`
        .blog-filter-section {
          background-color: var(--pipod-color-white, #ffffff);
          padding: 60px 0;
        }

        .filter-container {
          margin-bottom: 40px;
        }

        .search-box {
          position: relative;
          margin-bottom: 24px;
        }

        .search-box i {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--pipod-color-disabled, rgba(0, 0, 0, 0.24));
          font-size: 18px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 45px;
          border: 1px solid var(--pipod-color-border-gray, #E5E5E7);
          border-radius: 12px;
          font-size: var(--pipod-size-body, 15px);
          font-family: var(--pipod-font-inter, 'Inter', sans-serif);
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--pipod-color-deep-blue, #3A506B);
          box-shadow: 0 0 0 3px rgba(58, 80, 107, 0.1);
        }

        .clear-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--pipod-color-disabled, rgba(0, 0, 0, 0.24));
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          transition: color 0.2s;
        }

        .clear-btn:hover {
          color: var(--pipod-color-near-black, #1F1F1F);
        }

        .category-filters {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .filter-btn {
          padding: 8px 16px;
          border: 1px solid var(--pipod-color-border-gray, #E5E5E7);
          background: var(--pipod-color-white, #ffffff);
          border-radius: 20px;
          font-size: 13px;
          font-weight: var(--pipod-weight-semibold, 600);
          color: var(--pipod-color-near-black, #1F1F1F);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--pipod-font-inter, 'Inter', sans-serif);
        }

        .filter-btn:hover {
          border-color: var(--pipod-color-deep-blue, #3A506B);
          color: var(--pipod-color-deep-blue, #3A506B);
        }

        .filter-btn.active {
          background: var(--pipod-color-deep-blue, #3A506B);
          color: var(--pipod-color-white, #ffffff);
          border-color: var(--pipod-color-deep-blue, #3A506B);
        }

        .results-count {
          font-size: 13px;
          color: var(--pipod-color-disabled, rgba(0, 0, 0, 0.24));
          font-family: var(--pipod-font-inter, 'Inter', sans-serif);
        }

        .results-count strong {
          color: var(--pipod-color-near-black, #1F1F1F);
          font-weight: var(--pipod-weight-semibold, 600);
        }

        @media (max-width: 768px) {
          .blog-filter-section {
            padding: 40px 0;
          }

          .search-input {
            padding: 10px 14px 10px 40px;
            font-size: 14px;
          }

          .category-filters {
            gap: 8px;
          }

          .filter-btn {
            padding: 6px 12px;
            font-size: 12px;
          }

          .no-results {
            padding: 40px 20px;
          }

          .no-results i {
            font-size: 36px;
          }

          .no-results p {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
