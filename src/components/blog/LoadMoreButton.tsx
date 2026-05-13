import React, { useState } from 'react';

interface LoadMoreButtonProps {
  posts: any[];
  initialCount?: number;
  increment?: number;
}

export default function LoadMoreButton({
  posts,
  initialCount = 12,
  increment = 12,
}: LoadMoreButtonProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + increment, posts.length));
  };

  if (posts.length <= initialCount) {
    return null;
  }

  return (
    <>
      {/* Hidden posts that are now visible */}
      {visiblePosts.slice(initialCount).map((post: any, index: number) => (
        <div key={post.id || post.slug || index} className="load-more-post" style={{ display: 'none' }} />
      ))}

      {hasMore && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <button
            onClick={handleLoadMore}
            className="load-more-button"
            style={{
              padding: '14px 32px',
              background: '#3A506B',
              color: '#ffffff',
              border: 'none',
              borderRadius: '100px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--pipod-font-inter, Inter, sans-serif)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3A506B';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Cargar más artículos
          </button>
        </div>
      )}

      <style>{`
        .load-more-button {
          box-shadow: 0 4px 14px rgba(58, 80, 107, 0.3);
        }

        .load-more-button:active {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}