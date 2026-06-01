import { getSiteUrl } from '@/lib/site'
import { properties } from '@/lib/properties'

export default function StructuredData() {
  const siteUrl = getSiteUrl()

  const organization = {
    '@type': 'LodgingBusiness',
    '@id': `${siteUrl}/#business`,
    name: 'Square K Vacations',
    url: siteUrl,
    telephone: '+16163339601',
    email: 'Squarek.llc.mi@gmail.com',
    description:
      'Luxury vacation home rentals in West Michigan and Up North — lakeshore retreats in Fennville and a lake house in Bellaire, curated and owner-operated by Square K.',
    image: `${siteUrl}/images/lakeshore/Front-Exterior-Dusk.jpg`,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2149 Lakeshore Drive',
      addressLocality: 'Fennville',
      addressRegion: 'MI',
      postalCode: '49408',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.5942,
      longitude: -86.1442,
    },
    areaServed: [
      { '@type': 'Place', name: 'West Michigan' },
      { '@type': 'Place', name: 'Northern Michigan' },
      { '@type': 'City', name: 'Fennville', containedInPlace: { '@type': 'State', name: 'Michigan' } },
      { '@type': 'City', name: 'Bellaire', containedInPlace: { '@type': 'State', name: 'Michigan' } },
    ],
    sameAs: [] as string[],
  }

  const propertyNodes = properties.map(p => ({
    '@type': 'VacationRental',
    '@id': `${siteUrl}/properties/${p.slug}/#listing`,
    name: p.name,
    url: `${siteUrl}/properties/${p.slug}`,
    description: p.description,
    image: p.images?.[0] ? `${siteUrl}${p.images[0]}` : undefined,
    numberOfBedrooms: p.bedrooms,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: p.maxGuests,
      unitText: 'guests',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: p.address,
      addressLocality: p.city,
      addressRegion: p.state,
      postalCode: p.zipCode,
      addressCountry: 'US',
    },
    amenityFeature: (p.amenities || []).map(a => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
      value: true,
    })),
    brand: { '@id': `${siteUrl}/#business` },
  }))

  const data = {
    '@context': 'https://schema.org',
    '@graph': [organization, ...propertyNodes],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
