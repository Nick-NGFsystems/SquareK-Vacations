import Link from 'next/link'
import SiteHeader from '@/components/layout/SiteHeader'
import PropertyCard from '@/components/PropertyCard'
import { getNgfContent } from '@/lib/ngf'
import { properties } from '@/lib/properties'

export default async function HomePage() {
  const content = await getNgfContent()

  const businessName = content['brand.businessName'] ?? 'Square K Vacations'
  const tagline      = content['brand.tagline']      ?? 'Rent with peace of mind.'
  const primary      = content['brand.primaryColor'] ?? '#4a6741'
  const accent       = content['brand.accentColor']  ?? '#9b8060'

  const heroEyebrow  = content['hero.eyebrow']  ?? 'Michigan Vacation Rentals'
  const heroHeadline = content['hero.headline'] ?? "Michigan's Premier Vacation Retreats"
  const heroSubhead  = content['hero.subhead']  ?? 'Lakeshore luxury and up-north escapes — curated by Square K for an unforgettable stay.'
  const heroCta      = content['hero.cta']      ?? 'Browse Properties'

  const howTitle = content['how.title'] ?? 'How It Works'
  const howSteps = [
    { num: '01', title: content['how.steps.0.title'] ?? 'Browse', desc: content['how.steps.0.desc'] ?? 'Explore our curated Michigan properties and find the retreat that fits your group.' },
    { num: '02', title: content['how.steps.1.title'] ?? 'Request', desc: content['how.steps.1.desc'] ?? 'Submit a stay request with your dates, group size, and any questions.' },
    { num: '03', title: content['how.steps.2.title'] ?? 'Confirmed', desc: content['how.steps.2.desc'] ?? 'Our team reviews every request and confirms availability promptly.' },
    { num: '04', title: content['how.steps.3.title'] ?? 'Enjoy', desc: content['how.steps.3.desc'] ?? 'Show up, unpack, and enjoy every moment of your Michigan getaway.' },
  ]

  const aboutTitle = content['about.title'] ?? 'The Square K Promise'
  const aboutBody  = content['about.body']  ?? 'Every Square K property is owner-operated — not a faceless platform. That means genuine care, fast responses, and a stay that actually lives up to the photos.'

  const ctaTitle  = content['cta.title']  ?? 'Ready to plan your Michigan escape?'
  const ctaButton = content['cta.button'] ?? 'Browse Properties'

  const copyright = content['footer.copyright'] ?? `© ${new Date().getFullYear()} Square K LLC. All rights reserved.`

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <SiteHeader primaryColor={primary} accentColor={accent} />

      {/* Hero */}
      <section
        id="hero"
        data-ngf-section="Hero"
        className="relative flex min-h-[60vh] items-end overflow-hidden bg-[var(--text)] sm:min-h-[85vh]"
      >
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80"
          alt="Square K Vacation Rental - Michigan lake house"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:pb-20 sm:pt-32 sm:px-6 lg:px-8">
          <span
            data-ngf-field="hero.eyebrow"
            data-ngf-label="Eyebrow Tag"
            data-ngf-type="text"
            data-ngf-section="Hero"
            className="mb-3 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
          >
            {heroEyebrow}
          </span>
          <h1
            data-ngf-field="hero.headline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Hero"
            className="font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {heroHeadline}
          </h1>
          <p
            data-ngf-field="hero.subhead"
            data-ngf-label="Subheadline"
            data-ngf-type="textarea"
            data-ngf-section="Hero"
            className="mt-3 max-w-xl font-body text-base leading-relaxed text-white/80 sm:mt-5 sm:text-lg"
          >
            {heroSubhead}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Link
              href="/properties"
              data-ngf-field="hero.cta"
              data-ngf-label="Button Text"
              data-ngf-type="text"
              data-ngf-section="Hero"
              className="inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition hover:opacity-90 sm:min-h-12 sm:px-7 sm:py-3"
              style={{ backgroundColor: accent }}
            >
              {heroCta}
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-2.5 font-body text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:min-h-12 sm:px-7 sm:py-3"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Properties */}
      <section id="properties" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Our Retreats</p>
              <h2 className="mt-1 font-heading text-3xl font-bold text-[var(--text)] sm:text-4xl">Michigan Properties</h2>
            </div>
            <Link
              href="/properties"
              className="hidden font-body text-sm font-semibold hover:underline sm:block"
              style={{ color: accent }}
            >
              View All &rarr;
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map(p => (
              <PropertyCard key={p.slug} property={p} accentColor={accent} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/properties"
              className="font-body text-sm font-semibold hover:underline"
              style={{ color: accent }}
            >
              View All Properties &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        data-ngf-section="How It Works"
        className="bg-[var(--surface)] px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Simple Process</p>
            <h2
              data-ngf-field="how.title"
              data-ngf-label="Section Title"
              data-ngf-type="text"
              data-ngf-section="How It Works"
              className="mt-1 font-heading text-3xl font-bold text-[var(--text)] sm:text-4xl"
            >
              {howTitle}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howSteps.map((step, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl font-body text-sm font-bold text-white"
                  style={{ backgroundColor: primary }}
                >
                  {step.num}
                </div>
                <h3
                  data-ngf-field={`how.steps.${i}.title`}
                  data-ngf-label="Step Title"
                  data-ngf-type="text"
                  data-ngf-section="How It Works"
                  className="font-heading text-lg font-semibold text-[var(--text)]"
                >
                  {step.title}
                </h3>
                <p
                  data-ngf-field={`how.steps.${i}.desc`}
                  data-ngf-label="Description"
                  data-ngf-type="textarea"
                  data-ngf-section="How It Works"
                  className="mt-2 font-body text-sm leading-relaxed text-[var(--muted)]"
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        data-ngf-section="About"
        className="px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Who We Are</p>
              <h2
                data-ngf-field="about.title"
                data-ngf-label="Section Title"
                data-ngf-type="text"
                data-ngf-section="About"
                className="mt-1 font-heading text-3xl font-bold text-[var(--text)] sm:text-4xl"
              >
                {aboutTitle}
              </h2>
              <p
                data-ngf-field="about.body"
                data-ngf-label="Body Text"
                data-ngf-type="textarea"
                data-ngf-section="About"
                className="mt-6 font-body text-base leading-relaxed text-[var(--muted)]"
              >
                {aboutBody}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                  <div className="font-heading text-2xl font-bold" style={{ color: primary }}>3</div>
                  <div className="mt-0.5 font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Properties</div>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                  <div className="font-heading text-2xl font-bold" style={{ color: primary }}>Fast</div>
                  <div className="mt-0.5 font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Response Time</div>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                  <div className="font-heading text-2xl font-bold" style={{ color: primary }}>MI</div>
                  <div className="mt-0.5 font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Michigan Based</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
                alt="Michigan lakefront"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        id="cta"
        data-ngf-section="Call to Action"
        className="px-4 py-20 sm:px-6 lg:px-8"
        style={{ backgroundColor: primary }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            data-ngf-field="cta.title"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Call to Action"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            {ctaTitle}
          </h2>
          <p className="mt-4 font-body text-base text-white/75">
            Browse all three retreats and request your dates. Our team takes it from there.
          </p>
          <Link
            href="/properties"
            data-ngf-field="cta.button"
            data-ngf-label="Button Text"
            data-ngf-type="text"
            data-ngf-section="Call to Action"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-8 py-3 font-body text-sm font-semibold shadow-sm transition hover:opacity-90"
            style={{ color: primary }}
          >
            {ctaButton}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        data-ngf-section="Footer"
        className="border-t border-[var(--border)] bg-[var(--bg)] px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <div className="font-heading text-xl font-bold" style={{ color: primary }}>Square K</div>
              <div className="font-body text-sm text-[var(--muted)]">Vacations</div>
              <p
                data-ngf-field="brand.tagline"
                data-ngf-label="Tagline"
                data-ngf-type="text"
                data-ngf-section="Brand"
                className="mt-2 font-body text-sm text-[var(--muted)]"
              >
                {tagline}
              </p>
            </div>
            <div>
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--text)]">Properties</h4>
              <ul className="mt-3 space-y-2">
                {properties.map(p => (
                  <li key={p.slug}>
                    <Link href={`/properties/${p.slug}`} className="font-body text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--text)]">Contact</h4>
              <ul className="mt-3 space-y-2 font-body text-sm text-[var(--muted)]">
                <li>
                  <a href="tel:16163339601" className="hover:text-[var(--text)] transition-colors">(616) 333-9601</a>
                </li>
                <li>
                  <a href="mailto:Squarek.llc.mi@gmail.com" className="hover:text-[var(--text)] transition-colors">Squarek.llc.mi@gmail.com</a>
                </li>
                <li>Fennville &amp; Bellaire, Michigan</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-[var(--border)] pt-6 text-center">
            <p
              data-ngf-field="footer.copyright"
              data-ngf-label="Copyright Text"
              data-ngf-type="text"
              data-ngf-section="Footer"
              className="font-body text-xs text-[var(--muted)]"
            >
              {copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
