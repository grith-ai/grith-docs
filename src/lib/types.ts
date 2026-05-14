export interface DocMeta {
  title: string;
  description: string;
  section: string;
  order: number;
  tier?: 'community' | 'pro' | 'enterprise';
  status?: 'shipped' | 'planned';
  since?: string;
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
  blurb?: string;
}

export const SECTIONS: SectionInfo[] = [
  { slug: 'start', label: 'Start here', order: 0, blurb: 'Install grith, pick your agent, run your first supervised session.' },
  { slug: 'concepts', label: 'Concepts', order: 1, blurb: 'The threat model, the pipeline, the scoring, and how everything fits together.' },
  { slug: 'cli', label: 'CLI reference', order: 2, blurb: 'Every command, every flag.' },
  { slug: 'filters', label: 'Filter reference', order: 3, blurb: 'The 17 filters in detail.' },
  { slug: 'config', label: 'Configuration', order: 4, blurb: 'Every config section and key.' },
  { slug: 'profiles', label: 'Supervisor profiles', order: 5, blurb: 'Built-in profiles and how to write your own.' },
  { slug: 'api', label: 'API reference', order: 6, blurb: 'REST endpoints, WebSocket events, IPC routes.' },
  { slug: 'guides', label: 'Guides', order: 7, blurb: 'Step-by-step walkthroughs for common tasks.' },
  { slug: 'security', label: 'Security', order: 8, blurb: 'Threat model, trust boundaries, advisories, disclosure.' },
  { slug: 'pro', label: 'Pro', order: 9, blurb: 'Team sync, license lifecycle, encrypted key management.' },
  { slug: 'enterprise', label: 'Enterprise', order: 10, blurb: 'SSO, RBAC, SIEM, compliance, air-gapped deployment.' },
  { slug: 'ops', label: 'Operations', order: 11, blurb: 'Running, logging, updating, releasing grith.' },
  { slug: 'resources', label: 'Resources', order: 12, blurb: 'Architecture, glossary, FAQ, changelog, roadmap.' },
];
