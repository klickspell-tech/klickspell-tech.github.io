import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Klickspell Blog — Web Engineering & Digital Products',
    description: 'Technical guides, Shopify development tutorials, headless commerce architecture, and web performance optimization by Atul Bhatt and the Klickspell team.',
    site: context.site || 'https://klickspell.com',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author || 'Atul Bhatt',
      link: `/blog/${post.slug}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
