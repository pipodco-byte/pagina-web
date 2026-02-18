import { useEffect, useRef } from 'react';
import { useGTM } from './useGTM';

interface SectionTrackerProps {
  sectionName: string;
  sectionData?: Record<string, any>;
  children: React.ReactNode;
}

export const SectionTracker: React.FC<SectionTrackerProps> = ({
  sectionName,
  sectionData = {},
  children,
}) => {
  const { track } = useGTM();
  const ref = useRef<HTMLDivElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          track(`view_${sectionName}`, sectionData);
          hasTracked.current = true;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [track, sectionName, sectionData]);

  return <div ref={ref}>{children}</div>;
};
