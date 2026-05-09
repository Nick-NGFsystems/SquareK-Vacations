'use client'

/**
 * AvailabilityCalendar — visual-only for now.
 *
 * FUTURE INTEGRATION:
 * 1. Set `property.icalUrl` in lib/properties.ts once Tyler provides the
 *    Airbnb/VRBO iCal export URL for each property.
 * 2. Create /api/availability/[slug]/route.ts that fetches and parses the
 *    iCal feed server-side (to avoid CORS), returning unavailable date ranges.
 * 3. Replace `mockUnavailableDates` below with a fetch to that endpoint.
 * 4. When the NGF admin portal is connected, Tyler will manage bookings there
 *    and the calendar will reflect confirmed dates automatically.
 */

import { useState, useMemo } from 'react'

interface Props {
  propertySlug: string
  primaryColor?: string
  accentColor?: string
}

// Mock unavailable date ranges — replace with iCal data when ready
const mockUnavailableDates: [string, string][] = [
  ['2026-05-23', '2026-05-27'],
  ['2026-06-06', '2026-06-10'],
  ['2026-06-20', '2026-06-28'],
  ['2026-07-04', '2026-07-08'],
  ['2026-07-18', '2026-07-25'],
]

function isUnavailable(date: Date): boolean {
  const ds = date.toISOString().slice(0, 10)
  return mockUnavailableDates.some(([start, end]) => ds >= start && ds <= end)
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return { firstDay, daysInMonth }
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa']

function CalendarMonth({ year, month, primaryColor }: { year: number; month: number; primaryColor: string }) {
  const { firstDay, daysInMonth } = getMonthDays(year, month)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div>
      <h4 className="mb-3 text-center font-body text-sm font-semibold text-[var(--text)]">
        {MONTHS[month]} {year}
      </h4>
      <div className="grid grid-cols-7 gap-px">
        {DAYS.map(d => (
          <div key={d} className="py-1 text-center font-body text-xs font-semibold text-[var(--muted)]">{d}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const date = new Date(year, month, day)
          const past = date < today
          const unavail = !past && isUnavailable(date)

          let cls = 'relative flex h-8 w-full items-center justify-center rounded-lg font-body text-xs '
          if (past) cls += 'text-[var(--muted)] opacity-40'
          else if (unavail) cls += 'bg-red-50 text-red-400 line-through cursor-not-allowed'
          else cls += 'text-[var(--text)] hover:bg-[var(--surface)] cursor-pointer'

          return (
            <div key={day} className={cls} title={unavail ? 'Not available' : undefined}>
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function AvailabilityCalendar({ propertySlug: _, primaryColor = '#4a6741', accentColor = '#9b8060' }: Props) {
  const now = new Date()
  const [baseMonth] = useState({ year: now.getFullYear(), month: now.getMonth() })

  const months = useMemo(() => {
    const result = []
    for (let i = 0; i < 2; i++) {
      let m = baseMonth.month + i
      let y = baseMonth.year
      if (m > 11) { m -= 12; y += 1 }
      result.push({ year: y, month: m })
    }
    return result
  }, [baseMonth])

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 font-body text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-white border border-[var(--border)]" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-red-50 border border-red-200" /> Unavailable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-[var(--surface)] opacity-40 border border-[var(--border)]" /> Past
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {months.map(({ year, month }) => (
          <CalendarMonth key={`${year}-${month}`} year={year} month={month} primaryColor={primaryColor} />
        ))}
      </div>

      <p className="mt-4 font-body text-xs text-[var(--muted)]">
        * Availability shown is approximate and subject to confirmation. Submit a request below and Tyler will confirm your dates within 24 hours.
      </p>
    </div>
  )
}
