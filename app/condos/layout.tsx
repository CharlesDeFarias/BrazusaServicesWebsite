import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Condo & HOA Cleaning | Brazusa Cleaning',
  description:
    'Daily common-area and turnover cleaning for condo associations and property managers across Greater Boston. Bilingual crews already working in 100+ Boston units every day.',
  openGraph: {
    title: 'Condo & HOA Cleaning | Brazusa Cleaning',
    description:
      'Daily common-area and turnover cleaning for condo associations and property managers across Greater Boston.',
    type: 'website',
    images: [{ url: '/images/property.webp' }],
  },
}

export default function CondosLayout({ children }: { children: React.ReactNode }) {
  return children
}
