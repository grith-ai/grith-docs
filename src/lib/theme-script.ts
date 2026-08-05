/**
 * FOUC-guard script for the design-system theme.
 *
 * Ported from grith-website apps/web/src/lib/theme-script.ts (F4). Rendered
 * inline in <head> (before paint, before hydration) so the correct data-theme
 * attribute is set on <html> before any styled content renders. Resolution
 * order: localStorage 'grith-theme' -> prefers-color-scheme -> dark (the
 * design-system default; see src/theme/grith-theme.css).
 */

export const THEME_STORAGE_KEY = 'grith-theme';

export const themeInitScript = `(function () {
  var theme = 'dark';
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      theme = 'light';
    }
  } catch (_) {
    /* storage unavailable - keep the dark default */
  }
  document.documentElement.dataset.theme = theme;
})();`;
