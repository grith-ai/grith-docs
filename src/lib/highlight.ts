import { createHighlighter, type Highlighter, type ThemeRegistration } from 'shiki';

/**
 * Build-time syntax highlighting for fenced code blocks (DS6).
 *
 * Runs only inside React Server Components during `next build` - the static
 * export ships pre-coloured spans and zero client-side highlighting JS.
 *
 * Code panels use the fixed dark code palette in both page themes (see
 * src/theme/grith-theme.css `--g-code-*`), so a single dark theme suffices.
 * The theme below maps token colours onto the design-system palette; the
 * background is stripped via a transformer so `.prose-docs pre` keeps
 * control of the panel fill (`--g-code-bg`), border, and radius.
 */

// Token palette (dark values from grith-theme.css - fixed in both themes)
const CODE_TEXT = '#c6d3cb'; // --g-code-text
const CODE_MUTED = '#8b978f'; // --g-code-muted (punctuation, operators)
const CODE_SUBTLE = '#5c665f'; // --g-code-subtle (comments)
const ACCENT = '#00e5a0'; // --g-accent (strings)
const AMBER = '#e0a44a'; // --g-warning (numbers, booleans, constants)
const BLUE = '#4da6ff'; // --g-info (functions, types, sections)
const PURPLE = '#b392f0'; // --g-purple (keywords, storage)

const grithCodeTheme: ThemeRegistration = {
  name: 'grith-dark',
  type: 'dark',
  fg: CODE_TEXT,
  bg: '#0b100e', // --g-code-bg; stripped from output, listed for completeness
  settings: [
    { settings: { foreground: CODE_TEXT, background: '#0b100e' } },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: CODE_SUBTLE, fontStyle: 'italic' },
    },
    {
      scope: ['string', 'punctuation.definition.string'],
      settings: { foreground: ACCENT },
    },
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.other',
        'variable.parameter',
        'entity.name.type.parameter',
      ],
      settings: { foreground: AMBER },
    },
    {
      scope: ['keyword', 'storage.type', 'storage.modifier', 'keyword.operator.new'],
      settings: { foreground: PURPLE },
    },
    {
      scope: ['keyword.operator', 'punctuation'],
      settings: { foreground: CODE_MUTED },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'entity.name.type',
        'entity.name.class',
        'support.type',
        'support.class',
        'entity.name.tag',
        'entity.name.section',
        'entity.other.attribute-name',
        'markup.heading',
      ],
      settings: { foreground: BLUE },
    },
    {
      // Property keys (JSON keys, TOML keys) stay neutral so values carry
      // the colour - config examples read as key = coloured value
      scope: ['support.type.property-name', 'variable.key', 'meta.object-literal.key'],
      settings: { foreground: CODE_TEXT },
    },
    {
      scope: ['variable', 'variable.other'],
      settings: { foreground: CODE_TEXT },
    },
    {
      scope: ['string variable', 'string punctuation.section.embedded'],
      settings: { foreground: CODE_TEXT },
    },
  ],
};

// Languages present in content/docs plus cheap future-proofing for the
// Rust daemon and TypeScript examples. Grammars load once at build time.
const LANGS = [
  'bash',
  'toml',
  'json',
  'yaml',
  'python',
  'ini',
  'dockerfile',
  'rust',
  'typescript',
  'javascript',
] as const;

const LANG_ALIASES: Record<string, string> = {
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  shellscript: 'bash',
  yml: 'yaml',
  ts: 'typescript',
  js: 'javascript',
  rs: 'rust',
  py: 'python',
  jsonc: 'json',
  docker: 'dockerfile',
  properties: 'ini',
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [grithCodeTheme],
      langs: [...LANGS],
    });
  }
  return highlighterPromise;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Resolve a fence infostring to a registered language, or 'text'. */
export function resolveLang(infoLang: string | undefined): string {
  if (!infoLang) return 'text';
  const lang = LANG_ALIASES[infoLang.toLowerCase()] ?? infoLang.toLowerCase();
  return (LANGS as readonly string[]).includes(lang) ? lang : 'text';
}

/**
 * Highlight a code string to HTML (`<pre class="shiki grith-dark"><code>...`).
 * Unknown languages render as plain text; any grammar failure falls back to
 * escaped plain markup - highlighting never fails the build.
 */
export async function highlightCode(code: string, infoLang?: string): Promise<string> {
  const lang = resolveLang(infoLang);
  try {
    const highlighter = await getHighlighter();
    return highlighter.codeToHtml(code, {
      lang,
      theme: 'grith-dark',
      transformers: [
        {
          pre(node) {
            // Drop shiki's inline background/colour so .prose-docs pre keeps
            // control of the fixed dark panel (--g-code-bg / --g-code-text)
            delete node.properties.style;
          },
        },
      ],
    });
  } catch {
    return `<pre class="shiki grith-dark" tabindex="0"><code>${escapeHtml(code)}</code></pre>`;
  }
}
