import { useEffect, useRef } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);

  const trackEvent = (data: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
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

    if (triggerOn === 'view' && ref.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          trackEvent({ view_type: 'intersection' });
          observer.unobserve(entry.target);
        }
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [eventName, eventData, triggerOn]);

  const handleClick = () => {
    if (triggerOn === 'click') {
      trackEvent({ interaction_type: 'click' });
    }
    onClick?.();
  };

  if (triggerOn === 'click' && children) {
    return (
      <div ref={ref} className={className} onClick={handleClick}>
        {children}
      </div>
    );
  }

  return <div ref={ref}>{children}</div>;
};
