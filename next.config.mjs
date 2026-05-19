// next.config.mjs — kept as ESM JavaScript (not TypeScript, not
// CommonJS) so that AWS Amplify's framework detector can statically
// read `output: 'export'` and provision the app as a WEB (static)
// platform instead of WEB_COMPUTE (SSR). The deploy step otherwise
// fails post-build with:
//
//   [ERROR]: !!! CustomerError: Can't find required-server-files.json
//           in build output directory
//
// (required-server-files.json is only produced by SSR builds;
// static export deliberately doesn't emit it.)
//
// Detector-format history:
//   - next.config.ts  → detector couldn't parse TypeScript;
//                       Amplify locked the app at Platform: WEB_COMPUTE.
//   - next.config.js  → CommonJS export; detector still picked
//                       WEB_COMPUTE.
//   - next.config.mjs → explicit ESM; current attempt to coax the
//                       detector into seeing `output: 'export'`.
//
// If this still ends up at WEB_COMPUTE, the next escape hatch is
// `aws amplify update-app --platform WEB` (or recreating the app
// via the AWS CLI with `--platform WEB` explicit), since the
// console flow doesn't expose the platform override.
//
// Don't switch back to .ts / .js without re-verifying that the
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

export default nextConfig;
