'use client'

/**
 * BookingRequestForm - visual UI only for now.
 *
 * FUTURE INTEGRATION:
 * 1. Create /api/booking-request/route.ts that validates form data and emails the team.
 * 2. Replace the mock handleSubmit below with a real fetch POST.
 * 3. When the NGF admin portal is connected, requests will appear in the client dashboard.
 */

import { useState } from 'react'

interface Props {
  propertyName: string
  propertySlug: string
  accentColor?: string
}

const inputCls = 'w-full min-w-0 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 font-body text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]'
const labelCls = 'mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]'

export default function BookingRequestForm({ propertyName, propertySlug: _, accentColor = '#9b8060' }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${accentColor}20` }}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: accentColor }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-[var(--text)]">Request Received!</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-[var(--muted)]">
          Thank you for your interest in {propertyName}. Our team will review your request and be in touch to confirm availability and next steps.
        </p>
        <p className="mt-3 font-body text-xs text-[var(--muted)]">
          Questions? Call us at{' '}
          <a href="tel:16163339601" className="font-semibold hover:underline" style={{ color: accentColor }}>
            (616) 333-9601
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
      <h3 className="font-heading text-xl font-semibold text-[var(--text)]">Request a Stay</h3>
      <p className="mt-1 font-body text-sm text-[var(--muted)]">
        Submit your details and our team will confirm availability.
      </p>

      <input type="hidden" name="propertyName" value={propertyName} />

      <div className="mt-6 grid grid-cols-2 gap-3">
        {/* Name row */}
        <div>
          <label className={labelCls}>First Name *</label>
          <input required name="firstName" type="text" placeholder="Jane" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Last Name *</label>
          <input required name="lastName" type="text" placeholder="Smith" className={inputCls} />
        </div>

        {/* Contact row */}
        <div className="col-span-2">
          <label className={labelCls}>Email *</label>
          <input required name="email" type="email" placeholder="jane@example.com" className={inputCls} />
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Phone *</label>
          <input required name="phone" type="tel" placeholder="(616) 555-1234" className={inputCls} />
        </div>

        {/* Dates — side by side with overflow-hidden parent to contain native date UI */}
        <div className="col-span-2 grid grid-cols-2 gap-3 overflow-hidden">
          <div className="min-w-0">
            <label className={labelCls}>Check-In *</label>
            <input
              required
              name="checkIn"
              type="date"
              className={inputCls}
              style={{ boxSizing: 'border-box' }}
            />
          </div>
          <div className="min-w-0">
            <label className={labelCls}>Check-Out *</label>
            <input
              required
              name="checkOut"
              type="date"
              className={inputCls}
              style={{ boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Guests */}
        <div className="col-span-2">
          <label className={labelCls}>Number of Guests *</label>
          <select required name="guests" className={inputCls}>
            <option value="">Select...</option>
            {Array.from({ length: 14 }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="col-span-2">
          <label className={labelCls}>Message / Special Requests</label>
          <textarea name="message" rows={3} placeholder="Tell us about your group, any special occasions, or questions you have..." className={`${inputCls} resize-none`} />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full min-h-11 items-center justify-center rounded-lg font-body text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: accentColor }}
      >
        {loading ? 'Sending Request...' : 'Submit Request'}
      </button>
      <p className="mt-3 text-center font-body text-xs text-[var(--muted)]">
        No payment required to request. Our team will confirm and discuss next steps.
      </p>
    </form>
  )
}
