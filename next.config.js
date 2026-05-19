// next.config.js — kept as JavaScript (not TypeScript) so that AWS
// Amplify's framework detector can statically read `output: 'export'`
// and provision the app as a WEB (static) platform instead of
// WEB_COMPUTE (SSR). With next.config.ts, Amplify's detector failed
// to parse the file, defaulted to SSR, and the deploy step then
// failed post-build with:
//
//   [ERROR]: !!! CustomerError: Can't find required-server-files.json
//           in build output directory
//
// (required-server-files.json is only produced by SSR builds; static
// export deliberately doesn't emit it.) Renaming to .js eliminated
// the misdetection. Don't rename back to .ts without re-verifying the
// Amplify deploy still picks WEB / static.

/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
