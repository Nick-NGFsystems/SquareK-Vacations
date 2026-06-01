/**
 * Single source of truth for the site's canonical origin.
 *
 * Accepts NEXT_PUBLIC_SITE_URL with or without a protocol / trailing slash
 * (e.g. "https://squarekvacations.com", "squarekvacations.com", or
 * "www.squarekvacations.com") and always returns a clean origin like
 * "https://squarekvacations.com" — no trailing slash.
 *
 * Falls back to the real domain (NOT a typo) if the env var is unset, so the
 * sitemap, robots, canonical tags, and structured data never point at the
 * wrong host.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'squarekvacations.com'
  const host = raw
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '')
    .trim()
  return `https://${host}`
}
