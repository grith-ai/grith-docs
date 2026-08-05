import { isValidElement, type ReactNode } from 'react';
import { highlightCode } from '@/lib/highlight';

/**
 * Server-side replacement for markdown fenced code blocks (DS6).
 *
 * MDX renders a fence as `<pre><code class="language-x">...</code></pre>`;
 * this async RSC intercepts the `pre`, runs shiki at build time, and emits
 * pre-coloured token spans. Static export ships no highlighting JS.
 *
 * Only plain markdown fences pass through here - the Terminal, CodeBlock,
 * and ConfigExample MDX components render their own `<pre>` elements
 * directly in JSX, which the MDX component registry never rewrites.
 * Inline code (single backtick) has no wrapping `pre` and is untouched.
 */

interface HighlightedPreProps {
  children?: ReactNode;
}

function textOf(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (typeof node === 'object' && 'props' in node) {
    const el = node as { props: { children?: ReactNode } };
    return textOf(el.props.children);
  }
  return '';
}

export default async function HighlightedPre({ children }: HighlightedPreProps) {
  if (!isValidElement(children)) {
    // Not the expected single <code> child - render unchanged
    return <pre>{children}</pre>;
  }

  const codeProps = children.props as { className?: string; children?: ReactNode };
  const lang = /language-([\w+.-]+)/.exec(codeProps.className ?? '')?.[1];
  const code = textOf(codeProps.children).replace(/\n$/, '');
  const html = await highlightCode(code, lang);

  // The wrapper div is inert: .prose-docs pre styles the shiki pre inside it,
  // and the pre's 1.5em margins collapse through to match sibling spacing
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
