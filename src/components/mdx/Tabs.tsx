'use client';

import { useState, useEffect } from 'react';

interface TabsProps {
  items: string[];
  children: React.ReactNode[];
  storageKey?: string;
}

export default function Tabs({ items, children, storageKey }: TabsProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(`tabs-${storageKey}`);
      if (saved !== null) {
        const idx = items.indexOf(saved);
        if (idx !== -1) setActive(idx);
      }
    }
  }, [items, storageKey]);

  const select = (idx: number) => {
    setActive(idx);
    if (storageKey) {
      localStorage.setItem(`tabs-${storageKey}`, items[idx]);
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
