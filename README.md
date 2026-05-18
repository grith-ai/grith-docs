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

## Deployment to docs.grith.ai

The site is deployed via **AWS Amplify** (same provider as
[grith.ai](https://grith.ai)). The build spec lives in
[`amplify.yml`](./amplify.yml) at the repo root.

### How it's wired

| Setting | Value |
|---|---|
| Repository | `https://github.com/grith-ai/grith-docs` |
| Production branch | `main` (auto-deploy on every push) |
| Framework | Next.js — Static Generated (auto-detected) |
| Build spec | `amplify.yml` (auto-detected by Amplify) |
| Build command | `npm run build` (runs `gen:llms` → `next build` → `gen:pagefind`) |
| Build output directory | `out/` |
| Custom domain | `docs.grith.ai` (CNAME from your DNS to the Amplify-issued hostname) |
| Environment variables | None required — the docs site is fully static |

### One-time setup (first deploy)

1. In the AWS Amplify console, click **Create new app → Host web app**.
2. Pick **GitHub** as the source, authorise the AWS Amplify app on
   the `grith-ai` org if not already, and choose
   `grith-ai/grith-docs` with branch `main`.
3. Amplify auto-detects the `amplify.yml` build spec. Confirm:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Frontend framework:** must be set to **"Next.js - SSG"**
     (Web Hosting), NOT "Next.js - SSR" (Web Compute). Amplify's
     auto-detection guesses SSR for any Next.js project and the
     build then fails with
     `CustomerError: Can't find required-server-files.json` *after*
     the build itself succeeds (that file is only produced for SSR
     deployments; we use `output: 'export'`). If your first build
     fails with that error, toggle the framework under
     **App settings → General configuration → Framework**.
4. Save and deploy. The first build takes ~3-5 minutes.
5. Once deployed, add the custom domain `docs.grith.ai` under **Domain
   management → Add domain**. Amplify will give you a CNAME target
   like `xxxx.amplifyapp.com`. Add that as a CNAME for
   `docs.grith.ai` in your DNS provider (Route 53 / Cloudflare /
   whoever runs grith.ai DNS).
6. Amplify will provision a TLS certificate for `docs.grith.ai`
   automatically via ACM once the CNAME resolves.

### Ongoing

- Every push to `main` triggers a build + deploy automatically.
- Preview builds for PRs can be enabled under **App settings →
  Branch settings → Preview** if desired (off by default to keep
  the AWS bill quiet).
- Build logs are visible in the Amplify console under each
  deployment.

## Licence

Prose content (`content/`) is licensed under
[Creative Commons Attribution 4.0 International (CC-BY-4.0)](./LICENSE).
Site code (`src/`, `scripts/`, configuration files) is MPL-2.0,
matching the main grith product. Where the line between code and
content isn't obvious, treat it as CC-BY-4.0.
