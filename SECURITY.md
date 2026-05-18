# Security Policy

This repository contains the source for [docs.grith.ai](https://docs.grith.ai)
— the documentation site only. **For vulnerabilities in the grith product
itself**, please report against the main repo:
[grith-ai/grith / Security Advisories](https://github.com/grith-ai/grith/security/advisories).

## Reporting a vulnerability in the docs site

The docs site is mostly static prose, but the rendering surface (MDX
components, the Pagefind search index, the Next.js build pipeline)
could in principle host an XSS, an open redirect, or a dependency
compromise. If you find one:

**Do not open a public issue.** Report via either of:

1. **GitHub Private Vulnerability Reporting** — preferred.
   [github.com/grith-ai/grith-docs/security/advisories](https://github.com/grith-ai/grith-docs/security/advisories)
   → *Report a vulnerability*. The report stays private to maintainers
   until a fix is published.
2. **Email** — **security@grith.ai** with a description, reproduction
   steps, and the affected page(s) / commit(s). Encrypt sensitive
   detail with the PGP key at
   [grith.ai/.well-known/security.txt](https://grith.ai/.well-known/security.txt).

## Response timeline

| Stage | Target |
|---|---|
| Acknowledgement | 48 hours |
| Initial assessment | 5 business days |
| Coordinated disclosure | Negotiated with reporter, typically 14–90 days depending on severity |

## Scope

In scope:

- XSS / injection in any rendered page on `docs.grith.ai`.
- Open redirects from internal links.
- Build-pipeline / supply-chain compromise affecting the deploy artefact.
- Confidentiality / integrity issues in our handling of analytics or
  search indices.

Out of scope (please direct elsewhere):

- Product vulnerabilities — file against
  [grith-ai/grith](https://github.com/grith-ai/grith/security/advisories).
- Marketing-site issues (grith.ai) — file against the Field-Logic-Ltd
  repository or email security@grith.ai with subject *"grith.ai —"*.
- Reports against third-party dependencies we use unmodified
  (Next.js, MDX, Pagefind, Tailwind, etc.) — please report those
  upstream first; if you believe our configuration creates the
  vulnerability, include that in your report.

## Acknowledgements

We're happy to credit reporters publicly in our security advisories
(with your permission) once a fix is shipped.
