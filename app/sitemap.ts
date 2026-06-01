import type { MetadataRoute } from 'next'
import { getAllPropertySlugs } from '@/lib/properties'
import { getSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const now  = new Date()
  const slugs = getAllPropertySlugs()

  return [
    { url: `${base}/`,           lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/properties`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/contact`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    ...slugs.map(slug => ({
      url:             `${base}/properties/${slug}`,
      lastModified:    now,
      changeFrequency: 'monthly' as const,
      priority:        0.8,
    })),
  ]
}
