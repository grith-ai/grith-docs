'use client';

import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: TocItem[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-20 hidden w-[200px] shrink-0 xl:block">
      <h4 className="font-label text-text-dim mb-3 text-[10px] font-medium tracking-[0.1em] uppercase">
        On this page
      </h4>
      <ul className="border-border space-y-1 border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block border-l-2 py-1 text-sm transition-colors ${h.level === 3 ? 'pl-6' : 'pl-4'} ${
                activeId === h.id
                  ? 'border-green text-accent-text font-medium'
                  : 'text-text-dim hover:text-text-secondary border-transparent'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
