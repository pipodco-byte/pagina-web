import { useCallback } from 'react';

export const useGTM = () => {
  const track = useCallback((eventName: string, eventData: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  return { track };
};
