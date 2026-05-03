'use client'

import { type JSX, useState, useEffect } from 'react'

interface ScrollToTopProps {
  drawerOpen: boolean
}

const DARK_SECTION_IDS = ['hero', 'positioning', 'trust-stats', 'services']

export default function ScrollToTop({ drawerOpen }: ScrollToTopProps): JSX.Element {
  const [visible, setVisible] = useState(false)
  const [overDark, setOverDark] = useState(false)

  useEffect(() => {
    const onScroll = (): void => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = DARK_SECTION_IDS
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const active = new Set<Element>()

    // rootMargin shrinks the top edge by 85%, so only sections entering
    // the bottom ~15% of the viewport (where the button lives) trigger the swap.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) active.add(entry.target)
          else active.delete(entry.target)
        })
        setOverDark(active.size > 0)
      },
      { rootMargin: '-85% 0px 0px 0px', threshold: 0 },
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
      style={{
        background: overDark ? 'var(--color-off-white)' : 'var(--color-navy)',
        opacity: visible && !drawerOpen ? 1 : 0,
        pointerEvents: visible && !drawerOpen ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 12V2M2 7l5-5 5 5"
          stroke={overDark ? 'var(--color-navy)' : 'var(--color-white-70)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
