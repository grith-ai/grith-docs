'use client';

import { useState } from 'react';

interface TerminalProps {
  command?: string;
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

// Terminal frame on the fixed code palette (code panels never invert):
// interior stays dark in both themes, only the outer border follows the page
// theme. Title-bar dots are the fixed --g-code-dot colour.
export default function Terminal({
  command,
  children,
  title = 'terminal',
  className = '',
}: TerminalProps) {
  const [copied, setCopied] = useState(false);

  const copyText = command || (typeof children === 'string' ? children : '');

  const copyToClipboard = async () => {
    if (!copyText) return;
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-code border-border bg-terminal-bg my-6 overflow-hidden border ${className}`}
    >
      <div className="border-terminal-rule flex items-center gap-1.5 border-b px-4 py-2.5">
        <span className="bg-terminal-dot h-2.5 w-2.5 rounded-full" />
        <span className="bg-terminal-dot h-2.5 w-2.5 rounded-full" />
        <span className="bg-terminal-dot h-2.5 w-2.5 rounded-full" />
        <span className="font-label text-terminal-muted ml-2 text-[10px] tracking-[0.12em] uppercase">
          {title}
        </span>
      </div>
      <div className="flex items-start justify-between px-4 py-3">
        <pre className="font-code text-terminal-text flex-1 overflow-x-auto text-sm">
          {command ? (
            <code>
              <span className="text-green">$</span> {command}
            </code>
          ) : (
            <code>{children}</code>
          )}
        </pre>
        {copyText && (
          <button
            onClick={copyToClipboard}
            className="text-terminal-muted hover:text-terminal-text ml-4 shrink-0 rounded-md p-1.5 transition-colors"
            aria-label="Copy command"
          >
            {copied ? (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 3L6 13l-3-3" />
              </svg>
            ) : (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="6" width="8" height="8" rx="1" />
                <path d="M6 6V3a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-3" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
