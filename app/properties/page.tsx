import SiteHeader from '@/components/layout/SiteHeader'
import PropertyCard from '@/components/PropertyCard'
import Link from 'next/link'
import { getNgfContent } from '@/lib/ngf'
import { properties } from '@/lib/properties'

export const metadata = {
  title: 'Our Properties - Square K Vacations',
  description: 'Browse all three Square K Michigan vacation retreats - Lakeshore Grand, Blueberry Grand, and Clam Lake Grand.',
}

export default async function PropertiesPage() {
  const content = await getNgfContent()
  const primary = content['brand.primaryColor'] || '#4a6741'
  const accent  = content['brand.accentColor']  ?? '#9b8060'

  const pageEyebrow = content['properties.eyebrow'] || 'Michigan Retreats'
  const pageTitle   = content['properties.title']   ?? 'Our Properties'
  const pageDesc    = content['properties.desc']    ?? 'Three distinct Michigan retreats, each offering something special. Browse, find your perfect fit, and request your dates.'
  const ctaHeading  = content['properties.cta.heading'] || 'Not sure which property is right for you?'
  const ctaSubtext  = content['properties.cta.subtext'] || 'Reach out directly and our team will help you find the perfect fit.'
  const ctaButton   = content['properties.cta.button']  ?? 'Contact Us'

  // Merge NGF content into each property so cards reflect edits
  const ngfProperties = properties.map(p => ({
    ...p,
    name:      content[`property.${p.slug}.name`]      ?? p.name,
    tagline:   content[`property.${p.slug}.tagline`]   ?? p.tagline,
    heroImage: content[`property.${p.slug}.heroImage`] || p.heroImage,
    bedrooms:  Number(content[`property.${p.slug}.bedrooms`]  ?? p.bedrooms),
    bathrooms: Number(content[`property.${p.slug}.bathrooms`] || p.bathrooms),
    maxGuests: Number(content[`property.${p.slug}.maxGuests`] || p.maxGuests),
    highlights: p.highlights.map((h, i) => ({
      ...h,
      icon:  content[`property.${p.slug}.highlights.${i}.icon`]  ?? h.icon,
      label: content[`property.${p.slug}.highlights.${i}.label`] || h.label,
    })),
  }))

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <SiteHeader primaryColor={primary} accentColor={accent} />

      {/* Page header */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-16 sm:px-6 lg:px-8" data-ngf-section="Properties Page">
        <div className="mx-auto max-w-6xl">
          <p
            className="font-body text-xs font-semibold uppercase tracking-widest"
            style={{ color: accent }}
            data-ngf-field="properties.eyebrow"
            data-ngf-label="Eyebrow Tag"
            data-ngf-type="text"
            data-ngf-section="Properties Page"
          >{pageEyebrow}</p>
          <h1
            className="mt-1 font-heading text-4xl font-bold text-[var(--text)] sm:text-5xl"
            data-ngf-field="properties.title"
            data-ngf-label="Page Title"
            data-ngf-type="text"
            data-ngf-section="Properties Page"
          >{pageTitle}</h1>
          <p
            className="mt-4 max-w-xl font-body text-base leading-relaxed text-[var(--muted)]"
            data-ngf-field="properties.desc"
            data-ngf-label="Page Description"
            data-ngf-type="textarea"
            data-ngf-section="Properties Page"
          >{pageDesc}</p>
        </div>
      </section>

      {/* Properties grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ngfProperties.map(p => (
              <PropertyCard key={p.slug} property={p} accentColor={accent} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-12 sm:px-6 lg:px-8" data-ngf-section="Properties CTA">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3
              className="font-heading text-xl font-semibold text-[var(--text)]"
              data-ngf-field="properties.cta.heading"
              data-ngf-label="CTA Heading"
              data-ngf-type="text"
              data-ngf-section="Properties CTA"
            >{ctaHeading}</h3>
            <p
              className="mt-1 font-body text-sm text-[var(--muted)]"
              data-ngf-field="properties.cta.subtext"
              data-ngf-label="CTA Subtext"
              data-ngf-type="text"
              data-ngf-section="Properties CTA"
            >{ctaSubtext}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 min-h-11 items-center justify-center rounded-lg px-6 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: accent }}
            data-ngf-field="properties.cta.button"
            data-ngf-label="CTA Button Text"
            data-ngf-type="text"
            data-ngf-section="Properties CTA"
          >
            {ctaButton}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-4 py-8 text-center">
        <p className="font-body text-xs text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Square K LLC. All rights reserved. &middot; Fennville &amp; Bellaire, Michigan
        </p>
      </footer>
    </div>
  )
}
