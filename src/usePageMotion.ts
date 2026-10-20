import { useEffect } from 'react';

export function usePageMotion(page: string) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    elements.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${index % 3 * 65}ms`);
      element.classList.add('reveal-ready');
      observer.observe(element);
    });

    // Reveal immediately if the visitor changes their motion preference.
    const updatePreference = () => {
      if (reducedMotion.matches) {
        elements.forEach(element => element.classList.add('is-visible'));
        observer.disconnect();
      }
    };
    reducedMotion.addEventListener('change', updatePreference);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', updatePreference);
      elements.forEach(element => element.classList.remove('reveal-ready'));
    };
  }, [page]);
}
