import Link from 'next/link';
import { SECTIONS } from '@/lib/types';

export default function Breadcrumbs({ slug }: { slug: string }) {
  const parts = slug.split('/');
  const sectionSlug = parts[0];
  const section = SECTIONS.find((s) => s.slug === sectionSlug);

  return (
    <nav className="text-text-dim flex items-center gap-1.5 text-sm">
      <Link href="/" className="hover:text-text-secondary transition-colors">
        Docs
      </Link>
      <span>/</span>
      {section && (
        <>
          <span className="hover:text-text-secondary transition-colors">{section.label}</span>
          <span>/</span>
        </>
      )}
    </nav>
  );
}
