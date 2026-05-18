# Contributing to grith-docs

Thanks for helping improve the grith documentation.

## Quick fixes (typos, broken links, minor copy)

Every page in [docs.grith.ai](https://docs.grith.ai) has an **"Edit on
GitHub"** link in the header. Click it, fix the issue, send a PR.
That's the whole workflow.

## Larger changes (new pages, restructuring, code)

```bash
# Fork the repo, then:
git clone https://github.com/<your-username>/grith-docs.git
cd grith-docs
npm install
npm run dev              # http://localhost:3000 with hot reload
```

When you're happy:

```bash
npm run lint
npm run type-check
npm run build            # Verifies SSG produces valid output in ./out
```

Open a PR with a description that explains the *why*, not just the
*what*. The "Edit on GitHub" links already make the *what* obvious.

## Page conventions

Pages live under `content/docs/<section>/<page>.mdx`. Every page must
have a frontmatter block:

```yaml
---
title: "Page title"
description: "One-line description — appears in search and OG cards."
editUrl: "https://github.com/grith-ai/grith-docs/edit/main/content/docs/<section>/<page>.mdx"
---
```

The sidebar is **hand-curated** in
[`src/lib/sidebar-data.ts`](./src/lib/sidebar-data.ts), not auto-derived
from filesystem layout. If you add a page, add it to the sidebar in
the same PR. Order matters — keep grouping logical and shallow (max
two levels of nesting).

## Auto-generated reference data

Four files under `src/data/generated/` (`api.json`, `config.json`,
`filters.json`, `cli.json`) are emitted by the **`grith-docgen`**
crate in the [main grith repo](https://github.com/grith-ai/grith).
Do not hand-edit them; regenerate via:

```bash
# From within a grith checkout:
cargo run -p grith-docgen --release
# Then copy the JSON files into grith-docs/src/data/generated/
```

The `Docs Drift Check` CI workflow runs on every push and fails if
the inventories drift from the live grith API/CLI surface.

## Style

- **Prose:** British English (favours `colour`, `behaviour`, `licence`).
  Active voice. Avoid marketing copy; explain mechanisms.
- **Code blocks:** include the language tag. Prefer real, copy-pasteable
  examples over pseudocode.
- **Headings:** Title Case for top-level (`##`), Sentence case below.
- **Links:** in-repo links use relative paths (`./foo.mdx`); external
  links are absolute.

## Filing issues

For docs problems, [open an issue](https://github.com/grith-ai/grith-docs/issues/new)
with a link to the affected page. For product bugs / feature requests,
file in the [main grith repo](https://github.com/grith-ai/grith/issues)
instead.

For security issues affecting the docs site (e.g. an XSS in an MDX
component), see [SECURITY.md](./SECURITY.md) — **don't open a public
issue.**
