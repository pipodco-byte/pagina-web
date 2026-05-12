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
      link: '/blog/historia-pipod-bogota'
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
                <div className="blog-card-white">
                  <div className="card-body-white">
                    <span className="card-cat">{post.category}</span>
                    <h4 className="card-t">{post.title}</h4>
                    <p className="card-p">{post.excerpt}</p>
                    <a href={post.link} className="card-link-premium">
                      LEER ARTÍCULO <i className="bi bi-arrow-right-short"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
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

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-filter-section {
          background-color: #FFFFFF;
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
          color: #86868B;
          font-size: 18px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 45px;
          border: 1px solid #E5E5E7;
          border-radius: 12px;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3A506B;
          box-shadow: 0 0 0 3px rgba(58, 80, 107, 0.1);
        }

        .clear-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #86868B;
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          transition: color 0.2s;
        }

        .clear-btn:hover {
          color: #1D1D1F;
        }

        .category-filters {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .filter-btn {
          padding: 8px 16px;
          border: 1px solid #E5E5E7;
          background: #FFFFFF;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          color: #1D1D1F;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .filter-btn:hover {
          border-color: #3A506B;
          color: #3A506B;
        }

        .filter-btn.active {
          background: #3A506B;
          color: #FFFFFF;
          border-color: #3A506B;
        }

        .results-count {
          font-size: 13px;
          color: #86868B;
          font-family: 'Inter', sans-serif;
        }

        .results-count strong {
          color: #1D1D1F;
          font-weight: 600;
        }

        .blog-card-white {
          background-color: #FFFFFF;
          border: 1px solid #E0E0E0;
          border-radius: 24px;
          padding: 45px 35px;
          height: 100%;
          transition: all 0.4s ease;
          position: relative;
        }

        .blog-card-white:hover {
          border-color: #000000;
          box-shadow: 0 15px 40px rgba(0,0,0,0.05);
          transform: translateY(-5px);
        }

        .card-body-white {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-cat {
          color: #3A506B;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 800;
          display: block;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .card-t {
          font-weight: 700;
          font-size: 22px;
          line-height: 1.3;
          margin-bottom: 15px;
          color: #000000;
          margin: 0 0 15px 0;
        }

        .card-p {
          color: #4C4C4C;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 30px;
          flex-grow: 1;
          margin: 0 0 30px 0;
        }

        .card-link-premium {
          color: #000000;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: gap 0.3s ease;
          margin-top: auto;
        }

        .card-link-premium:hover {
          gap: 12px;
          color: #000000;
        }

        .card-link-premium i {
          font-size: 20px;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
        }

        .no-results i {
          font-size: 48px;
          color: #E5E5E7;
          display: block;
          margin-bottom: 16px;
        }

        .no-results p {
          font-size: 16px;
          color: #86868B;
          margin-bottom: 24px;
          font-family: 'Inter', sans-serif;
        }

        .reset-btn {
          padding: 10px 24px;
          background: #3A506B;
          color: #FFFFFF;
          border: none;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .reset-btn:hover {
          background: #2A3A5B;
          transform: translateY(-2px);
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

          .blog-card-white {
            padding: 24px 20px;
          }

          .card-t {
            font-size: 1.1rem;
          }

          .card-p {
            font-size: 0.9rem;
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
      `}} />
    </section>
  );
}
