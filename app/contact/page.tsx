import SiteHeader from '@/components/layout/SiteHeader'
import { getNgfContent } from '@/lib/ngf'
import Link from 'next/link'
import GeneralInquiryForm from './GeneralInquiryForm'

export const metadata = {
  title: 'Contact - Square K Vacations',
  description: 'Get in touch with Tyler at Square K Vacations. Questions about our Michigan rental properties or ready to plan your stay?',
}

export default async function ContactPage() {
  const content = await getNgfContent()
  const primary = content['brand.primaryColor'] ?? '#4a6741'
  const accent  = content['brand.accentColor']  ?? '#9b8060'

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <SiteHeader primaryColor={primary} accentColor={accent} />

      {/* Page header */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Get In Touch</p>
          <h1 className="mt-1 font-heading text-4xl font-bold text-[var(--text)] sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-[var(--muted)]">
            Have questions about a property? Ready to plan your stay? Tyler is happy to help.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-12 lg:grid-cols-2">

          {/* Contact info */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-[var(--text)]">Reach Tyler Directly</h2>
            <p className="mt-3 font-body text-base leading-relaxed text-[var(--muted)]">
              Square K is owner-operated. When you contact us, you&apos;re talking directly to Tyler - not a call center or automated system.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${primary}15` }}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: primary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div>
                  <div className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Phone</div>
                  <a
                    href="tel:16163339601"
                    className="mt-1 block font-body text-base font-semibold text-[var(--text)] hover:underline"
                    style={{ color: accent }}
                  >
                    (616) 333-9601
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${primary}15` }}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: primary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Email</div>
                  <a
                    href="mailto:Squarek.llc.mi@gmail.com"
                    className="mt-1 block font-body text-base font-semibold hover:underline"
                    style={{ color: accent }}
                  >
                    Squarek.llc.mi@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${primary}15` }}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: primary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <div className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Locations</div>
                  <div className="mt-1 font-body text-base text-[var(--text)]">
                    Fennville, MI &middot; Bellaire, MI
                  </div>
                </div>
              </div>
            </div>

            {/* Properties quick links */}
            <div className="mt-10">
              <h3 className="font-heading text-lg font-semibold text-[var(--text)]">Ready to book a specific property?</h3>
              <p className="mt-1 font-body text-sm text-[var(--muted)]">Use the request form on each property page to submit your dates.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/properties/lakeshore-grand-retreat" className="inline-flex items-center rounded-lg border border-[var(--border)] bg-white px-4 py-2 font-body text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)] transition-colors">
                  Lakeshore Grand &rarr;
                </Link>
                <Link href="/properties/blueberry-grand-retreat" className="inline-flex items-center rounded-lg border border-[var(--border)] bg-white px-4 py-2 font-body text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)] transition-colors">
                  Blueberry Grand &rarr;
                </Link>
                <Link href="/properties/clam-lake-grand-retreat" className="inline-flex items-center rounded-lg border border-[var(--border)] bg-white px-4 py-2 font-body text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)] transition-colors">
                  Clam Lake Grand &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* General inquiry form */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-[var(--text)]">Send a Message</h2>
            <p className="mt-2 font-body text-sm text-[var(--muted)]">General questions, group inquiries, or anything else - use this form and Tyler will get back to you within 24 hours.</p>
            <GeneralInquiryForm accentColor={accent} primaryColor={primary} />
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-4 py-8 text-center">
        <p className="font-body text-xs text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Square K LLC. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

