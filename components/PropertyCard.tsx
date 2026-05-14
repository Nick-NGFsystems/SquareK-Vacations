import Link from 'next/link'
import { Property } from '@/types'

interface PropertyCardProps {
  property: Property
  accentColor?: string
}

export default function PropertyCard({ property, accentColor = '#9b8060' }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition hover:shadow-md"
    >
      {/* Property image / placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
        {property.heroImage ? (
          <img
            src={property.heroImage}
            alt={property.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[var(--surface)] to-[var(--border)]">
            <svg className="h-10 w-10 text-[var(--border)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21l6.75-6.75 1.5 1.5M21 21V8.25A2.25 2.25 0 0018.75 6h-13.5A2.25 2.25 0 003 8.25V21m18 0H3" />
            </svg>
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Photos Coming Soon</span>
          </div>
        )}
        {property.status === 'coming-soon' && (
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--text)] backdrop-blur-sm">
            Coming Soon
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          {property.city}, {property.state}
        </div>
        <h3 className="font-heading text-xl font-semibold text-[var(--text)] group-hover:opacity-80 transition-opacity">
          {property.name}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-[var(--muted)]">
          {property.tagline}
        </p>

        {/* Quick stats */}
        <div className="mt-4 flex items-center gap-4 border-t border-[var(--border)] pt-4 font-body text-sm text-[var(--muted)]">
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            {property.bedrooms} beds
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {property.maxGuests} guests
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {property.bathrooms} baths
          </span>
        </div>

        {/* Highlights */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {property.highlights.slice(0, 3).map(h => (
            <span
              key={h.label}
              className="inline-flex items-center gap-1 rounded-full bg-[var(--surface)] px-2.5 py-1 font-body text-xs font-medium text-[var(--text)]"
            >
              {h.icon} {h.label}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-body text-sm font-semibold" style={{ color: accentColor }}>
            View Property &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
