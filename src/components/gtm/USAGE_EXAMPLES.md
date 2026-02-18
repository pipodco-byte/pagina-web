// EJEMPLO DE USO EN COMPONENTES

// 1. OPCIÓN: Usar el hook useGTM (más simple para lógica)
import { useGTM } from '@/components/gtm';

export const ProductCard = ({ product }) => {
  const { track } = useGTM();

  const handleProductClick = () => {
    track('click_product_detail', {
      product_id: product.id,
      product_name: product.nombre,
      categoria: product.categoria,
    });
  };

  return (
    <div onClick={handleProductClick}>
      {/* contenido */}
    </div>
  );
};

// 2. OPCIÓN: Usar GTMTracker (más simple para envolvimiento)
import { GTMTracker } from '@/components/gtm';

export const ServiceCard = ({ service }) => {
  return (
    <GTMTracker
      eventName="click_agendar_servicio"
      eventData={{ servicio: service.type }}
      triggerOn="click"
    >
      <button>{service.buttonText}</button>
    </GTMTracker>
  );
};

// 3. OPCIÓN: Rastrear cuando un elemento es visible (view)
export const PromoSection = ({ promo }) => {
  return (
    <GTMTracker
      eventName="view_promo_section"
      eventData={{ promo_id: promo.id }}
      triggerOn="view"
    >
      <section>{promo.content}</section>
    </GTMTracker>
  );
};
