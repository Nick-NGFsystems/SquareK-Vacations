'use client'

/**
 * GeneralInquiryForm — visual UI only for now.
 *
 * FUTURE INTEGRATION:
 * Wire up to /api/contact/route.ts → Resend email → NGF portal notification
 */

import { useState } from 'react'

interface Props {
  accentColor?: string
  primaryColor?: string
}

export default function GeneralInquiryForm({ accentColor = '#9b8060' }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // TODO: POST to /api/contact when backend is ready
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${accentColor}20` }}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: accentColor }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-[var(--text)]">Message Sent!</h3>
        <p className="mt-2 font-body text-sm text-[var(--muted)]">
          Thanks for reaching out. Tyler will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">First Name *</label>
          <input required name="firstName" type="text" placeholder="Jane" className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 font-body text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none" />
        </div>
        <div>
          <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Last Name *</label>
          <input required name="lastName" type="text" placeholder="Smith" className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 font-body text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none" />
        </div>
        <div>
          <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Email *</label>
          <input required name="email" type="email" placeholder="jane@example.com" className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 font-body text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none" />
        </div>
        <div>
          <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Phone</label>
          <input name="phone" type="tel" placeholder="(616) 555-1234" className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 font-body text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Message *</label>
          <textarea required name="message" rows={4} placeholder="Tell us what you're looking for..." className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 font-body text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none" />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 inline-flex w-full min-h-11 items-center justify-center rounded-lg font-body text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: accentColor }}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
