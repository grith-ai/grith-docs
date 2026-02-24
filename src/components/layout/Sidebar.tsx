'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Badge from '@/components/shared/Badge';

interface SidebarDoc {
  slug: string;
  title: string;
  tier?: string;
}

interface SidebarSection {
  slug: string;
  label: string;
  docs: SidebarDoc[];
}

export default function Sidebar({
  sections,
  open,
  onClose,
}: {
  sections: SidebarSection[];
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (slug: string) => {
    setCollapsed((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const isActive = (docSlug: string) => pathname === `/docs/${docSlug}`;

  const nav = (
    <nav className="flex flex-col gap-1 py-4">
      {sections.map((section) => (
        <div key={section.slug}>
          <button
            onClick={() => toggle(section.slug)}
            className="flex w-full items-center justify-between px-4 py-2 font-label text-[10px] uppercase tracking-[0.12em] text-text-dim transition-colors hover:text-text-secondary"
          >
            {section.label}
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${collapsed[section.slug] ? '' : 'rotate-90'}`}
            >
              <path d="M4 2l4 4-4 4" />
            </svg>
          </button>
          {!collapsed[section.slug] && (
            <ul className="mb-2">
              {section.docs.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={`/docs/${doc.slug}`}
                    onClick={onClose}
                    className={`flex items-center gap-2 border-l-2 px-4 py-1.5 text-sm transition-colors ${
                      isActive(doc.slug)
                        ? 'border-green text-green'
                        : 'border-transparent text-text-secondary hover:border-border hover:text-text'
                    }`}
                  >
                    <span className="truncate">{doc.title}</span>
                    {doc.tier === 'pro' && <Badge variant="pro">Pro</Badge>}
                    {doc.tier === 'enterprise' && <Badge variant="enterprise">Ent</Badge>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm lg:hidden" onClick={onClose}>
          <aside
            className="h-full w-[280px] overflow-y-auto border-r border-border bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            {nav}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-[260px] shrink-0 overflow-y-auto border-r border-border bg-surface lg:block">
        <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto">{nav}</div>
      </aside>
    </>
  );
}
