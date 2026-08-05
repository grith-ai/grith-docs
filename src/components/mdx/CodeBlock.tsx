'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

// Code panel on the fixed code palette: interior stays dark in both themes,
// only the outer border follows the page theme.
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
      className={`rounded-code border-border bg-terminal-bg my-6 overflow-hidden border ${className}`}
    >
      <div className="border-terminal-rule flex items-center justify-between border-b px-4 py-2">
        <span className="font-label text-terminal-muted text-[10px] tracking-[0.12em] uppercase">
          {title || language}
        </span>
        <button
          onClick={copyToClipboard}
          className="text-terminal-muted hover:text-terminal-text rounded-md p-1.5 transition-colors"
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
        <code className="font-code text-terminal-text text-sm leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}
