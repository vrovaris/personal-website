// snaps text blocks onto the next ruled line; [data-free] opts out
const TEXT = 'h1, h2, h3, p, li';

let ro: ResizeObserver | undefined;

export function rhythm() {
  ro?.disconnect(); // let go of the previous page
  const book = document.querySelector<HTMLElement>('.book');
  if (!book) return;
  let queued = false;
  const run = () => {
    queued = false;
    document.querySelectorAll<HTMLElement>('.page').forEach(align);
  };
  ro = new ResizeObserver(() => {
    if (!queued) (queued = true), requestAnimationFrame(run);
  });
  ro.observe(book);
  book.querySelectorAll('.page > *').forEach((el) => ro!.observe(el));
  document.fonts.ready.then(run);
}

function align(page: HTMLElement) {
  const line = parseFloat(getComputedStyle(page).lineHeight);
  const blocks = [...page.querySelectorAll<HTMLElement>(TEXT)].filter(
    (el) => !el.closest('[data-free], .page-head') && !el.parentElement!.closest(TEXT),
  );
  for (const el of blocks) el.style.marginTop = el.style.paddingTop = '';

  const origin = page.getBoundingClientRect().top;
  // Headings are nudged with `top` (see notebook.css); measure their box, not the nudge.
  const topOf = (el: HTMLElement, cs: CSSStyleDeclaration) =>
    el.getBoundingClientRect().top - origin - (cs.position === 'relative' ? parseFloat(cs.top) || 0 : 0);

  for (const el of blocks) {
    const cs = getComputedStyle(el);
    const top = topOf(el, cs);
    const push = (line - (((top % line) + line) % line)) % line;
    if (push < 0.5 || line - push < 0.5) continue;
    el.style.marginTop = `${parseFloat(cs.marginTop) + push}px`;
    // A collapsed margin can swallow the push; padding can't collapse.
    if (Math.abs(topOf(el, cs) - top - push) > 0.5) {
      el.style.marginTop = '';
      el.style.paddingTop = `${push}px`;
    }
  }
}
