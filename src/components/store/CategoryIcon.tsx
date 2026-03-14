import React from 'react';

interface CategoryIconProps {
  category: string;
  size?: number;
  className?: string;
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
    
    case 'Audio':
      return (
        <svg {...iconProps}>
          <path d="M23 9v6" />
          <path d="M20.88 16.021A9 9 0 1 1 20.9 7" />
          <path d="M12 17v-6" />
        </svg>
      );
    
    case 'Energía y Carga':
      return (
        <svg {...iconProps}>
          <path d="M13 2H11v7H8l4 5 4-5h-3V2Z" />
          <rect x="3" y="13" width="18" height="8" rx="2" />
          <path d="M7 17h10" />
        </svg>
      );
    
    case 'Conectividad':
      return (
        <svg {...iconProps}>
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.94 0" />
          <circle cx="12" cy="20" r="1" />
        </svg>
      );
    
    case 'Complementos':
      return (
        <svg {...iconProps}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
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
