# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation site for grith — a security-first local AI agent platform. Deployed at `docs.grith.ai`. Covers installation, concepts, CLI reference, filter reference, configuration, guides, security, and enterprise features.

Part of a three-repo architecture:

- **grith** (`../grith/`) — Core Rust daemon (the product)
- **grith-website** (`../grith-website/`) — Marketing site at grith.ai
- **grith-docs** (this repo) — Documentation site at docs.grith.ai

## Build & Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server at localhost:3001
npm run build            # Production build — verifies SSG works
npm run lint             # ESLint + Prettier check
npm run type-check       # TypeScript validation (tsc --noEmit)
npm run format           # Prettier auto-format
```

Always run `npm run build` before pushing — catches SSG issues that `dev` does not.

## Architecture

### Strict SSG Constraint

All pages are statically generated at build time. No server-side rendering, no dynamic API routes. The docs site is a pure static export (`next build` → `out/`) deployed to **AWS S3 + CloudFront** at `docs.grith.ai`. The main website (`grith-website`) uses AWS Amplify because it has backend requirements; the docs site is fully static so S3 + CloudFront is the simpler choice.

### Tech Stack

- **Next.js 16** (App Router) with TypeScript 5.x — same stack as grith-website
- **Tailwind CSS 4** for styling — shared design tokens with grith-website
- **MDX** (via `next-mdx-remote`) for documentation content in `content/docs/`
- **Shiki** for code syntax highlighting
- **Pagefind** for static search (Cmd+K)
- **Framer Motion** for light animations (interactive components only)

### Key Directories

- `src/app/` — Next.js App Router pages (landing, `[[...slug]]` catch-all doc renderer)
- `src/components/layout/` — Header, Footer, Sidebar
- `src/components/docs/` — DocPage wrapper, TableOfContents, Breadcrumbs, PrevNext, SearchDialog
- `src/components/mdx/` — MDX components: CodeBlock, Callout, Terminal, Tabs, Badge, FilterTable, ScoreCalculator, ArchitectureDiagram, ConfigExample
- `src/components/shared/` — Reusable UI (Button, Card)
- `src/lib/` — Utilities: doc loading (`docs.ts`), search (`search.ts`), constants
- `content/docs/` — MDX documentation files organised by section
- `public/fonts/` — Self-hosted fonts (Manrope, IBM Plex Sans, JetBrains Mono, DM Mono)
- `docs/` — Original specification documents (reference only, not published)
- `work/` — Planning documents

### Content Structure

```
content/docs/
├── getting-started/     # Installation, quickstart, configuration, providers
├── concepts/            # Architecture, zero-trust, scoring, quarantine, syscall, supervisor
├── reference/           # CLI, config, filters, scoring, API, profiles
├── guides/              # Filter tuning, profiles, team, air-gapped, reverse proxy, exfiltration
├── security/            # Threat model, responsible disclosure, advisories
└── enterprise/          # SSO, RBAC, compliance, SIEM, deployment
```

### MDX Frontmatter Schema

```yaml
---
title: "Page Title"
description: "One-line description for SEO and sidebar"
section: "getting-started"
order: 1
tier: "community"                   # community | pro | enterprise
version: "1.0"
lastUpdated: "2026-02-24"
editUrl: "https://github.com/grith-ai/grith-docs/edit/main/content/docs/..."
---
```

### Interactive Components

- **ScoreCalculator** — Input a tool call, see filters fire and score computed. Used on scoring-proxy.mdx.
- **FilterTable** — Searchable/sortable table of all 18 filters. Used on filters.mdx.
- **ArchitectureDiagram** — Dual-path execution diagram (agent + supervisor → proxy). Used on architecture.mdx.
- **Terminal** — macOS-style terminal window with copy button. Used throughout.
- **Tabs** — OS/language switcher. Persists selection via localStorage.
- **Callout** — Admonition boxes: tip (green), info (blue), warning (amber), danger (red).

## Design System

Shared with grith-website. The docs site must feel like a seamless extension of the marketing site.

### Typography

| Role               | Font           | Weight          | Notes                      |
| ------------------ | -------------- | --------------- | -------------------------- |
| Display & Headings | Manrope        | 800 (ExtraBold) | Tracking −0.04em           |
| Body               | IBM Plex Sans  | 400 (Regular)   | Line-height 1.7            |
| Code & Terminal    | JetBrains Mono | 400             |                            |
| Labels & System UI | DM Mono        | 400             | Uppercase, tracking 0.12em |

### Colour Palette (Dark Theme)

| Token            | Hex       | Usage                                      |
| ---------------- | --------- | ------------------------------------------ |
| Green (Primary)  | `#00e5a0` | Links, active sidebar, CTAs, "allow" state |
| Green Dark       | `#00b87e` | Hover states                               |
| Background       | `#06070a` | Page background                            |
| Surface          | `#0c0d12` | Sidebar, cards, code blocks                |
| Surface 2        | `#111218` | Hover states, nested panels                |
| Border           | `#1e2028` | Dividers, card borders, TOC                |
| Text Primary     | `#e4e4ec` | Body text, headings                        |
| Text Secondary   | `#9496a8` | Descriptions, breadcrumbs                  |
| Text Dim         | `#5c5e72` | Labels, metadata, disabled                 |
| Allow / Success  | `#00e5a0` | Callout (tip), score allow                 |
| Review / Warning | `#ffb347` | Callout (warning), score queue             |
| Deny / Error     | `#ff4d6a` | Callout (danger), score deny               |
| Info / Code      | `#4da6ff` | Callout (info), inline code links          |

### Layout

Three-column layout on desktop:
- **Sidebar** (260px, left) — Collapsible navigation tree. Active item: green left border + green text.
- **Content** (max-width 720px, centre) — Prose area with IBM Plex Sans body text.
- **Table of Contents** (200px, right) — Sticky heading navigation, highlights current section on scroll.

Responsive: Sidebar collapses to hamburger on mobile. TOC moves above content on tablet.

### Brand Voice

- **Technical, not jargony** — explain real concepts with precision, no buzzwords
- **Confident, not aggressive** — state what grith does; don't trash competitors by name
- **Developer-first, human** — write for engineers; dry humour welcome, exclamation marks not
- **Show, don't claim** — real config examples, real command output, real scores

Dark theme throughout. Hexagonal lattice motif. Green used sparingly for links and accents.

## Performance Targets

Lighthouse 95+ on all categories. FCP < 1.5s, LCP < 2.5s, CLS = 0. Bundle < 200KB gzipped (excluding fonts).

## Conventions

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `ci:`, `refactor:`)
- **Branches:** `feat/`, `fix/`, `docs/`, `refactor/`, `test/`, `ci/`
- **PRs:** All changes via PR, CI must pass, squash merge to main
- **Formatting:** Prettier + ESLint
- **Components:** PascalCase filenames, functional components with hooks
- **Content files:** kebab-case MDX filenames

## Cross-Repo References

Documentation content is sourced from the core project. Key source files:

- **CLI commands** → `grith/crates/grith-core/src/main.rs` (clap definitions)
- **Configuration** → `grith/config/default.toml`, `grith/config/filters/*.toml`
- **Filter implementations** → `grith/crates/grith-proxy/src/filters/`
- **Supervisor profiles** → `grith/config/supervisor/profiles.toml`
- **API routes** → `grith/crates/grith-server/src/routes/`
- **Platform spec** → `docs/PLATFORM.md` (this repo)
- **Analytics spec** → `docs/ANALYTICS-SPEC.md` (this repo)
- **Reverse proxy guide** → `grith/docs/REVERSE-PROXY.md`
- **Threat model** → `grith/docs/SUPERVISOR-ONLY-SECURITY-ASSESSMENT.md`
