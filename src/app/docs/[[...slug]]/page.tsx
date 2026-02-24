import { notFound } from 'next/navigation';
import { getDocBySlug, getAllDocs, getAdjacentDocs } from '@/lib/docs';
import { serializeMdx, extractHeadings } from '@/lib/mdx';
import DocPage from '@/components/docs/DocPage';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) return { title: 'Documentation' };

  const doc = getDocBySlug(slug);
  if (!doc) return { title: 'Not Found' };

  return {
    title: doc.meta.title,
    description: doc.meta.description,
  };
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    // Docs index — redirect to first page
    const docs = getAllDocs();
    if (docs.length > 0) {
      const firstDoc = docs.sort((a, b) => {
        const sectionOrder: Record<string, number> = {
          'getting-started': 0,
          concepts: 1,
          reference: 2,
          guides: 3,
          security: 4,
          analytics: 5,
          pro: 6,
          enterprise: 7,
        };
        const sA = sectionOrder[a.meta.section] ?? 99;
        const sB = sectionOrder[b.meta.section] ?? 99;
        if (sA !== sB) return sA - sB;
        return (a.meta.order ?? 99) - (b.meta.order ?? 99);
      })[0];
      const { redirect } = await import('next/navigation');
      redirect(`/docs/${firstDoc.slug}`);
    }
    notFound();
  }

  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const mdxSource = await serializeMdx(doc.content);
  const headings = extractHeadings(doc.content);
  const { prev, next } = getAdjacentDocs(doc.slug);

  return <DocPage doc={doc} mdxSource={mdxSource} headings={headings} prev={prev} next={next} />;
}
