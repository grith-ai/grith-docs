export interface DocMeta {
  title: string;
  description: string;
  section: string;
  order: number;
  tier?: 'community' | 'pro' | 'enterprise';
  version?: string;
  lastUpdated?: string;
  editUrl?: string;
}

export interface Doc {
  slug: string;
  meta: DocMeta;
  content: string;
}

export interface SectionInfo {
  slug: string;
  label: string;
  order: number;
}

export const SECTIONS: SectionInfo[] = [
  { slug: 'getting-started', label: 'Getting Started', order: 0 },
  { slug: 'concepts', label: 'Concepts', order: 1 },
  { slug: 'reference', label: 'Reference', order: 2 },
  { slug: 'guides', label: 'Guides', order: 3 },
  { slug: 'security', label: 'Security', order: 4 },
  { slug: 'analytics', label: 'Analytics', order: 5 },
  { slug: 'pro', label: 'Pro & Licensing', order: 6 },
  { slug: 'enterprise', label: 'Enterprise', order: 7 },
];
