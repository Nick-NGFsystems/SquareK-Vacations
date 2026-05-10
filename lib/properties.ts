import { Property } from '@/types'

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
    longDescription: `A luxury lakeshore retreat in Fennville, Michigan — designed for groups who want space, comfort, and direct water access. Full details and professional photography coming soon.`,
    highlights: [
      { icon: '\u{1F30A}', label: 'Lake Access' },
      { icon: '⛵', label: 'Private Dock' },
      { icon: '\u{1F525}', label: 'Fire Pit' },
      { icon: '\u{1F373}', label: "Chef's Kitchen" },
      { icon: '\u{1F6CF}', label: '5 Bedrooms' },
      { icon: '\u{1F465}', label: 'Sleeps 12' },
    ],
    amenities: [
      'Lake Access & Private Dock',
      "Chef's Kitchen",
      'Kayaks & Paddle Boards',
      'Fire Pit',
      'Free High-Speed WiFi',
    ],
    images: [
      '/images/lakeshore/Front-Exterior-Dusk.jpg',
      '/images/lakeshore/Front-Exterior-Noon.jpg',
      '/images/lakeshore/LivingRoom1(1).jpg',
      '/images/lakeshore/LivingRoom1(2).jpg',
      '/images/lakeshore/Kitchen1(1).jpg',
      '/images/lakeshore/Kitchen1(2).jpg',
      '/images/lakeshore/DiningRoom1(1).jpg',
      '/images/lakeshore/DiningRoom1(2).jpg',
      '/images/lakeshore/OutdoorPatio.jpg',
      '/images/lakeshore/FrontEntrance1.jpg',
      '/images/lakeshore/Bedroom1.jpg',
      '/images/lakeshore/Bedroom1Bathroom1.jpg',
      '/images/lakeshore/Bedroom1Bathroom2.jpg',
      '/images/lakeshore/Bedroom2.jpg',
      '/images/lakeshore/Bedroom2Bathroom1(1).jpg',
      '/images/lakeshore/Bedroom2Bathroom1(2).jpg',
      '/images/lakeshore/Bedroom3.jpg',
      '/images/lakeshore/Bedroom3Bathroom1.jpg',
      '/images/lakeshore/Bedroom4.jpg',
      '/images/lakeshore/Bedroom4Bathroom1.jpg',
      '/images/lakeshore/KitchenPantry.jpg',
      '/images/lakeshore/Bathroom1.jpg',
      '/images/lakeshore/2ndFloorStairs.jpg',
      '/images/lakeshore/Mudroom.jpg',
      '/images/lakeshore/LaundryRoom.jpg',
    ],
    heroImage: '/images/lakeshore/Front-Exterior-Dusk.jpg',
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
      'A custom-built architectural masterpiece set on rolling Michigan hills. Blueberry Grand features a private pool, barrel sauna, pool house, and fire pit — everything you need for the perfect group escape.',
    longDescription: `A brand-new custom-built luxury home in Fennville, Michigan featuring a private pool, barrel sauna, pool house, and fire pit. Full details and professional photography coming soon.`,
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
      'Fire Pit',
      'Free High-Speed WiFi',
    ],
    images: [
      '/images/blueberry/IMG_5151.jpeg',
      '/images/blueberry/IMG_5150.jpeg',
    ],
    heroImage: '/images/blueberry/IMG_5151.jpeg',
    status: 'available',
    icalUrl: null,
    featured: true,
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
    longDescription: `A lakeside retreat on beautiful Clam Lake in Bellaire, Michigan — four bedrooms, private pier, and easy access to Bellaire's shops and restaurants. Full details and photography coming soon.`,
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
      'Kayaks Included',
      'Deck with Lake Views',
      'Fire Pit',
      'Free High-Speed WiFi',
    ],
    images: [],
    heroImage: '',
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
