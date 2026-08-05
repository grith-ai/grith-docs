import Link from 'next/link';
import { GITHUB_URL, WEBSITE_URL, DOCS_REPO_URL } from '@/lib/constants';

type FooterLink = { label: string; href: string; external?: boolean };

const footerLinks: Record<string, FooterLink[]> = {
  Documentation: [
    { label: 'Installation', href: '/docs/start/installation' },
    { label: 'Quickstart', href: '/docs/start/quickstart' },
    { label: 'CLI reference', href: '/docs/cli/overview' },
    { label: 'API reference', href: '/docs/api/overview' },
    { label: 'Filter reference', href: '/docs/filters/overview' },
  ],
  Product: [
    { label: 'Website', href: WEBSITE_URL, external: true },
    { label: 'GitHub', href: GITHUB_URL, external: true },
    { label: 'Pro', href: '/docs/pro/whats-in-pro' },
    { label: 'Enterprise', href: '/docs/enterprise/whats-in-enterprise' },
  ],
  Security: [
    { label: 'Threat model', href: '/docs/security/threat-model' },
    { label: 'Responsible disclosure', href: '/docs/security/responsible-disclosure' },
    { label: 'Advisories', href: '/docs/security/advisories' },
  ],
  Community: [
    { label: 'Discussions', href: GITHUB_URL + '/discussions', external: true },
    { label: 'Edit these docs', href: DOCS_REPO_URL, external: true },
    { label: 'Changelog', href: '/docs/resources/changelog' },
  ],
};

const footerAnchor = 'block py-0.5 text-sm text-text-secondary transition-colors hover:text-text';

function FooterAnchor({ link }: { link: FooterLink }) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={footerAnchor}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={footerAnchor}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-border bg-surface-2 border-t">
      <div className="mx-auto max-w-7xl px-6 pt-[52px] pb-9 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <svg
                viewBox="0 0 32 32"
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 2L28.5 9.25V23.75L16 31L3.5 23.75V9.25L16 2Z"
                  className="stroke-green"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M16 8L23 12V20L16 24L9 20V12L16 8Z"
                  className="fill-green/[0.06] stroke-green"
                  strokeWidth="1"
                />
              </svg>
              <span className="font-heading text-text text-lg font-bold tracking-[-0.02em]">
                grith
              </span>
            </Link>
            <p className="text-text-secondary mt-3.5 max-w-[32ch] text-[13px] leading-relaxed">
              An OS-level security supervisor for AI agents. Intercept every call. Score it. Decide
              what runs.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <div className="font-label text-text-secondary mb-3.5 text-xs font-medium tracking-[0.08em] uppercase">
                {heading}
              </div>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border mt-9 border-t pt-[22px]">
          <span className="font-label text-text-secondary text-[13px]">
            &copy; {new Date().getFullYear()} grith.ai - all rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
