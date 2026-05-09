export interface Property {
  slug: string
  name: string
  tagline: string
  address: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  description: string
  longDescription: string
  amenities: string[]
  highlights: { icon: string; label: string }[]
  images: string[]
  heroImage: string
  status: 'available' | 'coming-soon'
  /** iCal feed URL from Airbnb/VRBO. Set when Tyler provides it — used to power the availability calendar. */
  icalUrl: string | null
  featured?: boolean
  builderCredit?: string
}

export interface BookingRequest {
  propertySlug: string
  propertyName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  guests: number
  message?: string
}
