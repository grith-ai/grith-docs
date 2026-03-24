'use client';

import { useState } from 'react';

interface TabsProps {
  items: string[];
  children: React.ReactNode[];
  storageKey?: string;
}

export default function Tabs({ items, children, storageKey }: TabsProps) {
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined' || !storageKey) {
      return 0;
    }
    const saved = window.localStorage.getItem(`tabs-${storageKey}`);
    if (saved !== null) {
      const idx = items.indexOf(saved);
      if (idx !== -1) {
        return idx;
      }
    }
    return 0;
  });

  const select = (idx: number) => {
    setActive(idx);
    if (storageKey) {
      window.localStorage.setItem(`tabs-${storageKey}`, items[idx]);
    }
  };

  return (
    <div className="my-6">
      <div className="flex gap-0 border-b border-border">
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => select(i)}
            className={`border-b-2 px-4 py-2 text-sm transition-colors ${
              active === i
                ? 'border-green font-medium text-green-dark'
                : 'border-transparent text-text-dim hover:text-text-secondary'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="pt-4">{children[active]}</div>
    </div>
  );
}
