'use client'
import { resetCookieConsent } from '@/components/CookieConsent'

/**
 * "Cookie settings" — clears the stored choice so the consent banner returns.
 *
 * Required, not decorative: consent must be as easy to withdraw as to give.
 * Without this the banner appears exactly once and the visitor's first click is
 * permanent — no way to revoke analytics, no way to change their mind.
 *
 * This site has no shared Footer component (each page renders its own), so it is
 * mounted once in app/layout.tsx after {children} rather than inside a footer.
 * Renders nothing unless the site actually loads cookie-based analytics.
 */
export default function CookieSettingsLink() {
  if (process.env.NEXT_PUBLIC_COOKIE_ANALYTICS !== '1') return null
  return (
    <div className="px-4 pb-6 text-center text-xs text-neutral-400">
      <button
        type="button"
        onClick={resetCookieConsent}
        className="underline underline-offset-2 hover:text-neutral-600"
      >
        Cookie settings
      </button>
    </div>
  )
}
