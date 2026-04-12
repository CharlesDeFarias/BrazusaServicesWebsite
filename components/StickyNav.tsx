'use client'

import { useState, useEffect, type RefObject } from 'react'
import Image from 'next/image'

interface StickyNavProps {
  heroRef: RefObject<HTMLElement | null>
  onQuoteClick: () => void
}

const navLinks = [
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'About',        href: '#about' },
]

export default function StickyNav({ onQuoteClick }: StickyNavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? '#F2EDE6' : 'rgba(11,29,46,0.75)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid #D8D0C6' : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">

        {/* Logo — click to scroll to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex-shrink-0 focus:outline-none"
          aria-label="Back to top"
        >
          <Image
            src="/logo.jpg"
            alt="Brazusa Cleaning"
            width={110}
            height={38}
            className="h-8 w-auto object-contain"
            priority
            style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
          />
        </button>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-7 flex-1 justify-center">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs font-medium transition-opacity hover:opacity-100"
              style={{
                color: scrolled ? 'rgba(11,29,46,0.55)' : 'rgba(255,255,255,0.6)',
                letterSpacing: '0.06em',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Quote CTA */}
        <button
          onClick={onQuoteClick}
          className="flex-shrink-0 text-xs font-medium px-4 py-2 transition-all duration-200 text-white"
          style={{
            background: scrolled ? '#0B1D2E' : 'rgba(255,255,255,0.1)',
            borderLeft: '2px solid #C49A44',
            letterSpacing: '0.05em',
          }}
        >
          Free Quote
        </button>
      </div>
    </nav>
  )
}
