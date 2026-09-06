export interface Topic {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  keywords: string[];
}

export const TOPICS: Record<string, Topic> = {
  'shopify': {
    slug: 'shopify',
    name: 'Shopify & E-Commerce',
    shortName: 'Shopify',
    title: 'Shopify Development & E-Commerce Engineering Guides | Klickspell',
    description: 'Technical guides on custom Shopify theme development, Liquid architecture, app integrations, Judge.me widgets, and store optimization by Klickspell.',
    keywords: ['shopify', 'e-commerce', 'liquid', 'store setup', 'judge.me', 'reviews', 'store management', 'catalog', 'billing', 'cro']
  },
  'web-performance': {
    slug: 'web-performance',
    name: 'Web Performance & Core Web Vitals',
    shortName: 'Performance',
    title: 'Web Performance & Core Web Vitals Optimization Guides | Klickspell',
    description: 'Real-world case studies and technical strategies for achieving 99+ PageSpeed scores, sub-second LCP, zero layout shifts, and asset optimization.',
    keywords: ['web performance', 'core web vitals', 'lighthouse', 'pagespeed', 'performance', 'bundling', 'network calls', 'astro']
  },
  'react': {
    slug: 'react',
    name: 'React & Frontend Engineering',
    shortName: 'React & Frontend',
    title: 'React & Frontend Architecture Engineering Guides | Klickspell',
    description: 'In-depth engineering articles on React rendering, Zustand state management, JavaScript internals, and modern frontend development patterns.',
    keywords: ['react', 'javascript', 'frontend', 'zustand', 'webdev', 'css', 'front-end-development', 'npm', 'webpack', 'babel', 'jsx']
  },
  'devops': {
    slug: 'devops',
    name: 'DevOps, Cloud & Infrastructure',
    shortName: 'DevOps & Cloud',
    title: 'DevOps, Docker & Cloud Infrastructure Guides | Klickspell',
    description: 'Practical guides on Docker containerization, ERPNext & Frappe enterprise setups, Oracle Cloud, Linux system administration, and Git workflows.',
    keywords: ['devops', 'docker', 'erpnext', 'frappe', 'linux', 'oracle cloud', 'vps', 'cloud', 'git', 'github', 'version control', 'arm64', 'apple silicon']
  }
};

export function getPostTopic(tags: string[] = []): Topic {
  const lowerTags = tags.map(t => t.toLowerCase());

  if (lowerTags.some(t => TOPICS['web-performance'].keywords.includes(t))) {
    return TOPICS['web-performance'];
  }
  if (lowerTags.some(t => TOPICS['shopify'].keywords.includes(t))) {
    return TOPICS['shopify'];
  }
  if (lowerTags.some(t => TOPICS['react'].keywords.includes(t))) {
    return TOPICS['react'];
  }
  if (lowerTags.some(t => TOPICS['devops'].keywords.includes(t))) {
    return TOPICS['devops'];
  }

  return TOPICS['shopify']; // default fallback
}
