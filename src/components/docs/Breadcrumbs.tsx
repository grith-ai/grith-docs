import Link from 'next/link';
import { SECTIONS } from '@/lib/types';

export default function Breadcrumbs({ slug }: { slug: string }) {
  const parts = slug.split('/');
  const sectionSlug = parts[0];
  const section = SECTIONS.find((s) => s.slug === sectionSlug);

  return (
    <nav className="flex items-center gap-1.5 text-sm text-text-dim">
      <Link href="/" className="transition-colors hover:text-text-secondary">
        Docs
      </Link>
      <span>/</span>
      {section && (
        <>
          <span className="transition-colors hover:text-text-secondary">{section.label}</span>
          <span>/</span>
        </>
      )}
    </nav>
  );
}
