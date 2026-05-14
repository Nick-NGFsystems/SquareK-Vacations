import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import NgfEditBridge from '@/components/NgfEditBridge'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import StructuredData from '@/components/StructuredData'
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'squarerk.com'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteUrl}`),
  title: {
    default: 'Square K Vacations — Michigan Premier Vacation Rentals',
    template: '%s · Square K Vacations',
  },
  description:
    'Luxury vacation rentals in Michigan. Lakeshore, Fennville, and Bellaire properties — curated by Square K for an unforgettable stay.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Square K Vacations',
    images: ['/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  other: {
    'ngf-public-api': 'https://app.ngfsystems.com/api/public/content',
    'ngf-template-id': 'squarek-vacations',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <GoogleAnalytics />
        <StructuredData />
        <NgfEditBridge />
        {children}
      </body>
    </html>
  )
}
