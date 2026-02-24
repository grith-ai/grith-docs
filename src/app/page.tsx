import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

const sections = [
  {
    title: 'Getting Started',
    description: 'Install grith, configure providers, and run your first secure agent task.',
    href: '/docs/getting-started/installation',
    icon: '→',
  },
  {
    title: 'Concepts',
    description:
      'Understand the architecture: zero-trust model, scoring proxy, quarantine digest.',
    href: '/docs/concepts/architecture',
    icon: '◈',
  },
  {
    title: 'Reference',
    description: 'CLI commands, configuration keys, filter reference, and REST API.',
    href: '/docs/reference/cli',
    icon: '⌘',
  },
  {
    title: 'Guides',
    description: 'Filter tuning, supervisor profiles, reverse proxy setup, and more.',
    href: '/docs/guides/filter-tuning',
    icon: '▤',
  },
  {
    title: 'Security',
    description: 'Threat model, responsible disclosure, and security advisories.',
    href: '/docs/security/threat-model',
    icon: '◆',
  },
  {
    title: 'API Reference',
    description: 'REST endpoints, WebSocket events, and error handling.',
    href: '/docs/reference/api-rest',
    icon: '{}',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="mb-16 text-center">
            <h1 className="font-heading text-5xl font-extrabold tracking-tight text-text">
              grith <span className="text-green">docs</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
              Documentation for grith — the security-first local AI agent platform. Everything you
              need to install, configure, and operate zero-trust security for AI agents.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button href="/docs/getting-started/installation" size="lg">
                Get Started
              </Button>
              <Button href="/docs/reference/cli" variant="secondary" size="lg">
                CLI Reference
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

          <div className="mt-16 rounded-xl border border-border bg-surface p-8 text-center">
            <h2 className="font-heading text-xl font-bold text-text">Quick install</h2>
            <div className="mx-auto mt-4 max-w-md overflow-hidden rounded-lg border border-border bg-bg">
              <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              </div>
              <div className="px-4 py-3">
                <code className="font-code text-sm text-text">
                  <span className="text-green">$</span> curl -fsSL https://grith.ai/install | sh
                </code>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
