#!/usr/bin/env node
// Generate public/llms.txt — flat-text index for AI agents.
// Run as a prebuild step.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const CONTENT = path.join(ROOT, 'content/docs');
const OUT = path.join(ROOT, 'public/llms.txt');
const SITE = 'https://docs.grith.ai';

const SECTIONS = [
  ['start', 'Start here'],
  ['concepts', 'Concepts'],
  ['cli', 'CLI reference'],
  ['filters', 'Filter reference'],
  ['config', 'Configuration'],
  ['profiles', 'Supervisor profiles'],
  ['api', 'API reference'],
  ['guides', 'Guides'],
  ['security', 'Security'],
  ['pro', 'Pro'],
  ['enterprise', 'Enterprise'],
  ['ops', 'Operations'],
  ['resources', 'Resources'],
];

function readSection(slug) {
  const dir = path.join(CONTENT, slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data } = matter(raw);
      return {
        slug: `${slug}/${f.replace(/\.mdx$/, '')}`,
        title: data.title ?? f,
        description: data.description ?? '',
        order: data.order ?? 99,
      };
    })
    .sort((a, b) => a.order - b.order);
}

const lines = [
  '# grith documentation',
  '',
  'grith is a security-first local AI agent platform. It intercepts every',
  'syscall an AI agent makes, scores it through 17 filters, and routes',
  'ambiguous calls to a human-review queue.',
  '',
  `Site: ${SITE}`,
  '',
  '## Sections',
  '',
];

for (const [slug, label] of SECTIONS) {
  const docs = readSection(slug);
  if (docs.length === 0) continue;
  lines.push(`### ${label}`);
  lines.push('');
  for (const d of docs) {
    lines.push(`- [${d.title}](${SITE}/docs/${d.slug}) — ${d.description}`);
  }
  lines.push('');
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join('\n') + '\n');
console.log(`Wrote ${OUT} (${lines.length} lines)`);
