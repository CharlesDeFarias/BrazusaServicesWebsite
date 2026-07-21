'use client'

import { useEffect } from 'react'

/** Registers the /ops service worker so the app is installable (PWA) on phones. */
export function RegisterSW() {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/ops' }).catch(() => {})
    }
  }, [])
  return null
}
