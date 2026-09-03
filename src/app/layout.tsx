import type { Metadata } from 'next';
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  CF_BEACON_TOKEN,
} from '@/lib/constants';
import ThemeScript from '@/components/shared/ThemeScript';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: '/og-image.png', width: 1280, height: 640 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GrithAI',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* FOUC guard: sets data-theme on <html> before first paint */}
        <ThemeScript />
        {/* Cloudflare Web Analytics. Cookieless and storage-free, so it needs
            no consent gate. The token is a public site identifier, not a
            secret; it ships in page source. Shared with grith.ai so both
            hosts report together - filter by Host to separate them.
            Production-only so local dev traffic stays out of the numbers.
            `defer` is redundant for a module script but @next/next/no-sync-scripts
            requires it explicitly - don't drop it. */}
        {process.env.NODE_ENV === 'production' && (
          <script
            type="module"
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
          />
        )}
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
