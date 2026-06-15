import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import StructuredData from '@/components/StructuredData'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
})

const BASE_URL = 'https://covenant.ae'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Covenant — Make your Will online | UAE Estate Planning',
    template: '%s | Covenant',
  },
  description:
    'Protect your family, assets and wishes in the UAE and beyond. Create your UAE will online in 10–15 minutes. Registered through UAE courts. Starting from AED 799.',
  keywords: [
    'UAE will', 'online will UAE', 'expat will UAE', 'estate planning UAE',
    'power of attorney UAE', 'ADJD will', 'DIFC will', 'mirror wills UAE',
    'will writing Dubai', 'expat estate planning',
  ],
  authors: [{ name: 'Covenant Technologies Ltd' }],
  creator: 'Covenant Technologies Ltd',
  publisher: 'Covenant Technologies Ltd',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: BASE_URL,
    siteName: 'Covenant',
    title: 'Covenant — Make your Will online | UAE Estate Planning',
    description: 'Protect your family, assets and wishes in the UAE and beyond. Create your UAE will online in 10–15 minutes. Starting from AED 799.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Covenant — UAE Estate Planning for Expats' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Covenant — Make your Will online | UAE Estate Planning',
    description: 'Protect your family, assets and wishes in the UAE. Create your UAE will online in 10–15 minutes. From AED 799.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: BASE_URL },
  verification: { google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  )
}
