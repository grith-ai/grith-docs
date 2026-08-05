import { themeInitScript } from '@/lib/theme-script';

/**
 * Inline FOUC-guard script. Render as the first child of <head> in the root
 * layout so `data-theme` is set on <html> before first paint:
 *
 *   <html suppressHydrationWarning>
 *     <head>
 *       <ThemeScript />
 *       ...
 *
 * (`suppressHydrationWarning` on <html> is needed because the script mutates
 * the data-theme attribute before React hydrates.)
 *
 * Server component - no client JS beyond the inline script itself.
 */
export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
