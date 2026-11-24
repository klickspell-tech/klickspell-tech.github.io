import { visit } from 'unist-util-visit';

// Cleans up blog post bodies (many were imported from dev.to and Medium):
//
// 1. Heading levels. The page template already renders the post title as the only <h1>, but
//    imported posts often start their sections at h1, h3 or h4, jump levels (h1 -> h3 -> h5) or
//    use them out of order (#### sections, then a ### sign-off). Screen readers and search
//    engines read that as a broken outline. Each heading becomes one level below the nearest
//    earlier heading that outranks it, or h2 if none does, so the outline starts at h2 and never
//    skips: (4,4,3) -> (2,2,2), (1,3,5) -> (2,3,4). Posts written with ## / ### come out unchanged.
//
// 2. Images. Body images had no loading hint, so every screenshot in a long post downloaded
//    up front. All but the first get loading="lazy" (the first may be the largest thing on
//    screen, so it loads normally); all get decoding="async". Attributes already set are kept.
export default function rehypeBlogContent() {
  return (tree) => {
    const headings = [];
    const images = [];
    visit(tree, 'element', (node) => {
      if (/^h[1-6]$/.test(node.tagName)) headings.push(node);
      else if (node.tagName === 'img') images.push(node);
    });

    const open = []; // enclosing headings: { from: original level, to: new level }
    for (const h of headings) {
      const from = Number(h.tagName[1]);
      while (open.length && open[open.length - 1].from >= from) open.pop();
      const to = open.length ? Math.min(open[open.length - 1].to + 1, 6) : 2;
      open.push({ from, to });
      h.tagName = `h${to}`;
    }

    images.forEach((img, i) => {
      img.properties = img.properties || {};
      if (i > 0 && img.properties.loading == null) img.properties.loading = 'lazy';
      if (img.properties.decoding == null) img.properties.decoding = 'async';
    });
  };
}
