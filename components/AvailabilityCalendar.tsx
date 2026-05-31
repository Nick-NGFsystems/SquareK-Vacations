'use client'

/**
 * AvailabilityCalendar
 *
 * Currently powered by manually-entered open/available date windows
 * (availableRanges on each Property). Dates outside all windows show
 * as unavailable.
 *
 * FUTURE INTEGRATION:
 * 1. Set `property.icalUrl` in lib/properties.ts once Tyler provides the
 *    Airbnb/VRBO iCal export URL for each property.
 * 2. Create /api/availability/[slug]/route.ts that fetches and parses the
 *    iCal feed server-side (to avoid CORS), returning unavailable date ranges.
 * 3. Replace `availableRanges` logic below with a fetch to that endpoint.
 */

import { useState, useMemo } from 'react'

interface Props {
  propertySlug: string
  primaryColor?: string
  accentColor?: string
  availableRanges: [string, string][] | null
}

function isAvailable(date: Date, ranges: [string, string][] | null): boolean {
  // null means all dates are open
  if (ranges === null) return true
  const ds = date.toISOString().slice(0, 10)
  return ranges.some(([start, end]) => ds >= start && ds <= end)
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return { firstDay, daysInMonth }
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa']

function CalendarMonth({
  year, month, primaryColor, availableRanges,
}: {
  year: number
  month: number
  primaryColor: string
  availableRanges: [string, string][] | null
}) {
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
          const avail = !past && isAvailable(date, availableRanges)
          const unavail = !past && !avail

          let cls = 'relative flex h-7 sm:h-8 w-full items-center justify-center rounded-lg font-body text-xs '
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

export default function AvailabilityCalendar({
  propertySlug: _,
  primaryColor = '#4a6741',
  accentColor: __,
  availableRanges,
}: Props) {
  const now = new Date()
  const [baseMonth] = useState({ year: now.getFullYear(), month: now.getMonth() })

  // Show from current month through September of the current season
  const months = useMemo(() => {
    const result = []
    let m = baseMonth.month
    let y = baseMonth.year
    // Keep adding months until we've passed September of the current/next year
    const endYear  = m <= 8 ? y : y + 1   // if past Sep, roll to next year
    const endMonth = 8                      // September (0-indexed)
    while (y < endYear || (y === endYear && m <= endMonth)) {
      result.push({ year: y, month: m })
      m++
      if (m > 11) { m = 0; y++ }
    }
    return result
  }, [baseMonth])

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-xs text-[var(--muted)]">
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

      <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {months.map(({ year, month }) => (
          <CalendarMonth
            key={`${year}-${month}`}
            year={year}
            month={month}
            primaryColor={primaryColor}
            availableRanges={availableRanges}
          />
        ))}
      </div>

      <p className="mt-4 font-body text-xs text-[var(--muted)]">
        * Availability shown is approximate and subject to confirmation. Submit a request below and our team will confirm your dates.
      </p>
    </div>
  )
}
