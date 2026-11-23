// Buttons whose label ends in "→" stretch on hover: the arrow slides out and the button widens
// (styles: .btn-stretch / .btn-arrow in style.css). The arrow is wrapped here, once for every
// page, instead of editing each button's markup. Plain text links (no fill or border) are left alone.

function lastText(el: Element): Text | null {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let last: Text | null = null;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) if ((n as Text).data.trim()) last = n as Text;
  return last;
}

const clear = (c: string) => c === 'transparent' || /^rgba\(.*,\s*0\)$/.test(c);

function looksLikeButton(el: HTMLElement): boolean {
  if (el.offsetHeight > 80) return false; // whole cards that end in "Read →" are not buttons
  const cs = getComputedStyle(el);
  const filled = !clear(cs.backgroundColor);
  const bordered = parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none' && !clear(cs.borderTopColor);
  return (filled || bordered) && parseFloat(cs.borderTopLeftRadius) >= 4;
}

export function arrowButtons(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('a, button').forEach((el) => {
    if (el.classList.contains('btn-stretch')) return;
    const text = lastText(el);
    if (!text || !/→\s*$/.test(text.data) || !looksLikeButton(el)) return;

    // "Label →" becomes "Label" + <span>&nbsp;→</span>: the no-break space keeps the gap even
    // where the label and arrow end up as separate flex items
    const head = text.data.slice(0, text.data.lastIndexOf('→'));
    const label = head.replace(/\s+$/, '');
    const arrow = document.createElement('span');
    arrow.className = 'btn-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = (label.length < head.length ? ' ' : '') + '→';
    text.data = label;
    text.after(arrow);

    // a flex container with a gap would add it between label and arrow: take it back
    const box = arrow.parentElement;
    if (box && label) {
      const cs = getComputedStyle(box);
      const gap = cs.display.includes('flex') ? parseFloat(cs.columnGap) || 0 : 0;
      if (gap) arrow.style.setProperty('--arw-base', `${-gap}px`);
    }
    el.classList.add('btn-stretch');
  });
}
