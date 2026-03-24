import type { ReactNode } from 'react';
import { slugify } from '@/lib/mdx';
import Callout from './Callout';
import Tabs from './Tabs';
import Terminal from './Terminal';
import CodeBlock from './CodeBlock';
import ConfigExample from './ConfigExample';
import Badge from '@/components/shared/Badge';
import ScoreCalculator from './ScoreCalculator';
import ArchitectureDiagram from './ArchitectureDiagram';
import FilterTable from './FilterTable';

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const el = node as { props: { children?: ReactNode } };
    return getTextContent(el.props.children);
  }
  return '';
}

// Tracks slug usage across headings within a render pass to deduplicate
// (e.g. two "## Setup" headings become "setup" and "setup-1").
const slugCounts = new Map<string, number>();

function createHeading(level: number) {
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';
  return function Heading({ children }: { children?: ReactNode }) {
    const text = getTextContent(children);
    const base = slugify(text);
    const count = slugCounts.get(base) ?? 0;
    const id = count === 0 ? base : `${base}-${count}`;
    slugCounts.set(base, count + 1);
    return <Tag id={id}>{children}</Tag>;
  };
}

export const mdxComponents = {
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  Callout,
  Tabs,
  Terminal,
  CodeBlock,
  ConfigExample,
  Badge,
  ScoreCalculator,
  ArchitectureDiagram,
  FilterTable,
};
