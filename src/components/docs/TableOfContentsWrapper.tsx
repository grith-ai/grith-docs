'use client';

import TableOfContents from './TableOfContents';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContentsWrapper({ headings }: { headings: TocItem[] }) {
  return <TableOfContents headings={headings} />;
}
