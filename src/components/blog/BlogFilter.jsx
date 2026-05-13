import React, { useState, useEffect, useMemo } from 'react';

export default function BlogFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [posts, setPosts] = useState([]);

  // Load posts from global variable on client-side only
  useEffect(() => {
    const storedPosts = typeof window !== 'undefined' ? window.__BLOG_POSTS__ : null;
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const cats = [...new Set(posts.map((post) => post.category))];
    return cats.sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf());
  }, [searchTerm, selectedCategory, posts]);

  // Grid posts: skip the first article (already shown in BlogHeroFeatured)
  const gridPosts = useMemo(() => {
    return filteredPosts.slice(1);
  }, [filteredPosts]);

  // Format date for display (Spanish locale)
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  // Capitalize author name (e.g. "kimi" → "Kimi")
  const formatAuthor = (author) => {
    if (!author) return 'Pipod Team';
    return author
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

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
              <button className="clear-btn" onClick={() => setSearchTerm('')}>
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
            {categories.map((cat) => (
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
            Mostrando <strong>{gridPosts.length}</strong> de <strong>{posts.length}</strong> artículos
          </div>
        </div>

        {/* Grid de posts editorial */}
        {gridPosts.length > 0 ? (
          <div className="blog-grid">
            {gridPosts.map((post) => (
              <article key={post.id || post.slug} className="blog-card-editorial">
                <a
                  href={`/blog/${post.slug}`}
                  className="blog-card-editorial__link"
                  aria-label={`Leer: ${post.title}`}
                >
                  {/* Image section with gradient fallback */}
                  <div className="blog-card-editorial__image">
                    {post.ogImage ? (
                      <img
                        src={post.ogImage}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="blog-card-editorial__placeholder">
                        <span className="blog-card-editorial__placeholder-text">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content section */}
                  <div className="blog-card-editorial__body">
                    {post.tags && post.tags.length > 0 && (
                      <div className="blog-card-editorial__tags">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="blog-card-editorial__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="blog-card-editorial__category">
                      {post.category}
                    </span>
                    <h3 className="blog-card-editorial__title">{post.title}</h3>
                    {post.description && (
                      <p className="blog-card-editorial__excerpt">
                        {post.description}
                      </p>
                    )}
                  </div>
                </a>

                {/* Author footer */}
                <div className="blog-card-editorial__meta">
                  <div className="blog-author">
                    <div className="blog-author__avatar" aria-hidden="true">
                      {formatAuthor(post.author).charAt(0).toUpperCase()}
                    </div>
                    <div className="blog-author__info">
                      <span className="blog-author__name">
                        {formatAuthor(post.author)}
                      </span>
                      <div className="blog-author__meta">
                        <time dateTime={post.publishDate}>
                          {formatDate(post.publishDate)}
                        </time>
                        {post.readingTime && (
                          <>
                            <span className="blog-author__separator" aria-hidden="true">
                              ·
                            </span>
                            <span className="blog-author__reading-time">
                              {post.readingTime}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
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

        .blog-empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .blog-empty-state i {
          font-size: 48px;
          color: var(--pipod-color-disabled, rgba(0, 0, 0, 0.24));
          margin-bottom: 16px;
        }

        .blog-empty-state p {
          font-size: 16px;
          color: var(--pipod-color-disabled, rgba(0, 0, 0, 0.24));
          margin-bottom: 20px;
        }

        .reset-btn {
          padding: 10px 20px;
          background: var(--pipod-color-deep-blue, #3A506B);
          color: var(--pipod-color-white, #ffffff);
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: var(--pipod-weight-semibold, 600);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reset-btn:hover {
          background: var(--pipod-color-near-black, #1F1F1F);
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

          .blog-empty-state {
            padding: 40px 20px;
          }

          .blog-empty-state i {
            font-size: 36px;
          }

          .blog-empty-state p {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
