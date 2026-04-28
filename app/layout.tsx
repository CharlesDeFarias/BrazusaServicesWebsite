import type { Metadata } from 'next'
import { IBM_Plex_Sans, Syne } from 'next/font/google'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://brazusa.com'),
  title: 'Brazusa Cleaning',
  description: 'Reliable, high-detail cleaning for apartments, short-term rentals, and managed properties across Greater Boston.',
  openGraph: {
    title: 'Brazusa Cleaning',
    description: 'Reliable, high-detail cleaning for apartments, short-term rentals, and managed properties across Greater Boston.',
    type: 'website',
    images: [{ url: '/images/hero.webp' }],
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${syne.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
