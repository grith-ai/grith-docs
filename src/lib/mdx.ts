import { serialize } from 'next-mdx-remote/serialize';

export async function serializeMdx(content: string) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const regex = /^#{2,3}\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const text = match[1].trim();
    const level = match[0].indexOf(' ');
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ id, text, level });
  }

  return headings;
}
