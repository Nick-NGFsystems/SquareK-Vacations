'use client'
import { useState } from 'react'
import Link from 'next/link'

interface SiteHeaderProps { primaryColor?: string; accentColor?: string }

export default function SiteHeader({
  primaryColor = '#4a6741',
  accentColor = '#9b8060',
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/#how-it-works', label: 'How It Works' },
    { href: '/contact', label: 'Contact' },
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 shadow-sm backdrop-blur-lg">
      <span data-ngf-field="brand.primaryColor" data-ngf-label="Primary Color" data-ngf-type="color" data-ngf-section="Brand" aria-hidden="true" className="sr-only" />
      <span data-ngf-field="brand.accentColor" data-ngf-label="Accent Color" data-ngf-type="color" data-ngf-section="Brand" aria-hidden="true" className="sr-only" />
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-md px-2 py-0.5 text-2xl font-bold tracking-tight text-white" style={{ backgroundColor: primaryColor }}>Square K</span>
          <span className="hidden text-sm font-medium text-[var(--muted)] sm:block">Vacations</span>
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="rounded-lg border border-white/20 bg-white/15 px-3 py-1.5 font-body text-sm font-medium backdrop-blur-sm transition hover:bg-white/25">{link.label}</Link>
          ))}
        </div>
        <div className="hidden lg:flex">
          <Link href="/contact" className="inline-flex min-h-10 items-center justify-center rounded-lg px-5 py-2.5 font-body text-sm font-semibold text-white" style={{ backgroundColor: accentColor }}>Request a Stay</Link>
        </div>
        <button type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(prev => !prev)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/30 bg-white/15 shadow-sm backdrop-blur-sm lg:hidden">
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-current transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`h-0.5 w-5 bg-current transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>
      {menuOpen && (
        <div className="border-t px-4 pb-5 pt-4 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {links.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="min-h-11 rounded-lg border border-white/20 bg-white/15 px-4 py-3 font-body text-sm font-medium backdrop-blur-sm">{link.label}</Link>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="min-h-11 rounded-lg px-4 py-3 text-center font-body text-sm font-semibold text-white" style={{ backgroundColor: accentColor }}>Request a Stay</Link>
          </div>
        </div>
      )}
    </header>
  )
}
