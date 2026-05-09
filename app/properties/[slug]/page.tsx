import { notFound } from 'next/navigation'
import Link from 'next/link'
import SiteHeader from '@/components/layout/SiteHeader'
import PhotoGallery from '@/components/PhotoGallery'
import AvailabilityCalendar from '@/components/AvailabilityCalendar'
import BookingRequestForm from '@/components/BookingRequestForm'
import { getNgfContent } from '@/lib/ngf'
import { getPropertyBySlug, getAllPropertySlugs } from '@/lib/properties'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPropertySlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  if (!property) return {}
  return {
    title: `${property.name} — Square K Vacations`,
    description: property.description,
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  if (!property) notFound()

  const content = await getNgfContent()
  const primary = content['brand.primaryColor'] ?? '#4a6741'
  const accent  = content['brand.accentColor']  ?? '#9b8060'

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <SiteHeader primaryColor={primary} accentColor={accent} />

      {/* ── Hero ── */}
      <section className="relative h-[55vh] overflow-hidden bg-[var(--text)]">
        <img
          src={property.heroImage}
          alt={property.name}
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
            <Link
              href="/properties"
              className="mb-4 inline-flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-wide text-white/70 hover:text-white transition-colors"
            >
              ← All Properties
            </Link>
            <div className="font-body text-sm font-semibold text-white/70">{property.city}, {property.state}</div>
            <h1 className="mt-1 font-heading text-4xl font-bold text-white sm:text-5xl">{property.name}</h1>
            <p className="mt-2 font-body text-lg text-white/80">{property.tagline}</p>
          </div>
        </div>
      </section>

      {/* ── Quick stats bar ── */}
      <div className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-body text-sm text-[var(--muted)]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
            <span><strong className="text-[var(--text)]">{property.bedrooms}</strong> Bedrooms</span>
          </div>
          <div className="flex items-center gap-2 font-body text-sm text-[var(--muted)]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
            <span>Sleeps <strong className="text-[var(--text)]">{property.maxGuests}</strong></span>
          </div>
          <div className="flex items-center gap-2 font-body text-sm text-[var(--muted)]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
            <span><strong className="text-[var(--text)]">{property.bathrooms}</strong> Bathrooms</span>
          </div>
          <div className="flex items-center gap-2 font-body text-sm text-[var(--muted)]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
            <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
          </div>
          <div className="ml-auto">
            <a
              href="#booking-request"
              className="inline-flex min-h-10 items-center justify-center rounded-lg px-5 py-2 font-body text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Request a Stay
            </a>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

          {/* Left col — main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Photo gallery */}
            <div>
              <h2 className="mb-5 font-heading text-2xl font-semibold text-[var(--text)]">Gallery</h2>
              <PhotoGallery images={property.images} propertyName={property.name} />
              {property.builderCredit && (
                <p className="mt-3 font-body text-xs text-[var(--muted)]">
                  Renderings provided by <span className="font-semibold">{property.builderCredit}</span>. Final photography coming soon.
                </p>
              )}
            </div>

            {/* About */}
            <div>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-[var(--text)]">About This Property</h2>
              <div className="space-y-4 font-body text-base leading-relaxed text-[var(--muted)]">
                {property.longDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-[var(--text)]">Highlights</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.highlights.map(h => (
                  <div
                    key={h.label}
                    className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white p-4"
                  >
                    <span className="text-2xl">{h.icon}</span>
                    <span className="font-body text-sm font-semibold text-[var(--text)]">{h.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-[var(--text)]">Amenities</h2>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {property.amenities.map(a => (
                  <li key={a} className="flex items-center gap-2.5 font-body text-sm text-[var(--muted)]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${primary}20` }}>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: primary }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability */}
            <div>
              <h2 className="mb-2 font-heading text-2xl font-semibold text-[var(--text)]">Availability</h2>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
                <AvailabilityCalendar
                  propertySlug={property.slug}
                  primaryColor={primary}
                  accentColor={accent}
                />
              </div>
            </div>

          </div>

          {/* Right col — booking form (sticky) */}
          <div id="booking-request" className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingRequestForm
                propertyName={property.name}
                propertySlug={property.slug}
                accentColor={accent}
              />
              {/* Direct contact */}
              <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center">
                <p className="font-body text-xs text-[var(--muted)]">Prefer to call or email directly?</p>
                <a href="tel:16163339601" className="mt-1 block font-body text-sm font-semibold hover:underline" style={{ color: accent }}>
                  (616) 333-9601
                </a>
                <a href="mailto:Squarek.llc.mi@gmail.com" className="block font-body text-xs text-[var(--muted)] hover:underline">
                  Squarek.llc.mi@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-4 py-8 text-center">
        <p className="font-body text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} Square K LLC. All rights reserved. ·{' '}
          <Link href="/properties" className="hover:underline">All Properties</Link>
          {' · '}
          <Link href="/contact" className="hover:underline">Contact</Link>
        </p>
      </footer>
    </div>
  )
}
