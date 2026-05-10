import { Property } from '@/types'

/**
 * Property data for Square K Vacations.
 *
 * FUTURE: This static file will be replaced by a database fetch (Neon/Prisma)
 * once the backend is wired up through the NGF client portal.
 */
export const properties: Property[] = [
  {
    slug: 'lakeshore-grand-retreat',
    name: 'Lakeshore Grand Retreat',
    tagline: 'Where the water meets luxury.',
    address: '2149 Lakeshore Drive',
    city: 'Fennville',
    state: 'MI',
    zipCode: '49408',
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 12,
    description:
      'Wake up to breathtaking lakeshore views from this stunning Michigan retreat. Designed for groups and families who refuse to compromise on comfort, Lakeshore Grand blends upscale finishes with an effortless indoor-outdoor lifestyle.',
    longDescription: `Lakeshore Grand Retreat is the ultimate Michigan getaway - a thoughtfully designed luxury home set directly on the lakeshore in scenic Fennville. Floor-to-ceiling windows frame panoramic water views from nearly every room, and the expansive outdoor spaces invite you to unwind from morning to midnight.

Inside, you'll find an open-concept great room with a chef's kitchen, a dining area that seats the whole group, and cozy gathering spaces throughout all three levels. The bedrooms are generously sized with quality linens and ample storage, making it easy to settle in for a week-long stay.

Outside, the property extends to a private dock where guests can swim, fish, or simply sit with a coffee as the sun rises over the water. Evenings are best spent around the fire pit as the lake reflects the last light of day.`,
    highlights: [
      { icon: '\u{1F30A}', label: 'Lake Access' },
      { icon: '\u26F5', label: 'Private Dock' },
      { icon: '\u{1F525}', label: 'Fire Pit' },
      { icon: '\u{1F373}', label: "Chef's Kitchen" },
      { icon: '\u{1F6CF}', label: '5 Bedrooms' },
      { icon: '\u{1F465}', label: 'Sleeps 12' },
    ],
    amenities: [
      'Lake Access & Private Dock',
      'Fire Pit',
      "Chef's Kitchen",
      'Free High-Speed WiFi',
      'Air Conditioning',
      'Smart TVs in Every Room',
      'Kayaks & Paddle Boards',
      'Outdoor Dining & Grill',
      'Washer & Dryer',
      'Ample Parking',
      'Pet Friendly (inquire)',
      'No Smoking Property',
    ],
    // TODO: Replace with actual Lakeshore Grand Retreat photos
    // Photos available at: https://listings.nextdoorphotos.com/public/photos/203583441
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
      'https://images.unsplash.com/photo-1467226632440-65f0b4957563?w=1200&q=80',
    ],
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80',
    status: 'available',
    icalUrl: null,
    featured: true,
  },
  {
    slug: 'blueberry-grand-retreat',
    name: 'Blueberry Grand Retreat',
    tagline: 'Modern luxury. Stunning amenities. Unforgettable.',
    address: '1816 Blueberry Lane',
    city: 'Fennville',
    state: 'MI',
    zipCode: '49408',
    bedrooms: 6,
    bathrooms: 5,
    maxGuests: 14,
    description:
      'A custom-built architectural masterpiece set on rolling Michigan hills. Blueberry Grand features a private pool, barrel sauna, pool house, and fire pit - everything you need for the perfect group escape.',
    longDescription: `Blueberry Grand Retreat is a brand-new, custom-built luxury home in Fennville, Michigan - crafted by Northcove Builders to an exceptionally high standard. From the striking three-story board-and-batten exterior to the designer interior finishes, every detail has been carefully considered.

The centerpiece of the outdoor space is a sparkling private pool, flanked by a full-sized pool house with a covered patio and outdoor seating. A Norwegian barrel sauna sits just steps away for post-swim relaxation. As the evening sets in, gather around the elevated fire pit area with Adirondack seating and take in the quiet Michigan countryside.

Inside, the open floor plan is bathed in natural light through oversized windows. The gourmet kitchen is appointed with professional-grade appliances and a large island - perfect for group meals. Six beautifully appointed bedrooms and five bathrooms ensure everyone has the space and privacy they need.

Blueberry Grand is the ideal venue for family reunions, milestone celebrations, and corporate retreats alike.`,
    highlights: [
      { icon: '\u{1F3CA}', label: 'Private Pool' },
      { icon: '\u{1F9D6}', label: 'Barrel Sauna' },
      { icon: '\u{1F3E1}', label: 'Pool House' },
      { icon: '\u{1F525}', label: 'Fire Pit' },
      { icon: '\u{1F6CF}', label: '6 Bedrooms' },
      { icon: '\u{1F465}', label: 'Sleeps 14' },
    ],
    amenities: [
      'Private Heated Pool',
      'Barrel Sauna',
      'Pool House & Covered Patio',
      'Fire Pit with Adirondack Seating',
      'Outdoor Kitchen & Grill',
      'Detached 2-Car Garage',
      "Chef's Kitchen",
      'Free High-Speed WiFi',
      'Air Conditioning',
      'Smart TVs Throughout',
      'Washer & Dryer',
      'Ample Parking',
    ],
    // TODO: Replace with final photography of Blueberry Grand Retreat
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1629079447777-1e605162dc8d?w=1200&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    ],
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80',
    status: 'available',
    icalUrl: null,
    featured: true,
    builderCredit: 'Northcove Builders',
  },
  {
    slug: 'clam-lake-grand-retreat',
    name: 'Clam Lake Grand Retreat',
    tagline: 'Serene up-north living on beautiful Clam Lake.',
    address: '8407 Clam Lake Road',
    city: 'Bellaire',
    state: 'MI',
    zipCode: '49615',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    description:
      'Nestled on the shores of picturesque Clam Lake in Bellaire, this retreat offers a quintessential up-north Michigan experience - peaceful mornings, stunning water views, and starry nights around the fire.',
    longDescription: `Clam Lake Grand Retreat brings you deep into the heart of northern Michigan's lake country. Bellaire is a charming small town beloved for its craft brewery scene, wine trails, and access to some of the state's most beautiful inland lakes - and Clam Lake is among the finest.

The property offers direct lake access with a private pier, perfect for swimming, fishing, or launching a kayak. The four-bedroom home is comfortably appointed for a group of up to ten guests, with an open living and dining area that flows out to a deck overlooking the water.

Mornings start with mist rising off the lake and end with the kind of sunset that makes you forget to check your phone. Bellaire's downtown - with Shorts Brewing Company, local shops, and restaurants - is just minutes away.`,
    highlights: [
      { icon: '\u{1F3DE}', label: 'Clam Lake Access' },
      { icon: '\u{1F6A4}', label: 'Private Pier' },
      { icon: '\u{1F525}', label: 'Fire Pit' },
      { icon: '\u{1F6F6}', label: 'Kayaks Included' },
      { icon: '\u{1F6CF}', label: '4 Bedrooms' },
      { icon: '\u{1F465}', label: 'Sleeps 10' },
    ],
    amenities: [
      'Clam Lake Access & Private Pier',
      'Fire Pit',
      'Kayaks Included',
      'Deck with Lake Views',
      'Fully Equipped Kitchen',
      'Free High-Speed WiFi',
      'Air Conditioning',
      'Smart TVs',
      'Outdoor Grill',
      'Washer & Dryer',
      'Ample Parking',
    ],
    // TODO: Replace with actual Clam Lake Grand Retreat photos
    images: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
    ],
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
    status: 'available',
    icalUrl: null,
  },
]

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find(p => p.slug === slug)
}

export function getAllPropertySlugs(): string[] {
  return properties.map(p => p.slug)
}

export function getFeaturedProperties(): Property[] {
  return properties.filter(p => p.featured)
}
