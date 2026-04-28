'use client'

import { type JSX, useState, useEffect } from 'react'

interface ScrollToTopProps {
  drawerOpen: boolean
}

export default function ScrollToTop({ drawerOpen }: ScrollToTopProps): JSX.Element {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = (): void => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center transition-all duration-300 shadow-lg"
      style={{
        background: 'var(--color-navy)',
        opacity: visible && !drawerOpen ? 1 : 0,
        pointerEvents: visible && !drawerOpen ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 12V2M2 7l5-5 5 5" stroke="var(--color-white-70)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
