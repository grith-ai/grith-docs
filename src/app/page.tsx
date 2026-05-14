import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

const sections = [
  {
    title: 'Start here',
    description: 'Install grith, pick your agent, run your first supervised session.',
    href: '/docs/start/what-is-grith',
    icon: '→',
  },
  {
    title: 'Concepts',
    description: 'The threat model, the pipeline, the scoring — how it all fits together.',
    href: '/docs/concepts/threat-model',
    icon: '◈',
  },
  {
    title: 'CLI reference',
    description: 'Every command, every flag, every example.',
    href: '/docs/cli/overview',
    icon: '⌘',
  },
  {
    title: 'Filter reference',
    description: 'The 17 filters in detail — what they catch, what they cost.',
    href: '/docs/filters/overview',
    icon: '▤',
  },
  {
    title: 'Configuration',
    description: 'Every config section and key, with shipping defaults.',
    href: '/docs/config/overview',
    icon: '⚙',
  },
  {
    title: 'API reference',
    description: 'REST endpoints, WebSocket events, IPC routes.',
    href: '/docs/api/overview',
    icon: '{}',
  },
  {
    title: 'Supervisor profiles',
    description: '11 built-in profiles for Claude Code, Codex, Aider and more.',
    href: '/docs/profiles/built-in-profiles',
    icon: '◆',
  },
  {
    title: 'Guides',
    description: 'Step-by-step walkthroughs for tuning, notifications, exfil response.',
    href: '/docs/guides/tuning-scoring-thresholds',
    icon: '▦',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-16 text-center">
            <p className="font-label text-xs uppercase tracking-[0.18em] text-text-dim">
              docs.grith.ai
            </p>
            <h1 className="mt-3 font-heading text-5xl font-extrabold tracking-tight text-text">
              Zero trust for AI agents.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-text-secondary">
              grith intercepts every action an AI agent takes on your machine and verifies it
              before execution. These docs cover install, concepts, every CLI command, every
              config key, every filter, every API route.
            </p>
            <div className="mx-auto mt-5 max-w-2xl rounded-lg border border-green-border bg-green-light px-4 py-3 text-sm text-green-dark">
              v0.1 ships for Linux x86_64. macOS and Windows builds are next.
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button href="/docs/start/installation" size="lg">
                Get started
              </Button>
              <Button href="/docs/cli/overview" variant="secondary" size="lg">
                CLI reference
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((section) => (
              <Link key={section.href} href={section.href}>
                <Card hover className="h-full">
                  <span className="mb-3 block font-code text-xl text-green">{section.icon}</span>
                  <h2 className="font-heading text-lg font-bold text-text">{section.title}</h2>
                  <p className="mt-2 text-sm text-text-secondary">{section.description}</p>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-xl border border-border bg-surface p-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <h2 className="font-heading text-xl font-bold text-text">Quick install (Linux)</h2>
            <div className="mx-auto mt-4 max-w-md overflow-hidden rounded-lg bg-terminal-bg shadow-[0_0_0_1px_rgba(0,168,90,0.15),0_8px_32px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-1.5 border-b border-terminal-border bg-[#161b22] px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              </div>
              <div className="px-4 py-3">
                <code className="font-code text-sm text-terminal-text">
                  <span className="text-[#7ee787]">$</span> curl -fsSL https://grith.ai/install | sh
                </code>
              </div>
            </div>
            <p className="mt-3 text-sm text-text-secondary">
              macOS and Windows install instructions will land here as soon as those builds ship.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
