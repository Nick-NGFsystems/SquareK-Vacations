'use client'

import { useEffect } from 'react'

/**
 * Last-resort boundary for failures in the ROOT LAYOUT itself.
 *
 * This replaces the entire document, so globals.css (and therefore Tailwind)
 * is not loaded here — inline styles are required rather than a style choice.
 * Keep it dependency-free and self-contained so it can never fail to render.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Square K global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafaf7',
          color: '#1c2318',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: '420px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
            Square K Vacations
          </h1>
          <p style={{ marginTop: '16px', fontSize: '15px', lineHeight: 1.6, color: '#6b6b60' }}>
            Sorry — the site ran into a problem loading. Please try again in a
            moment.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: '24px',
              minHeight: '44px',
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#9b8060',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
          <p style={{ marginTop: '28px', fontSize: '13px', color: '#6b6b60' }}>
            Need help booking? Call{' '}
            <a href="tel:16163339601" style={{ color: '#9b8060', fontWeight: 600 }}>
              (616) 333-9601
            </a>
          </p>
        </div>
      </body>
    </html>
  )
}
