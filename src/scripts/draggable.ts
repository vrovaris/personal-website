// drag [data-drag] elements; positions reset on navigation
let top = 10;

export function draggable() {
  document.querySelectorAll<HTMLElement>('[data-drag]').forEach((el) => {
    let startX = 0, startY = 0, x = 0, y = 0, moved = false;

    const move = (e: PointerEvent) => {
      x = e.clientX - startX;
      y = e.clientY - startY;
      moved ||= Math.abs(x) + Math.abs(y) > 4;
      el.style.translate = `${x}px ${y}px`;
    };
    const drop = () => {
      el.classList.remove('is-held');
      removeEventListener('pointermove', move);
      removeEventListener('pointerup', drop);
    };

    // window listeners, not pointer capture, so inner buttons still get clicks
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || e.pointerType === 'touch') return;
      e.preventDefault();
      startX = e.clientX - x;
      startY = e.clientY - y;
      moved = false;
      el.style.zIndex = String(++top);
      el.classList.add('is-held');
      addEventListener('pointermove', move);
      addEventListener('pointerup', drop);
    });

    // a drag isn't a click
    el.addEventListener('click', (e) => { if (moved) e.stopImmediatePropagation(); }, true);
  });
}
