// adds .is-seen when [data-reveal] or <mark> scrolls into view; data-reveal="load" skips the wait
export function reveal() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-seen');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  document.querySelectorAll('[data-reveal]:not([data-reveal="load"]), mark').forEach((el) => io.observe(el));

  const now = document.querySelectorAll('[data-reveal="load"]');
  setTimeout(() => now.forEach((el) => el.classList.add('is-seen')), 500);
}
