import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import NgfEditBridge from '@/components/NgfEditBridge'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import StructuredData from '@/components/StructuredData'
import { getSiteUrl } from '@/lib/site'
import 'react-photo-view/dist/react-photo-view.css'
import './globals.css'

const headingFont = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const bodyFont = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const siteUrl = getSiteUrl()
const ogImage = '/images/lakeshore/Front-Exterior-Dusk.jpg'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'Square K Vacations | Luxury Vacation Rentals & Lake Houses in West Michigan',
    template: '%s · Square K Vacations',
  },
  description:
    'Square K Vacations offers luxury vacation home rentals in West Michigan and Up North — lakeshore retreats in Fennville and a lake house in Bellaire. Spacious, owner-operated rentals perfect for families, groups, and getaways.',
  keywords: [
    'West Michigan vacation rentals',
    'Michigan vacation homes',
    'lake house rental Michigan',
    'Fennville vacation rental',
    'Bellaire Michigan rental',
    'Lake Michigan vacation home',
    'up north Michigan cabin rental',
    'group vacation rental Michigan',
    'Square K Vacations',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Square K Vacations',
    title: 'Square K Vacations | Luxury Vacation Rentals in West Michigan',
    description:
      'Luxury vacation home rentals in West Michigan and Up North — lakeshore retreats in Fennville and a lake house in Bellaire.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Square K Vacations luxury rental exterior' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Square K Vacations | Luxury Vacation Rentals in West Michigan',
    description:
      'Luxury vacation home rentals in West Michigan and Up North — Fennville and Bellaire.',
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  other: {
    'ngf-public-api': 'https://app.ngfsystems.com/api/public/content',
    'ngf-template-id': 'squarek-vacations',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <GoogleAnalytics />
        <StructuredData />
        <NgfEditBridge />
        {children}
      </body>
    </html>
  )
}
