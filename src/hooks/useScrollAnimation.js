import { useEffect, useRef } from 'react';

/**
 * Hook: useScrollAnimation
 * Adds 'is-visible' class when element enters viewport
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el); // Only animate once
        }
      },
      {
        threshold: options.threshold || 0.12,
        rootMargin: options.rootMargin || '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}

/**
 * Hook: useScrollAnimationGroup
 * Returns a ref — when visible, adds staggered animation to children
 * Children should have .animate-on-scroll class
 */
export function useScrollAnimationGroup(threshold = 0.08) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      container.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    const children = container.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach(child => child.classList.add('is-visible'));
          observer.unobserve(container);
        }
      },
      { threshold }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
