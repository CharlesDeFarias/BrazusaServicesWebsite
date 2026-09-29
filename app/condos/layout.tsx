import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Condo & HOA Cleaning, Greater Boston | Brazusa Cleaning',
  description:
    'Common areas held to a five-star-guest standard. Daily cleaning for condo associations and property managers across Greater Boston; trilingual crews already in 100+ Boston units every day.',
  openGraph: {
    title: 'Condo & HOA Cleaning, Greater Boston | Brazusa Cleaning',
    description:
      'Common areas held to a five-star-guest standard. Daily cleaning for condo associations and property managers across Greater Boston.',
    type: 'website',
    images: [{ url: '/images/property.webp' }],
  },
}

export default function CondosLayout({ children }: { children: React.ReactNode }) {
  return children
}
