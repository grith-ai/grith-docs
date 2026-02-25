import type { ReactNode } from 'react';
import { slugify } from '@/lib/mdx';
import Callout from './Callout';
import Tabs from './Tabs';
import Terminal from './Terminal';
import CodeBlock from './CodeBlock';
import ConfigExample from './ConfigExample';
import Badge from '@/components/shared/Badge';

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

function createHeading(level: number) {
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';
  return function Heading({ children }: { children?: ReactNode }) {
    const text = getTextContent(children);
    const id = slugify(text);
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
};
