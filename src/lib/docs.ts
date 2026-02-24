import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SECTIONS } from './types';
import type { Doc, DocMeta } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');

function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
}

export function getDocBySlug(slugParts: string[]): Doc | null {
  const filePath = path.join(CONTENT_DIR, ...slugParts) + '.mdx';
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug: slugParts.join('/'),
    meta: data as DocMeta,
    content,
  };
}

export function getAllDocs(): Doc[] {
  const docs: Doc[] = [];

  for (const section of SECTIONS) {
    const sectionDir = path.join(CONTENT_DIR, section.slug);
    const files = getMdxFiles(sectionDir);

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '');
      const filePath = path.join(sectionDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);

      docs.push({
        slug: `${section.slug}/${slug}`,
        meta: data as DocMeta,
        content,
      });
    }
  }

  return docs;
}

export function getDocsForSection(sectionSlug: string): Doc[] {
  return getAllDocs()
    .filter((d) => d.meta.section === sectionSlug)
    .sort((a, b) => (a.meta.order ?? 99) - (b.meta.order ?? 99));
}

export function getAdjacentDocs(currentSlug: string): { prev: Doc | null; next: Doc | null } {
  const allDocs = getAllDocs().sort((a, b) => {
    const sA = SECTIONS.find((s) => s.slug === a.meta.section)?.order ?? 99;
    const sB = SECTIONS.find((s) => s.slug === b.meta.section)?.order ?? 99;
    if (sA !== sB) return sA - sB;
    return (a.meta.order ?? 99) - (b.meta.order ?? 99);
  });

  const idx = allDocs.findIndex((d) => d.slug === currentSlug);
  return {
    prev: idx > 0 ? allDocs[idx - 1] : null,
    next: idx < allDocs.length - 1 ? allDocs[idx + 1] : null,
  };
}
