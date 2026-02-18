import { useEffect } from 'react';

interface GTMTrackerProps {
  eventName: string;
  eventData?: Record<string, any>;
  triggerOn?: 'mount' | 'click' | 'scroll' | 'view';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GTMTracker: React.FC<GTMTrackerProps> = ({
  eventName,
  eventData = {},
  triggerOn = 'mount',
  children,
  className,
  onClick,
}) => {
  const trackEvent = (data: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
        ...data,
        timestamp: new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    if (triggerOn === 'mount') {
      trackEvent({});
    }

    if (triggerOn === 'view') {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          trackEvent({ view_type: 'intersection' });
          observer.unobserve(entry.target);
        }
      });
      const element = document.currentScript?.parentElement;
      if (element) observer.observe(element);
      return () => observer.disconnect();
    }
  }, []);

  const handleClick = () => {
    if (triggerOn === 'click') {
      trackEvent({ interaction_type: 'click' });
    }
    onClick?.();
  };

  if (triggerOn === 'click' && children) {
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
};
