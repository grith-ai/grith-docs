'use client';

import { useState } from 'react';

interface TerminalProps {
  command?: string;
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Terminal({ command, children, title = 'terminal', className = '' }: TerminalProps) {
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
      className={`my-6 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-label text-[10px] uppercase tracking-[0.12em] text-text-dim">
          {title}
        </span>
      </div>
      <div className="flex items-start justify-between px-4 py-3">
        <pre className="flex-1 overflow-x-auto font-code text-sm text-text">
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
            className="ml-4 shrink-0 rounded-md p-1.5 text-text-dim transition-colors hover:text-text"
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
