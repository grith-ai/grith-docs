import { notFound, redirect } from 'next/navigation';
import { getDocBySlug, getAllDocs, getAdjacentDocs } from '@/lib/docs';
import { extractHeadings } from '@/lib/mdx';
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
    redirect('/docs/start/what-is-grith');
  }

  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const headings = extractHeadings(doc.content);
  const { prev, next } = getAdjacentDocs(doc.slug);

  return <DocPage doc={doc} headings={headings} prev={prev} next={next} />;
}
