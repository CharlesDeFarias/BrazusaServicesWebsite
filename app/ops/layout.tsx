import type { Metadata } from 'next'

// Hidden internal layer: never indexed, never linked from the public site.
export const metadata: Metadata = {
  title: 'Brazusa Ops',
  robots: { index: false, follow: false },
}

export default function OpsRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
