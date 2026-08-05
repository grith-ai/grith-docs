import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
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
      <article className="max-w-[720px] min-w-0 flex-1 px-6 py-8 lg:px-10">
        <Breadcrumbs slug={doc.slug} />

        <div className="mt-4 flex items-center gap-3">
          <h1 className="font-heading text-text text-3xl font-semibold tracking-[-0.02em]">
            {doc.meta.title}
          </h1>
          {doc.meta.tier && doc.meta.tier !== 'community' && (
            <Badge variant={doc.meta.tier as 'pro' | 'enterprise'}>{doc.meta.tier}</Badge>
          )}
        </div>

        {doc.meta.description && (
          <p className="text-text-secondary mt-3 text-lg">{doc.meta.description}</p>
        )}

        <div className="prose-docs mt-8">
          <MDXRemote
            source={doc.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <PrevNext prev={prev} next={next} />

        <div className="text-text-dim mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          {doc.meta.lastUpdated && <span>Last updated: {doc.meta.lastUpdated}</span>}
          {doc.meta.editUrl && (
            <a
              href={doc.meta.editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-text transition-colors"
            >
              Edit this page on GitHub →
            </a>
          )}
        </div>
      </article>

      <TableOfContentsWrapper headings={headings} />
    </div>
  );
}
