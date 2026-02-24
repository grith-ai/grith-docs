import Link from 'next/link';
import type { Doc } from '@/lib/docs';

export default function PrevNext({ prev, next }: { prev: Doc | null; next: Doc | null }) {
  return (
    <div className="mt-12 flex items-stretch gap-4 border-t border-border pt-6">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex flex-1 flex-col rounded-lg border border-border p-4 transition-colors hover:border-text-dim"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.12em] text-text-dim">
            Previous
          </span>
          <span className="mt-1 text-sm text-text-secondary transition-colors group-hover:text-text">
            {prev.meta.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex flex-1 flex-col items-end rounded-lg border border-border p-4 text-right transition-colors hover:border-text-dim"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.12em] text-text-dim">
            Next
          </span>
          <span className="mt-1 text-sm text-text-secondary transition-colors group-hover:text-text">
            {next.meta.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
