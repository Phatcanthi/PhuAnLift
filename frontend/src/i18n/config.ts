export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

/** Served without a URL prefix; every other locale lives under `/<locale>`. */
export const defaultLocale: Locale = "vi";

export const isLocale = (value: string | undefined): value is Locale => locales.includes(value as Locale);

/** Prefixes an internal path (`/`, `/products`, `/#about`, `/products?x=1#y`) for the given locale. */
export function localizedPath(locale: Locale, href: string): string {
  if (locale === defaultLocale || !href.startsWith("/")) return href;
  // "/", "/#about" and "/?x=1" all address the locale home page, without a trailing slash
  if (href === "/" || href.startsWith("/#") || href.startsWith("/?")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Inverse of `localizedPath` for a pathname: `/en/products` becomes `/products`. */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}
