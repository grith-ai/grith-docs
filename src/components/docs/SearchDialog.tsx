'use client';

import { useEffect, useRef, useState } from 'react';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

// Loads the Pagefind UI on demand. Pagefind is only present after `npm run build`
// (via the postbuild step). In `npm run dev`, the dialog opens but shows
// "search not available — run `npm run build` first".
export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (!open || initRef.current) return;
    initRef.current = true;

    // Inject pagefind UI CSS and JS dynamically so they don't ship in the
    // main bundle for users who never open search.
    const cssId = 'pagefind-ui-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = '/pagefind/pagefind-ui.css';
      document.head.appendChild(link);
    }

    const init = async () => {
      try {
        // @ts-expect-error — runtime-loaded ESM, no types
        const mod = await import(/* webpackIgnore: true */ '/pagefind/pagefind-ui.js');
        const PagefindUI = mod.PagefindUI ?? mod.default?.PagefindUI ?? mod.default;
        if (containerRef.current && PagefindUI) {
          new PagefindUI({
            element: containerRef.current,
            showSubResults: true,
            showImages: false,
            resetStyles: false,
            placeholder: 'Search the docs…',
          });
        } else {
          setUnavailable(true);
        }
      } catch {
        setUnavailable(true);
      }
    };
    init();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-text/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mt-24 w-full max-w-2xl rounded-lg border border-border bg-bg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-border px-4 py-2 font-label text-[10px] uppercase tracking-[0.18em] text-text-dim">
          Search docs · Esc to close
        </div>
        {unavailable ? (
          <div className="p-6 text-sm text-text-secondary">
            Search index not available. Run <code className="font-code">npm run build</code> to
            generate the Pagefind index, or visit the deployed site at{' '}
            <a href="https://docs.grith.ai" className="text-green">
              docs.grith.ai
            </a>
            .
          </div>
        ) : (
          <div ref={containerRef} className="p-4" />
        )}
      </div>
    </div>
  );
}
