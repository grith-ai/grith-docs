# grith-docs

Source for **[docs.grith.ai](https://docs.grith.ai)** — the documentation
site for [grith](https://github.com/grith-ai/grith), a security-first
local platform that secures AI agent tool calls through a multi-filter
proxy and OS-level CLI supervisor.

This repo holds:

- **Prose content** under [`content/docs/`](./content/docs) — `.mdx`
  pages for getting started, concepts, CLI reference, filter catalogue,
  config reference, API reference, guides, security model, Pro /
  Enterprise features, operations, and resources.
- **The Next.js application** under [`src/`](./src) that renders the
  content with Pagefind search, syntax highlighting, and a curated
  sidebar.
- **Auto-generated reference data** under
  [`src/data/generated/`](./src/data/generated) (`api.json`,
  `config.json`, `filters.json`, `cli.json`) emitted by the
  `grith-docgen` crate in the [main grith repo](https://github.com/grith-ai/grith).

For the marketing site (homepage, pricing, blog), see
[grith.ai](https://grith.ai). For the product itself, see
[grith-ai/grith](https://github.com/grith-ai/grith).

## Quick start

Prerequisites: Node.js 22+.

```bash
git clone https://github.com/grith-ai/grith-docs.git
cd grith-docs
npm install
npm run dev              # Start dev server with hot reload at http://localhost:3000
```

Other scripts:

```bash
npm run build            # Production static build (verifies SSG works); output in ./out
npm run lint             # ESLint + Prettier check
npm run type-check       # TypeScript validation (tsc --noEmit)
npm run format           # Prettier auto-format
```

## Contributing

Fixes, clarifications, and new pages are very welcome. Read
[CONTRIBUTING.md](./CONTRIBUTING.md) first — it covers the page model,
sidebar conventions, the auto-generated reference data, and the docs
drift check that runs against the main grith repo.

Found a typo on a live page? Every page in the docs site has an
**"Edit on GitHub"** link in the header that drops you straight onto
the source file in your fork.

For security reports, see [SECURITY.md](./SECURITY.md) — **please
don't open public issues for vulnerabilities.**

## Licence

Prose content (`content/`) is licensed under
[Creative Commons Attribution 4.0 International (CC-BY-4.0)](./LICENSE).
Site code (`src/`, `scripts/`, configuration files) is MPL-2.0,
matching the main grith product. Where the line between code and
content isn't obvious, treat it as CC-BY-4.0.
