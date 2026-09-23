/**
 * One-shot scroll reveal. Adds `reveal-ready` to <html> only when motion
 * is allowed, then observes every [data-reveal] element once.
 * Without JS (or with reduced motion) content stays fully visible.
 */
export function initReveal(): () => void {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) return () => undefined;

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'),
  );
  if (elements.length === 0) return () => undefined;

  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
  );

  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
