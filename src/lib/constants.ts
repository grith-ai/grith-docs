export const SITE_URL = 'https://docs.grith.ai';
export const SITE_NAME = 'Grith Docs';
export const SITE_DESCRIPTION =
  'Documentation for grith - the security-first local AI agent platform. Zero trust for AI agents.';
export const GITHUB_URL = 'https://github.com/grith-ai/grith';
export const DOCS_REPO_URL = 'https://github.com/grith-ai/grith-docs';
export const WEBSITE_URL = 'https://grith.ai';
export const INSTALL_COMMAND = 'curl -fsSL https://grith.ai/install | sh';

/**
 * Cloudflare Web Analytics site token. Deliberately the same token the
 * marketing site uses (grith-website apps/web/src/lib/constants.ts) so
 * docs.grith.ai lands in one report alongside grith.ai and can be split
 * out with the Host filter - that is what makes blog -> docs readable.
 * Public by construction: it ships in the page source of every deploy.
 * The beacon only renders in production (see src/app/layout.tsx).
 */
export const CF_BEACON_TOKEN = 'dc61621196904dd79dcfa92dd5598ec5';
