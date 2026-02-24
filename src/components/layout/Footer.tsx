import Link from 'next/link';
import { GITHUB_URL, WEBSITE_URL, DOCS_REPO_URL } from '@/lib/constants';

const footerLinks = {
  Documentation: [
    { label: 'Installation', href: '/docs/getting-started/installation' },
    { label: 'Quickstart', href: '/docs/getting-started/quickstart' },
    { label: 'CLI Reference', href: '/docs/reference/cli' },
    { label: 'API Reference', href: '/docs/reference/api-rest' },
  ],
  Product: [
    { label: 'Website', href: WEBSITE_URL, external: true },
    { label: 'GitHub', href: GITHUB_URL, external: true },
    { label: 'Pro Plan', href: '/docs/pro/overview' },
  ],
  Security: [
    { label: 'Threat Model', href: '/docs/security/threat-model' },
    { label: 'Responsible Disclosure', href: '/docs/security/responsible-disclosure' },
    { label: 'Security Advisories', href: '/docs/security/advisories' },
  ],
  Community: [
    { label: 'Discussions', href: GITHUB_URL + '/discussions', external: true },
    { label: 'Edit these docs', href: DOCS_REPO_URL, external: true },
  ],
};

export default function Footer() {
  return (
    <>
      <footer className="border-t border-border bg-bg-dark text-[#8b949e]">
        <div className="mx-auto max-w-[1100px] px-10 py-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="inline-block">
                <span className="text-lg font-extrabold text-[#e6edf3]">
                  grith<span className="text-[#7ee787]">.ai</span>
                </span>
              </Link>
              <p className="mt-3 text-[13px] leading-relaxed">
                Security-first local AI agent platform. Zero trust, every call evaluated.
              </p>
            </div>

            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="mb-3.5 text-xs font-bold uppercase tracking-[0.8px] text-[#e6edf3]">
                  {heading}
                </h4>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link.label}>
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-0.5 text-sm text-[#8b949e] transition-colors hover:text-[#e6edf3]"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="block py-0.5 text-sm text-[#8b949e] transition-colors hover:text-[#e6edf3]"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
      <div className="border-t border-[#21262d] bg-bg-dark px-10 py-5 text-center text-[13px] text-[#7d8590]">
        &copy; {new Date().getFullYear()} grith. All rights reserved.
      </div>
    </>
  );
}
