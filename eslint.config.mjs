import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Build output, at the repo root and inside any nested git worktree.
    '**/.next/**',
    '**/out/**',
    '**/build/**',
    '.worktrees/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
