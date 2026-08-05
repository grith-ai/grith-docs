import Link from 'next/link';
import type { Doc } from '@/lib/types';

const linkClass =
  'group flex flex-1 flex-col rounded-card border border-border p-4 transition-colors duration-150 hover:border-border-dark';

export default function PrevNext({ prev, next }: { prev: Doc | null; next: Doc | null }) {
  return (
    <div className="border-border mt-12 flex items-stretch gap-4 border-t pt-6">
      {prev ? (
        <Link href={`/docs/${prev.slug}`} className={linkClass}>
          <span className="font-label text-text-dim text-[10px] font-medium tracking-[0.1em] uppercase">
            Previous
          </span>
          <span className="text-text-secondary group-hover:text-text mt-1 text-sm transition-colors">
            {prev.meta.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link href={`/docs/${next.slug}`} className={`${linkClass} items-end text-right`}>
          <span className="font-label text-text-dim text-[10px] font-medium tracking-[0.1em] uppercase">
            Next
          </span>
          <span className="text-text-secondary group-hover:text-text mt-1 text-sm transition-colors">
            {next.meta.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
