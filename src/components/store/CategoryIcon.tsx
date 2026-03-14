import React from 'react';

interface CategoryIconProps {
  category: string;
  size?: number;
  className?: string; // Para poder pasarle márgenes o colores desde afuera
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category, size = 24, className = "" }) => {
  const iconProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': "true",
    role: "img",
    className: `category-icon-svg ${className}`
  };

  switch (category) {
    case 'iPhone':
      return (
        <svg {...iconProps}>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    
    case 'MacBook':
      return (
        <svg {...iconProps}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M2 18h20" />
        </svg>
      );
    
    case 'iPad':
      return (
        <svg {...iconProps}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    
    case 'Apple Watch':
      return (
        <svg {...iconProps}>
          <path d="M16 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4Z" />
          <path d="M9 18v3h6v-3" />
          <path d="M9 6V3h6v3" />
        </svg>
      );
    
    case 'Accesorios':
      return (
        <svg {...iconProps}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      );
    
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

export default CategoryIcon;