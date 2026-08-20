import { useState, useEffect } from 'react';

/**
 * Hook: useScrollProgress
 * Returns scroll progress as a percentage (0–100)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

/**
 * Hook: useNavScroll
 * Returns whether the page has scrolled past a threshold
 */
export function useNavScroll(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Hook: useActiveSection
 * Returns the id of the currently active section based on scroll position
 */
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observers = new Map();

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observers.set(id, el);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
