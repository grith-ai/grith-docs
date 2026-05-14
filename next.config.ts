import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Anchor the Turbopack workspace root to wherever `next` is invoked from
  // (always this project's root). Without this, Turbopack walks up looking
  // for lockfiles and may pick a parent dir (e.g. a stray
  // `~/package-lock.json`), then fail to resolve dependencies because
  // `node_modules` doesn't exist there.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
