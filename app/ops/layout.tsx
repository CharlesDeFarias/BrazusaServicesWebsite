import type { Metadata, Viewport } from 'next'
import { RegisterSW } from './RegisterSW'

// Hidden internal layer: never indexed, never linked from the public site.
// Installable as a phone app (PWA) via the manifest + service worker below.
export const metadata: Metadata = {
  title: 'Brazusa Ops',
  robots: { index: false, follow: false },
  manifest: '/ops/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Brazusa Ops', statusBarStyle: 'default' },
  // Explicit iOS fullscreen flag (Next emits the newer mobile-web-app-capable; iOS still wants this).
  other: { 'apple-mobile-web-app-capable': 'yes' },
  icons: {
    icon: [{ url: '/ops/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/ops/apple-touch-icon.png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0B1D2E',
}

export default function OpsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RegisterSW />
      {children}
    </>
  )
}
