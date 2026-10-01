import { visit } from 'unist-util-visit';

function getText(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(getText).join('');
  return '';
}

// Tags each <td> (except the first column, which is the row's own label)
// with a data-label attribute from its column header - lets mobile CSS
// render each table row as a stacked "label: value" card instead of a
// horizontally-scrolling table that's hard to actually read on a phone.
// Desktop keeps the normal table layout; data-label is unused there.
export default function rehypeResponsiveTables() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'table') return;
      const thead = node.children.find((c) => c.tagName === 'thead');
      const tbody = node.children.find((c) => c.tagName === 'tbody');
      if (!thead || !tbody) return;

      const headerRow = thead.children.find((c) => c.tagName === 'tr');
      if (!headerRow) return;
      const headers = headerRow.children
        .filter((c) => c.tagName === 'th')
        .map((th) => getText(th).trim());

      tbody.children
        .filter((c) => c.tagName === 'tr')
        .forEach((tr) => {
          const cells = tr.children.filter((c) => c.tagName === 'td');
          cells.forEach((td, i) => {
            if (i === 0) return;
            const label = headers[i];
            if (!label) return;
            td.properties = td.properties || {};
            td.properties['data-label'] = label;
          });
        });
    });
  };
}
