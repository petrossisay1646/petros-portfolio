import { useState, useEffect, useRef } from 'react';

export function useIntersection(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback if IntersectionObserver is unsupported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.once !== false) {
          observer.unobserve(element);
        }
      } else if (!options.once) {
        setIsVisible(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -50px 0px',
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return { ref, isVisible };
}
