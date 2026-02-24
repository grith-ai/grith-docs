import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx';
import Breadcrumbs from './Breadcrumbs';
import PrevNext from './PrevNext';
import TableOfContentsWrapper from './TableOfContentsWrapper';
import Badge from '@/components/shared/Badge';
import type { Doc } from '@/lib/types';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface DocPageProps {
  doc: Doc;
  headings: TocItem[];
  prev: Doc | null;
  next: Doc | null;
}

export default function DocPage({ doc, headings, prev, next }: DocPageProps) {
  return (
    <div className="flex flex-1 gap-8">
      <article className="min-w-0 max-w-[720px] flex-1 px-6 py-8 lg:px-10">
        <Breadcrumbs slug={doc.slug} />

        <div className="mt-4 flex items-center gap-3">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text">
            {doc.meta.title}
          </h1>
          {doc.meta.tier && doc.meta.tier !== 'community' && (
            <Badge variant={doc.meta.tier as 'pro' | 'enterprise'}>{doc.meta.tier}</Badge>
          )}
        </div>

        {doc.meta.description && (
          <p className="mt-3 text-lg text-text-secondary">{doc.meta.description}</p>
        )}

        <div className="prose-docs mt-8">
          <MDXRemote source={doc.content} components={mdxComponents} />
        </div>

        <PrevNext prev={prev} next={next} />

        {doc.meta.lastUpdated && (
          <p className="mt-6 text-xs text-text-dim">Last updated: {doc.meta.lastUpdated}</p>
        )}
      </article>

      <TableOfContentsWrapper headings={headings} />
    </div>
  );
}
