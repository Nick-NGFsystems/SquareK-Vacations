'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * Route-level error boundary.
 *
 * Replaces Next.js's bare "Application error: a client-side exception has
 * occurred" screen with a branded page that still links visitors back into the
 * site (and gives them a phone number), so a render failure never costs a booking.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Square K page error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 py-16">
      <div className="w-full max-w-md text-center">
        <img
          src="/images/squarek-logo.png"
          alt="Square K Vacations"
          className="mx-auto h-16 w-auto"
        />

        <h1 className="mt-8 font-heading text-2xl font-bold text-[var(--text)] sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-[var(--muted)]">
          Sorry about that — this page ran into a problem loading. Try again, or
          head back home to keep browsing our Michigan retreats.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#9b8060] px-6 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--border)] bg-white px-6 py-2.5 font-body text-sm font-semibold text-[var(--text)] shadow-sm transition hover:bg-[var(--surface)]"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-8 font-body text-xs text-[var(--muted)]">
          Need help booking? Call{' '}
          <a href="tel:16163339601" className="font-semibold hover:underline">
            (616) 333-9601
          </a>
        </p>
      </div>
    </div>
  )
}
