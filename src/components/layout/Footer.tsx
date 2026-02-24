import Link from 'next/link';
import { GITHUB_URL, WEBSITE_URL, DOCS_REPO_URL } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-label text-[10px] uppercase tracking-[0.12em] text-text-dim">
              Documentation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/docs/getting-started/installation"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/getting-started/quickstart"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  Quickstart
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/reference/cli"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  CLI Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/reference/api-rest"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-label text-[10px] uppercase tracking-[0.12em] text-text-dim">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={WEBSITE_URL}
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  Website
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="/docs/pro/overview"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  Pro Plan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-label text-[10px] uppercase tracking-[0.12em] text-text-dim">
              Security
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/docs/security/threat-model"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  Threat Model
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/security/responsible-disclosure"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  Responsible Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/security/advisories"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  Security Advisories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-label text-[10px] uppercase tracking-[0.12em] text-text-dim">
              Community
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={GITHUB_URL + '/discussions'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href={DOCS_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-text"
                >
                  Edit these docs
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-text-dim">
          &copy; {new Date().getFullYear()} Grith. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
