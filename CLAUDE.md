# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation site for grith — a security-first local AI agent platform. Deployed at `docs.grith.ai`. Covers installation, concepts, CLI reference, filter reference, configuration, supervisor profiles, API reference, guides, security, Pro, Enterprise, operations, and resources.

Part of a three-repo architecture:

- **grith** (`../grith/`) — Core Rust daemon (the product, v0.1.0 May 2026)
- **grith-website** (`../grith-website/`) — Marketing site at grith.ai
- **grith-docs** (this repo) — Documentation site at docs.grith.ai

The current rewrite is tracked in `work/REWRITE-PLAN.md`. Read that first before making structural changes.

## Build & Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server at localhost:3001
npm run build            # Production build — verifies SSG works
npm run lint             # ESLint + Prettier check
npm run type-check       # TypeScript validation (tsc --noEmit)
npm run format           # Prettier auto-format
npm run gen:references   # Regenerate mechanical reference data from grith repo (Phase 1+)
```

Always run `npm run build` before pushing — catches SSG issues that `dev` does not.

## Architecture

### Strict SSG Constraint

All pages are statically generated at build time. No server-side rendering, no dynamic API routes. The docs site is a pure static export (`next build` → `out/`) deployed to **AWS S3 + CloudFront** at `docs.grith.ai`. The main website (`grith-website`) uses AWS Amplify because it has backend requirements; the docs site is fully static so S3 + CloudFront is the simpler choice.

### Tech Stack

- **Next.js 16** (App Router) with TypeScript 5.x — same stack as grith-website
- **Tailwind CSS 4** for styling — shared visual language with grith-website
- **MDX** (via `next-mdx-remote`) for documentation content in `content/docs/`
- **Shiki** for code syntax highlighting
- **Pagefind** for static search (Cmd+K) — wired in Phase 9 of the rewrite
- **Framer Motion** for light animations (interactive components only)

### Key Directories

- `src/app/` — Next.js App Router pages (landing, `[[...slug]]` catch-all doc renderer)
- `src/components/layout/` — Header, Footer, Sidebar
- `src/components/docs/` — DocPage wrapper, TableOfContents, Breadcrumbs, PrevNext
- `src/components/mdx/` — MDX components (see Interactive Components below)
- `src/components/shared/` — Reusable UI (Button, Card, Badge)
- `src/lib/` — Utilities: doc loading (`docs.ts`), types/sections (`types.ts`), sidebar nav (`sidebar-data.ts`), MDX helpers (`mdx.ts`), constants
- `src/data/generated/` — JSON emitted by `grith-docgen` (CLI, config, API, filters). Committed as cache; regenerable via `npm run gen:references`.
- `content/docs/` — MDX documentation files organised by section
- `docs/` — Specification documents (reference only, not published)
- `work/` — Planning documents (start with `REWRITE-PLAN.md`)

### Content Structure (13 sections)

```
content/docs/
├── start/          # What is grith, installation, quickstart, choose-your-agent, ...
├── concepts/       # Threat model, zero-trust, three-phase pipeline, scoring, ...
├── cli/            # Every CLI command and subcommand
├── filters/        # The 17 filters in detail
├── config/         # Every config section and key
├── profiles/       # Supervisor profiles (built-in + custom)
├── api/            # REST endpoints, WebSocket events, IPC routes
├── guides/         # Step-by-step walkthroughs (notifications, tuning, exfil, ...)
├── security/       # Threat model, advisories, responsible disclosure
├── pro/            # Pro tier features
├── enterprise/     # Enterprise tier features (some marked planned)
├── ops/            # Running, logging, updating, releasing grith
└── resources/      # Architecture overview, glossary, FAQ, changelog, roadmap
```

The canonical IA lives in `src/lib/types.ts` (SECTIONS) and `src/lib/sidebar-data.ts`. Keep them in sync with directory contents.

### MDX Frontmatter Schema

```yaml
---
title: "Page Title"
description: "One-line description for SEO and sidebar"
section: "start"                          # must match a SECTIONS slug
order: 1
tier: "community"                         # community | pro | enterprise
status: "shipped"                         # shipped | planned (optional)
since: "0.1.2"                            # version a feature was introduced (optional)
version: "0.1.0"                          # docs version this reflects
lastUpdated: "2026-05-14"
editUrl: "https://github.com/grith-ai/grith-docs/edit/main/content/docs/..."
---
```

### MDX Components

Available globally inside `.mdx` files. Registered in `src/components/mdx/index.tsx`.

**Layout & display**
- **Callout** — Admonition boxes: tip (green), info (blue), warning (amber), danger (red).
- **CodeBlock** — Syntax-highlighted multi-line code with copy button.
- **Terminal** — macOS-style terminal frame with copy button. For shell sessions.
- **Tabs** — Tabbed switcher (OS, language, agent, etc). Selection persists via localStorage.
- **ConfigExample** — TOML/JSON config snippet with explicit language tag.
- **Badge** — Tier or status pill (community/pro/enterprise/roadmap/info).
- **PlanBadge** — `<PlanBadge tier="pro"/>` / `<PlanBadge tier="enterprise" planned/>`. Use at the top of any tier-gated page.
- **SinceTag** — `<SinceTag version="0.1.2"/>` inline marker for features added after launch.

**Interactive**
- **ScoreCalculator** — Input a tool call, see filters fire, score computed. Rebuilt in Phase 2 against real scoring math from `grith-proxy::scoring`.
- **FilterTable** — Searchable, sortable table of all 17 filters. Rebuilt in Phase 2 from `src/data/generated/filters.json`.
- **ArchitectureDiagram** — Dual-path execution diagram (agent + supervisor → proxy + daemon). Refresh in Phase 3 to include thin-client sessions.

**Reference renderers (Phase 1)**
- **CliCommandPage** — Renders a single CLI command from `cli.json`.
- **ConfigKeyTable** — Renders a config section from `config.json`.
- **ApiRouteTable** — Renders REST routes from `api.json`.
- **FilterCatalog** — Full sortable/filterable filter list.

## Design System

Shared visual language with grith-website. The docs site should feel like a seamless extension of the marketing site. Tokens defined in `src/app/globals.css`.

### Typography

| Role               | Font           | Weight          | Notes                       |
| ------------------ | -------------- | --------------- | --------------------------- |
| Display & Headings | Inter          | 800 (ExtraBold) | Tracking −0.04em            |
| Body               | Inter          | 400 (Regular)   | Line-height 1.6–1.8         |
| Code & Terminal    | JetBrains Mono | 400             |                             |
| Labels & System UI | JetBrains Mono | 400             | Uppercase, tracking 0.12em  |

Fonts are loaded from Google Fonts in `globals.css`. The earlier spec for Manrope / IBM Plex Sans / DM Mono was superseded — Inter matches grith.ai exactly.

### Colour Palette (light theme only)

| Token          | Hex       | Usage                              |
| -------------- | --------- | ---------------------------------- |
| Green primary  | `#00a85a` | Links, active sidebar, CTAs        |
| Green dark     | `#008548` | Hover states                       |
| Green light    | `#e6f9ef` | Callout / badge backgrounds        |
| Green border   | `#b4e6cc` | Callout / badge borders            |
| Background     | `#fafaf8` | Warm off-white page background     |
| Background dk  | `#0d1117` | Terminal / footer background       |
| Surface        | `#f4f3f0` | Sidebar, cards, neutral panels     |
| Surface 2      | `#eceae6` | Hover states, nested panels        |
| Border         | `#e2e0db` | Dividers, card borders             |
| Border dark    | `#d0cec8` | Hover/active borders               |
| Text primary   | `#0d1117` | Body text, headings                |
| Text secondary | `#57606a` | Descriptions, breadcrumbs          |
| Text dim       | `#8b949e` | Labels, metadata                   |
| Warning        | `#bf8700` | Callout (warning)                  |
| Danger         | `#d1242f` | Callout (danger)                   |
| Info           | `#0969da` | Callout (info), Pro badge          |
| Purple         | `#8250df` | Enterprise badge                   |
| Terminal text  | `#e6edf3` | Code text on terminal bg           |
| Terminal mute  | `#7d8590` | Comments / muted output in terminal|

### Layout

Three-column layout on desktop:

- **Sidebar** (260px, left) — Collapsible navigation tree. Active item: green left border + green text + green-light background.
- **Content** (max-width 720px, centre) — Prose area in Inter body text. Line-height 1.8 for readability.
- **Table of Contents** (200px, right) — Sticky heading navigation, highlights current section on scroll.

Responsive: Sidebar collapses to drawer on mobile (`<lg`). TOC drops above content on tablet.

### Brand Voice

Matches grith.ai. A reader moving from the marketing site to the docs site should not feel a seam.

- **Direct** — "AI agents are making security decisions. That's the problem." No hedging, no marketing fluff.
- **Technical, not jargony** — explain real concepts (syscall, composite score, ptrace) with precision. Use the term, then ground it with an example.
- **Confident, not aggressive** — state what grith does. Don't trash competitors by name.
- **Developer-first, human** — write for engineers. Dry humour welcome. No exclamation marks.
- **Show, don't claim** — real config snippets, real command output, real scores. Mock data is allowed but should look real.

Light theme throughout. Hexagonal lattice motif for the logo and large illustrations. Green used sparingly for links, active states, and CTAs.

## Performance Targets

Lighthouse 95+ on all categories. FCP < 1.5s, LCP < 2.5s, CLS = 0. Bundle < 200KB gzipped (excluding fonts).

## Conventions

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `ci:`, `refactor:`)
- **Branches:** `feat/`, `fix/`, `docs/`, `refactor/`, `test/`, `ci/`
- **PRs:** All changes via PR, CI must pass, squash merge to main
- **Formatting:** Prettier + ESLint
- **Components:** PascalCase filenames, functional components with hooks
- **Content files:** kebab-case MDX filenames
- **Cross-repo edits:** When a docs change needs a `grith` change (e.g. new docgen schema), land the grith change first, then update the docs PR.

## Cross-Repo References

Mechanical reference content is generated from the grith Rust source. The mapping:

| Source in grith | Drives docs in |
|---|---|
| `crates/grith-core/src/main.rs` (clap tree) | `content/docs/cli/` (via `grith-docgen cli`) |
| `config/default.toml` + Rust doc comments | `content/docs/config/` (via `grith-docgen config`) |
| `crates/grith-server/src/routes/` (axum router) | `content/docs/api/` (via `grith-docgen api`) |
| `crates/grith-proxy/src/filters/` | `content/docs/filters/` (via `grith-docgen filters`) |
| `config/supervisor/profiles.toml` | `content/docs/profiles/` (hand-written, sourced) |
| `grith/docs/PLATFORM.md` | `content/docs/concepts/` (narrative source) |
| `grith/docs/REVERSE-PROXY.md` | `content/docs/guides/reverse-proxy-tls.mdx` |
| `grith/docs/SUPERVISOR-ONLY-SECURITY-ASSESSMENT.md` | `content/docs/security/supervisor-only-assessment.mdx` |
| `grith/docs/NOTIFICATION-SPEC.md` | `content/docs/guides/notifications-*` |
| `grith/docs/SUPERVISOR-PROFILES.md` | `content/docs/profiles/*` |
| `grith/docs/LICENSE-REFRESH.md` | `content/docs/pro/license-lifecycle.mdx` |
| `grith/docs/RELEASE.md` | `content/docs/ops/release-process.mdx` |

When a generated JSON file (`src/data/generated/*.json`) is stale, run `npm run gen:references` to refresh it — that script invokes `cargo run -p grith-docgen` in the sibling grith repo.
