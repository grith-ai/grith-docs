// Navigation tree for the docs sidebar. One entry per file under content/docs/;
// ordering follows each page's `order` frontmatter. Keep aligned with SECTIONS in
// ./types.ts. When you add or remove a page, register it here in the right place.
//
// `tier` and `status` mirror the page frontmatter so the sidebar can badge an entry
// without loading every MDX file. grith v0.3.1 ships one `status: 'planned'` page:
// pro/notifications. Nothing else in these docs is unreleased.

export interface SidebarDoc {
  slug: string;
  title: string;
  tier?: 'community' | 'pro' | 'enterprise';
  status?: 'shipped' | 'planned';
}

export interface SidebarSection {
  slug: string;
  label: string;
  docs: SidebarDoc[];
}

export const sidebarData: SidebarSection[] = [
  {
    slug: 'start',
    label: 'Start here',
    docs: [
      { slug: 'start/what-is-grith', title: 'What is grith' },
      { slug: 'start/installation', title: 'Installation' },
      { slug: 'start/quickstart', title: 'Quickstart' },
      { slug: 'start/choose-your-agent', title: 'Choose your agent' },
      { slug: 'start/connect-a-model', title: 'Connect a model' },
      { slug: 'start/reviewing-the-digest', title: 'Reviewing the digest' },
    ],
  },
  {
    slug: 'concepts',
    label: 'Concepts',
    docs: [
      { slug: 'concepts/threat-model', title: 'Threat model' },
      { slug: 'concepts/syscall-interception', title: 'Syscall interception' },
      { slug: 'concepts/three-phase-pipeline', title: 'Three-phase pipeline' },
      { slug: 'concepts/composite-scoring', title: 'Composite scoring' },
      { slug: 'concepts/quarantine-digest', title: 'The quarantine digest' },
      { slug: 'concepts/daemon-and-sessions', title: 'Daemon and sessions' },
      { slug: 'concepts/workspace-boundary', title: 'Workspace boundary' },
      { slug: 'concepts/session-containment', title: 'Session containment' },
      { slug: 'concepts/taint-tracking', title: 'Taint tracking' },
      { slug: 'concepts/adaptive-reputation', title: 'Adaptive reputation' },
      { slug: 'concepts/canary-tokens', title: 'Canary tokens' },
    ],
  },
  {
    slug: 'cli',
    label: 'CLI reference',
    docs: [
      { slug: 'cli/overview', title: 'Overview' },
      { slug: 'cli/run', title: 'grith run' },
      { slug: 'cli/exec', title: 'grith exec' },
      { slug: 'cli/proxy-test', title: 'grith proxy test' },
      { slug: 'cli/digest', title: 'grith digest' },
      { slug: 'cli/audit', title: 'grith audit' },
      { slug: 'cli/log', title: 'grith log' },
      { slug: 'cli/canary', title: 'grith canary' },
      { slug: 'cli/supervisor', title: 'grith supervisor' },
      { slug: 'cli/daemon', title: 'grith daemon' },
      { slug: 'cli/profile-audit', title: 'grith profile audit' },
      { slug: 'cli/reputation', title: 'grith reputation' },
      { slug: 'cli/notifications', title: 'grith notifications' },
      { slug: 'cli/config', title: 'grith config' },
      { slug: 'cli/init', title: 'grith init' },
      { slug: 'cli/setup', title: 'grith setup' },
      { slug: 'cli/pro', title: 'grith pro', tier: 'pro' },
      { slug: 'cli/analytics', title: 'grith analytics', tier: 'pro' },
      { slug: 'cli/completions', title: 'grith completions' },
    ],
  },
  {
    slug: 'filters',
    label: 'Filter reference',
    docs: [
      { slug: 'filters/overview', title: 'Overview' },
      { slug: 'filters/01-operation-risk-scoring', title: '1. Operation risk scoring' },
      { slug: 'filters/02-static-path-matching', title: '2. Static path matching' },
      { slug: 'filters/03-sensitive-path-heuristic', title: '3. Sensitive path heuristic' },
      { slug: 'filters/04-allowlist-denylist', title: '4. Allowlist / denylist' },
      { slug: 'filters/05-argument-length-structure', title: '5. Argument length & structure' },
      { slug: 'filters/06-capability-enforcement', title: '6. Capability enforcement' },
      { slug: 'filters/07-secret-credential-scanning', title: '7. Secret / credential scanning' },
      { slug: 'filters/08-command-structure-analysis', title: '8. Command structure analysis' },
      { slug: 'filters/09-destructive-action', title: '9. Destructive action' },
      { slug: 'filters/10-egress-policy', title: '10. Egress policy' },
      { slug: 'filters/11-dlp-gate', title: '11. DLP gate' },
      { slug: 'filters/12-canary-detection', title: '12. Canary detection' },
      { slug: 'filters/13-destination-reputation', title: '13. Destination reputation' },
      { slug: 'filters/14-behavioural-anomaly', title: '14. Behavioural anomaly' },
      { slug: 'filters/15-taint-tracking', title: '15. Taint tracking' },
      { slug: 'filters/16-session-containment', title: '16. Session containment' },
      { slug: 'filters/17-rate-limiting', title: '17. Rate limiting' },
      { slug: 'filters/18-egress-rate', title: '18. Egress rate' },
      { slug: 'filters/meta-rules', title: 'Meta-rules' },
    ],
  },
  {
    slug: 'config',
    label: 'Configuration',
    docs: [
      { slug: 'config/overview', title: 'Overview and precedence' },
      { slug: 'config/general', title: '[general]' },
      { slug: 'config/audit', title: '[audit]' },
      { slug: 'config/proxy', title: '[proxy]' },
      { slug: 'config/reputation', title: '[reputation]' },
      { slug: 'config/supervisor', title: '[supervisor]' },
      { slug: 'config/server', title: '[server]' },
      { slug: 'config/llm', title: '[llm]' },
      { slug: 'config/filter-config-files', title: 'Filter config files' },
      { slug: 'config/environment-variables', title: 'Environment variables' },
    ],
  },
  {
    slug: 'profiles',
    label: 'Supervisor profiles',
    docs: [
      { slug: 'profiles/how-profiles-work', title: 'How profiles work' },
      { slug: 'profiles/built-in-profiles', title: 'Built-in profiles' },
    ],
  },
  {
    slug: 'api',
    label: 'API reference',
    docs: [
      { slug: 'api/overview', title: 'Overview' },
      { slug: 'api/authentication', title: 'Authentication' },
      { slug: 'api/health-and-tier', title: 'Health and tier' },
      { slug: 'api/proxy', title: 'Proxy' },
      { slug: 'api/digest', title: 'Digest' },
      { slug: 'api/audit', title: 'Audit' },
      { slug: 'api/analytics', title: 'Analytics' },
      { slug: 'api/canaries', title: 'Canaries' },
      { slug: 'api/supervisor', title: 'Supervisor sessions' },
      { slug: 'api/sync-and-policies', title: 'Sync and policies', tier: 'pro' },
      { slug: 'api/ipc', title: 'Daemon IPC' },
      { slug: 'api/websocket', title: 'WebSocket' },
    ],
  },
  {
    slug: 'guides',
    label: 'Guides',
    docs: [
      { slug: 'guides/tuning-scoring-thresholds', title: 'Tuning scoring thresholds' },
      { slug: 'guides/running-in-ci', title: 'Running in CI' },
      { slug: 'guides/setting-up-canary-tokens', title: 'Setting up canary tokens' },
      { slug: 'guides/containment-walkthrough', title: 'Containment walkthrough' },
      { slug: 'guides/exfiltration-walkthrough', title: 'Exfiltration walkthrough' },
      { slug: 'guides/team-setup', title: 'Team setup', tier: 'pro' },
      { slug: 'guides/reverse-proxy-tls', title: 'TLS and reverse proxies' },
      { slug: 'guides/troubleshooting', title: 'Troubleshooting' },
    ],
  },
  {
    slug: 'security',
    label: 'Security',
    docs: [
      { slug: 'security/limitations', title: 'Limitations' },
      { slug: 'security/trust-boundaries', title: 'Trust boundaries' },
      { slug: 'security/supervisor-only-assessment', title: 'Supervisor-only assessment' },
      { slug: 'security/advisories', title: 'Advisories' },
      { slug: 'security/responsible-disclosure', title: 'Responsible disclosure' },
    ],
  },
  {
    slug: 'pro',
    label: 'Pro',
    docs: [
      { slug: 'pro/whats-in-pro', title: 'What Pro adds', tier: 'pro' },
      { slug: 'pro/authentication', title: 'Authentication', tier: 'pro' },
      { slug: 'pro/license-lifecycle', title: 'Licence lifecycle', tier: 'pro' },
      { slug: 'pro/team-sync', title: 'Team sync', tier: 'pro' },
      { slug: 'pro/centralised-policies', title: 'Centralised policies', tier: 'pro' },
      { slug: 'pro/analytics', title: 'Analytics', tier: 'pro' },
      { slug: 'pro/encrypted-key-management', title: 'Encrypted key management', tier: 'pro' },
      { slug: 'pro/notifications', title: 'Notifications', tier: 'pro', status: 'planned' },
    ],
  },
  {
    slug: 'ops',
    label: 'Operations',
    docs: [
      { slug: 'ops/running-as-a-daemon', title: 'Running as a daemon' },
      { slug: 'ops/performance-tuning', title: 'Performance and tuning' },
      { slug: 'ops/logging-and-audit-retention', title: 'Logging and audit retention' },
      { slug: 'ops/updating-grith', title: 'Updating grith' },
      { slug: 'ops/verifying-releases', title: 'Verifying releases' },
    ],
  },
  {
    slug: 'resources',
    label: 'Resources',
    docs: [
      { slug: 'resources/architecture-overview', title: 'Architecture overview' },
      { slug: 'resources/glossary', title: 'Glossary' },
      { slug: 'resources/faq', title: 'FAQ' },
      { slug: 'resources/changelog', title: 'Changelog' },
    ],
  },
];
