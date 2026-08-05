'use client';

import { useSyncExternalStore } from 'react';

import { THEME_STORAGE_KEY } from '@/lib/theme-script';

type Theme = 'dark' | 'light';

/**
 * Theme toggle pill, ported from grith-website (F4): mono-label `THEME: DARK`
 * / `THEME: LIGHT`. Flips `data-theme` on <html> and persists the choice to
 * localStorage ('grith-theme'), matching the ThemeScript FOUC guard.
 *
 * The current theme is read from the `data-theme` attribute itself via
 * useSyncExternalStore, so multiple toggle instances stay in sync and the
 * server render falls back to the dark default.
 *
 * Token-class styling only, so it re-skins with the theme it controls.
 */

function subscribeToThemeAttribute(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

// The server cannot know the visitor's theme; assume the dark default.
function readServerTheme(): Theme {
  return 'dark';
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const current = useSyncExternalStore(subscribeToThemeAttribute, readTheme, readServerTheme);
  const next: Theme = current === 'light' ? 'dark' : 'light';

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode, blocked cookies): the toggle
      // still applies for this page view, it just will not persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className={`rounded-pill border-border font-label text-text-secondary hover:border-border-dark hover:text-text inline-flex items-center border bg-transparent px-3 py-1.5 text-xs tracking-[0.1em] uppercase transition-colors duration-150 ${className}`}
    >
      Theme: {current}
    </button>
  );
}
