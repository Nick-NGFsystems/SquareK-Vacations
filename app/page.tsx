import Link from 'next/link'
import SiteHeader from '@/components/layout/SiteHeader'
import { getNgfContent } from '@/lib/ngf'
import { properties } from '@/lib/properties'
import PropertyCard from '@/components/PropertyCard'

export default async function HomePage() {
  const content = await getNgfContent()
  const primary = content['brand.primaryColor'] ?? '#4a6741'
  const accent  = content['brand.accentColor']  ?? '#9b8060'

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <SiteHeader primaryColor={primary} accentColor={accent} />
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h1 className="font-heading text-4xl">Square K Vacations</h1>
      </div>
    </div>
  )
}
