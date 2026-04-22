import type { Metadata } from 'next'
import { Cormorant_Garamond, Syne } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
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
    <html lang="en" className={`${cormorant.variable} ${syne.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
