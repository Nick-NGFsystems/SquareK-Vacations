import { Property } from '@/types'

/**
 * Property data for Square K Vacations.
 *
 * FUTURE: This static file will be replaced by a database fetch (Neon/Prisma)
 * once the backend is wired up through the NGF client portal.
 *
 * AVAILABILITY: Each property has an `icalUrl` field. Once Tyler provides the
 * iCal export URLs from Airbnb/VRBO, set them here and the AvailabilityCalendar
 * component will parse real availability data.
 * Airbnb iCal export: Listing → Pricing & Availability → Export Calendar
 * VRBO iCal export: Listing → Calendar → Export
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
    longDescription: `Lakeshore Grand Retreat is the ultimate Michigan getaway — a thoughtfully designed luxury home set directly on the lakeshore in scenic Fennville. Floor-to-ceiling windows frame panoramic water views from nearly every room, and the expansive outdoor spaces invite you to unwind from morning to midnight.

Inside, you'll find an open-concept great room with a chef's kitchen, a dining area that seats the whole group, and cozy gathering spaces throughout all three levels. The bedrooms are generously sized with quality linens and ample storage, making it easy to settle in for a week-long stay.

Outside, the property extends to a private dock where guests can swim, fish, or simply sit with a coffee as the sun rises over the water. Evenings are best spent around the fire pit as the lake reflects the last light of day.`,
    highlights: [
      { icon: '🏊', label: 'Lake Access' },
      { icon: '⛵', label: 'Private Dock' },
      { icon: '🔥', label: 'Fire Pit' },
      { icon: '🍳', label: "Chef's Kitchen" },
      { icon: '🛏', label: '5 Bedrooms' },
      { icon: '👥', label: 'Sleeps 12' },
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
    // TODO: Replace placeholder images with actual Lakeshore Grand Retreat photos
    // Photos available at: https://listings.nextdoorphotos.com/public/photos/203583441
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-122fb8ede0b3?w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1560185127-6a4f4e3b7463?w=1200&q=80',
    ],
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80',
    status: 'available',
    icalUrl: null, // TODO: Set to Airbnb/VRBO iCal export URL when Tyler provides it
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
      'A custom-built architectural masterpiece set on rolling Michigan hills. Blueberry Grand features a private pool, barrel sauna, pool house, and fire pit — everything you need for the perfect group escape.',
    longDescription: `Blueberry Grand Retreat is a brand-new, custom-built luxury home in Fennville, Michigan — crafted by Northcove Builders to an exceptionally high standard. From the striking three-story board-and-batten exterior to the designer interior finishes, every detail has been carefully considered.

The centerpiece of the outdoor space is a sparkling private pool, flanked by a full-sized pool house with a covered patio and outdoor seating. A Norwegian barrel sauna sits just steps away for post-swim relaxation. As the evening sets in, gather around the elevated fire pit area with Adirondack seating and take in the quiet Michigan countryside.

Inside, the open floor plan is bathed in natural light through oversized windows. The gourmet kitchen is appointed with professional-grade appliances and a large island — perfect for group meals. Six beautifully appointed bedrooms and five bathrooms ensure everyone has the space and privacy they need.

Blueberry Grand is the ideal venue for family reunions, milestone celebrations, and corporate retreats alike.`,
    highlights: [
      { icon: '🏊', label: 'Private Pool' },
      { icon: '🧖', label: 'Barrel Sauna' },
      { icon: '🏡', label: 'Pool House' },
      { icon: '🔥', label: 'Fire Pit' },
      { icon: '🛏', label: '6 Bedrooms' },
      { icon: '👥', label: 'Sleeps 14' },
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
    // TODO: Replace placeholder images with final photography of Blueberry Grand Retreat
    // Renderings provided by Tyler — final photos to be taken upon completion
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
      'https://images.unsplash.com/photo-1629079447777-1e605162dc8d?w=1200&q=80',
      'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    ],
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80',
    status: 'available',
    icalUrl: null, // TODO: Set to Airbnb/VRBO iCal export URL when Tyler provides it
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
      'Nestled on the shores of picturesque Clam Lake in Bellaire, this retreat offers a quintessential up-north Michigan experience — peaceful mornings, stunning water views, and starry nights around the fire.',
    longDescription: `Clam Lake Grand Retreat brings you deep into the heart of northern Michigan's lake country. Bellaire is a charming small town beloved for its craft brewery scene, wine trails, and access to some of the state's most beautiful inland lakes — and Clam Lake is among the finest.

The property offers direct lake access with a private pier, perfect for swimming, fishing, or launching a kayak. The four-bedroom home is comfortably appointed for a group of up to ten guests, with an open living and dining area that flows out to a deck overlooking the water.

Mornings start with mist rising off the lake and end with the kind of sunset that makes you forget to check your phone. Bellaire's downtown — with Shorts Brewing Company, local shops, and restaurants — is just minutes away.`,
    highlights: [
      { icon: '🌊', label: 'Clam Lake Access' },
      { icon: '🛥', label: 'Private Pier' },
      { icon: '🔥', label: 'Fire Pit' },
      { icon: '🏘', label: 'Bellaire, MI' },
      { icon: '🛏', label: '4 Bedrooms' },
      { icon: '👥', label: 'Sleeps 10' },
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
    // TODO: Photos coming soon — use stock images until Tyler provides property photos
    images: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
      'https://images.unsplash.com/photo-1475275083424-b4ff81625b60?w=1200&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    ],
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
    status: 'available',
    icalUrl: null, // TODO: Set to Airbnb/VRBO iCal export URL when Tyler provides it
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
