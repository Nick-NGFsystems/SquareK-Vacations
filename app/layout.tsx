import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import NgfEditBridge from '@/components/NgfEditBridge'
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

export const metadata: Metadata = {
  title: 'Square K Vacations — Michigan Premier Vacation Rentals',
  description:
    'Luxury vacation rentals in Michigan. Lakeshore, Fennville, and Bellaire properties — curated by Square K for an unforgettable stay.',
  other: {
    'ngf-public-api': 'https://app.ngfsystems.com/api/public/content',
    'ngf-template-id': 'squarek-vacations',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        {/* NgfEditBridge enables live content editing from the NGF portal */}
        <NgfEditBridge />
        {children}
      </body>
    </html>
  )
}
