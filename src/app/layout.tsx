import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: 'light only' }}>
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{ backgroundColor: '#ffffff', color: '#0d1117' }}
      >
        <div className="relative isolate">
          {/* Global page gradient — matches grith-website */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px]"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,168,90,0.18) 0%, rgba(0,168,90,0.06) 50%, transparent 80%)',
            }}
            aria-hidden="true"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
