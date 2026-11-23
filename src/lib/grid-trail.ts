// Touch trail for the interactive CTA grids (mouse users get CSS :hover): the cell under the
// finger gets `is-lit` and lets go shortly after, like the home page "Get in touch" grid.
export function gridTrail(rootSelector: string, cellSelector: string) {
  document.querySelectorAll<HTMLElement>(rootSelector).forEach((root) => {
    let active: Element | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const clear = () => { active?.classList.remove('is-lit'); active = null; };
    const light = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const cell = document.elementFromPoint(t.clientX, t.clientY)?.closest(cellSelector);
      if (!cell || cell === active || !root.contains(cell)) return;
      active?.classList.remove('is-lit');
      active = cell;
      cell.classList.add('is-lit');
      clearTimeout(timer);
      timer = setTimeout(clear, 700);
    };
    root.addEventListener('touchstart', light, { passive: true });
    root.addEventListener('touchmove', light, { passive: true });
    root.addEventListener('touchend', () => { clearTimeout(timer); timer = setTimeout(clear, 500); }, { passive: true });
  });
}
