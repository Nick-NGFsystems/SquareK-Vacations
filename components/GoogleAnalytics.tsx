'use client'
import Script from 'next/script'
import { hasCookieConsent } from '@/components/CookieConsent'

/**
 * GA4, gated behind cookie consent.
 *
 * WHY 'use client': GA4 sets cookies, so it must not load until the visitor has
 * actively accepted. Consent lives in localStorage, which a server component
 * cannot read — this previously rendered unconditionally, so the tracker ran for
 * every visitor before any choice was made.
 *
 * hasCookieConsent() returns false during SSR, so nothing is emitted
 * server-side. CookieConsent reloads on Accept, which is what re-evaluates this.
 *
 * The banner only renders when NEXT_PUBLIC_COOKIE_ANALYTICS=1, so that env var
 * must be set in Vercel alongside NEXT_PUBLIC_GA_ID — without it consent can
 * never be granted and analytics never load at all.
 */
export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID
  if (!id || !hasCookieConsent()) return null
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}');
      `}</Script>
    </>
  )
}
