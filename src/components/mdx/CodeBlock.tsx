'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language = 'text',
  title,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`my-6 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2">
        <span className="font-label text-[10px] uppercase tracking-[0.12em] text-text-dim">
          {title || language}
        </span>
        <button
          onClick={copyToClipboard}
          className="rounded-md p-1.5 text-text-dim transition-colors hover:text-text"
          aria-label="Copy code"
        >
          {copied ? (
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 3L5 11l-2.5-2.5" />
            </svg>
          ) : (
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="7" height="7" rx="1" />
              <path d="M5 5V3a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-2" />
            </svg>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-code text-sm leading-relaxed text-text">{code}</code>
      </pre>
    </div>
  );
}
