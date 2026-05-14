export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'squarerk.com'
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Square K Vacations',
    url: `https://${siteUrl}`,
    telephone: '+16163339601',
    email: 'Squarek.llc.mi@gmail.com',
    description:
      'Premium vacation rental properties in Michigan — lakeshore luxury and up-north escapes curated by Square K.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2149 Lakeshore Drive',
      addressLocality: 'Fennville',
      addressRegion: 'MI',
      postalCode: '49408',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Fennville', containedInPlace: { '@type': 'State', name: 'Michigan' } },
      { '@type': 'City', name: 'Bellaire',  containedInPlace: { '@type': 'State', name: 'Michigan' } },
    ],
    priceRange: '$$$',
    image: `https://${siteUrl}/og-image.jpg`,
    sameAs: [],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
