export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const slugCounts = new Map<string, number>();
  const regex = /^#{2,3}\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const text = match[1].trim();
    const level = match[0].indexOf(' ');
    const base = slugify(text);
    const count = slugCounts.get(base) ?? 0;
    const id = count === 0 ? base : `${base}-${count}`;
    slugCounts.set(base, count + 1);
    headings.push({ id, text, level });
  }

  return headings;
}
