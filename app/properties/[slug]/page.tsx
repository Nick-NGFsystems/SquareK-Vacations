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
    title: `${property.name} - Square K Vacations`,
    description: property.description,
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  if (!property) notFound()

  const content = await getNgfContent()
  const primary = content['brand.primaryColor'] || '#4a6741'
  const accent  = content['brand.accentColor'] || '#9b8060'

  const contactPhone     = content['contact.phone'] || '(616) 333-9601'
  const contactEmail     = content['contact.email'] || 'Squarek.llc.mi@gmail.com'
  const contactDirectCta = content['contact.direct.cta'] || 'Prefer to call or email directly?'

  // Property stats — NGF override falls back to static numbers
  const propBedrooms  = content[`property.${slug}.bedrooms`] || String(property.bedrooms)
  const propBathrooms = content[`property.${slug}.bathrooms`] || String(property.bathrooms)
  const propMaxGuests = content[`property.${slug}.maxGuests`] || String(property.maxGuests)
  const propAddress   = content[`property.${slug}.address`] || property.address
  const propCity      = content[`property.${slug}.city`] || property.city
  const propState     = content[`property.${slug}.state`] || property.state
  const propZip       = content[`property.${slug}.zipCode`] || property.zipCode

  // ── Property-specific editable content (NGF overrides static data) ─────
  const propName      = content[`property.${slug}.name`] || property.name
  const propTagline   = content[`property.${slug}.tagline`] || property.tagline
  const propLongDesc  = content[`property.${slug}.longDescription`] || property.longDescription
  const propHeroImage = content[`property.${slug}.heroImage`] || property.heroImage
  const propHeroImageAlt = content[`property.${slug}.heroImage_alt`] || propName

  // Gallery: load NGF-keyed images if present, otherwise fall back to static array
  const ngfImages: string[] = []
  for (let i = 0; i < 50; i++) {
    const v = content[`property.${slug}.images.${i}`]
    if (v) ngfImages.push(v)
    else if (i >= property.images.length) break
  }
  const propImages = ngfImages.length > 0 ? ngfImages : property.images

  // Highlights & amenities with per-item NGF override
  const propHighlights = property.highlights.map((h, i) => ({
    icon:  content[`property.${slug}.highlights.${i}.icon`] || h.icon,
    label: content[`property.${slug}.highlights.${i}.label`] || h.label,
  }))
  const propAmenities = property.amenities.map((a, i) =>
    content[`property.${slug}.amenities.${i}`] || a
  )

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <SiteHeader primaryColor={primary} accentColor={accent} />

      {/* ── Hidden NGF image-editor anchors (gallery only — hero annotation is on the img) ── */}
      {propImages.map((_, i) => (
        <span key={i} aria-hidden="true" className="sr-only"
          data-ngf-field={`property.${slug}.images.${i}`}
          data-ngf-label={`Gallery Photo ${i + 1}`}
          data-ngf-type="image"
          data-ngf-section="Property Images"
          data-ngf-aspect="3:2"
        />
      ))}

      {/* Breadcrumb nav */}
      <div className="border-b border-[var(--border)] bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-lg font-body text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All Properties
          </Link>
          <a
            href="#booking-request"
            className="inline-flex min-h-9 items-center justify-center rounded-lg px-4 py-1.5 font-body text-sm font-semibold text-white shadow-sm transition hover:opacity-90 sm:hidden"
            style={{ backgroundColor: accent }}
          >
            Request a Stay
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden sm:h-[60vh]" style={{ backgroundColor: primary }}>
        {propHeroImage && (
          <img
            src={propHeroImage}
            alt={propHeroImageAlt}
            data-ngf-field={`property.${slug}.heroImage`}
            data-ngf-label="Hero Image"
            data-ngf-type="image"
            data-ngf-section="Property Images"
            data-ngf-aspect="16:9"
            className="h-full w-full object-cover opacity-75"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
            <div className="font-body text-sm font-semibold text-white/70">{propCity}, {propState}</div>
            <h1
              className="mt-1 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
              data-ngf-field={`property.${slug}.name`}
              data-ngf-label="Property Name"
              data-ngf-type="text"
              data-ngf-section="Property"
            >{propName}</h1>
            <p
              className="mt-2 font-body text-base text-white/80 sm:text-lg"
              data-ngf-field={`property.${slug}.tagline`}
              data-ngf-label="Tagline"
              data-ngf-type="text"
              data-ngf-section="Property"
            >{propTagline}</p>
          </div>
        </div>
      </section>

      {/* Quick stats bar */}
      <div className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-5 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-body text-sm text-[var(--muted)]">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
            <span>
              <strong
                className="text-[var(--text)]"
                data-ngf-field={`property.${slug}.bedrooms`}
                data-ngf-label="Bedrooms"
                data-ngf-type="text"
                data-ngf-section="Property"
              >{propBedrooms}</strong> Bedrooms
            </span>
          </div>
          <div className="flex items-center gap-2 font-body text-sm text-[var(--muted)]">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>
            <span>
              <strong
                className="text-[var(--text)]"
                data-ngf-field={`property.${slug}.bathrooms`}
                data-ngf-label="Bathrooms"
                data-ngf-type="text"
                data-ngf-section="Property"
              >{propBathrooms}</strong> Bathrooms
            </span>
          </div>
          <div className="flex items-center gap-2 font-body text-sm text-[var(--muted)]">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
            <span>Sleeps <strong
                className="text-[var(--text)]"
                data-ngf-field={`property.${slug}.maxGuests`}
                data-ngf-label="Max Guests"
                data-ngf-type="text"
                data-ngf-section="Property"
              >{propMaxGuests}</strong>
            </span>
          </div>
          <div className="hidden items-center gap-2 font-body text-sm text-[var(--muted)] md:flex">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
            <span
                data-ngf-field={`property.${slug}.address`}
                data-ngf-label="Street Address"
                data-ngf-type="text"
                data-ngf-section="Property"
              >{propAddress}, {propCity}, {propState} {propZip}</span>
          </div>
          <div className="ml-auto hidden sm:block">
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

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr]">

          {/* Left col */}
          <div className="space-y-12">

            {/* Gallery */}
            <div>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-[var(--text)]">Gallery</h2>
              <PhotoGallery images={propImages} propertyName={propName} />
            </div>

            {/* About */}
            <div>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-[var(--text)]">About This Property</h2>
              <div
                className="space-y-4 font-body text-base leading-relaxed text-[var(--muted)]"
                data-ngf-field={`property.${slug}.longDescription`}
                data-ngf-label="Property Description"
                data-ngf-type="textarea"
                data-ngf-section="Property"
              >
                {propLongDesc.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-[var(--text)]">Highlights</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {propHighlights.map((h, i) => (
                  <div
                    key={h.label}
                    className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white p-4"
                  >
                    <span
                      className="text-xl leading-none"
                      data-ngf-field={`property.${slug}.highlights.${i}.icon`}
                      data-ngf-label={`Highlight ${i + 1} Icon`}
                      data-ngf-type="text"
                      data-ngf-section="Highlights"
                    >{h.icon}</span>
                    <span
                      className="font-body text-sm font-semibold text-[var(--text)]"
                      data-ngf-field={`property.${slug}.highlights.${i}.label`}
                      data-ngf-label={`Highlight ${i + 1}`}
                      data-ngf-type="text"
                      data-ngf-section="Highlights"
                    >{h.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-[var(--text)]">Amenities</h2>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {propAmenities.map((a, i) => (
                  <li key={a} className="flex items-center gap-2.5 font-body text-sm text-[var(--muted)]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${primary}20` }}>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: primary }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span
                      data-ngf-field={`property.${slug}.amenities.${i}`}
                      data-ngf-label={`Amenity ${i + 1}`}
                      data-ngf-type="text"
                      data-ngf-section="Amenities"
                    >{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability */}
            <div>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-[var(--text)]">Availability</h2>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
                <AvailabilityCalendar
                  propertySlug={property.slug}
                  primaryColor={primary}
                  accentColor={accent}
                />
              </div>
            </div>

          </div>

          {/* Right col - booking form */}
          <div id="booking-request">
            <div className="sticky top-24">
              <BookingRequestForm
                propertyName={propName}
                propertySlug={property.slug}
                accentColor={accent}
              />
              <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center">
                <p
                  className="font-body text-xs text-[var(--muted)]"
                  data-ngf-field="contact.direct.cta"
                  data-ngf-label="Sidebar Contact Label"
                  data-ngf-type="text"
                  data-ngf-section="Contact"
                >{contactDirectCta}</p>
                <a
                  href={`tel:${contactPhone.replace(/[^0-9]/g, '')}`}
                  className="mt-1 block font-body text-sm font-semibold hover:underline"
                  style={{ color: accent }}
                  data-ngf-field="contact.phone"
                  data-ngf-label="Phone Number"
                  data-ngf-type="text"
                  data-ngf-section="Contact"
                >{contactPhone}</a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="block font-body text-xs text-[var(--muted)] hover:underline"
                  data-ngf-field="contact.email"
                  data-ngf-label="Email Address"
                  data-ngf-type="text"
                  data-ngf-section="Contact"
                >{contactEmail}</a>
              </div>

              <div className="mt-4 text-center">
                <Link href="/properties" className="font-body text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors hover:underline">
                  &larr; View all properties
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-4 py-8 text-center">
        <p className="font-body text-xs text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Square K LLC. All rights reserved. &middot;{' '}
          <Link href="/properties" className="hover:underline">All Properties</Link>
          {' · '}
          <Link href="/contact" className="hover:underline">Contact</Link>
        </p>
      </footer>
    </div>
  )
}
