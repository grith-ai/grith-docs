'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GITHUB_URL, WEBSITE_URL } from '@/lib/constants';

export default function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[rgba(250,250,248,0.92)] shadow-[0_1px_12px_rgba(0,168,90,0.08)] backdrop-blur-[16px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button className="lg:hidden" onClick={onMenuToggle} aria-label="Toggle sidebar">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h14M3 10h14M3 14h14" />
          </svg>
        </button>

        <Link href="/" className="flex items-center gap-2.5">
          <svg
            viewBox="0 0 32 32"
            width="28"
            height="28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2L28.5 9.25V23.75L16 31L3.5 23.75V9.25L16 2Z"
              stroke="#00a85a"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M16 8L23 12V20L16 24L9 20V12L16 8Z"
              stroke="#00a85a"
              strokeWidth="1"
              fill="rgba(0,168,90,0.06)"
            />
          </svg>
          <span className="font-heading text-lg font-extrabold tracking-[-0.5px]">
            <span className="text-text">grith</span>
            <span className="text-green">.ai</span>
          </span>
          <span className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-label text-[10px] uppercase tracking-[0.12em] text-text-dim">
            docs
          </span>
        </Link>

        <div className="flex-1" />

        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-dim transition-colors hover:border-border-dark"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="6" cy="6" r="5" />
            <path d="M10 10l3.5 3.5" />
          </svg>
          <span className="hidden sm:inline">Search docs...</span>
          <kbd className="ml-2 hidden rounded border border-border bg-bg px-1.5 py-0.5 font-label text-[10px] sm:inline">
            Ctrl K
          </kbd>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href={WEBSITE_URL}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text"
          >
            Website
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-[13px] font-semibold text-text transition-all hover:bg-surface-2"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
