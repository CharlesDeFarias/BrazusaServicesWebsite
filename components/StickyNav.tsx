'use client'

import { type JSX, useState, useEffect, useRef, type RefObject } from 'react'
import Image from 'next/image'

interface StickyNavProps {
  heroRef: RefObject<HTMLElement | null>
  onQuoteClick: () => void
  setActiveClient: (id: string | null) => void
  onOtherClick: () => void
}

const clientTypes = [
  { id: 'str',      label: 'Short-Term Rental' },
  { id: 'property', label: 'Property / Building' },
  { id: 'offices',  label: 'Office / Clinic' },
  { id: 'homes',    label: 'Home / Apartment' },
]

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
]

export default function StickyNav({ onQuoteClick, setActiveClient, onOtherClick }: StickyNavProps): JSX.Element {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [cleanOpen, setCleanOpen]   = useState(false)
  const cleanRef = useRef<HTMLDivElement>(null)
  const previousScrolledRef = useRef(false)

  useEffect(() => {
    const onScroll = (): void => {
      const nextScrolled = window.scrollY > 80

      if (nextScrolled !== previousScrolledRef.current) {
        previousScrolledRef.current = nextScrolled
        setScrolled(nextScrolled)
        setMenuOpen(false)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close "Clean my…" dropdown on outside click or Escape
  useEffect(() => {
    if (!cleanOpen) return
    const handleClick = (e: MouseEvent): void => {
      if (cleanRef.current && !cleanRef.current.contains(e.target as Node)) {
        setCleanOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setCleanOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [cleanOpen])

  const closeMenu = (): void => setMenuOpen(false)

  const handleClientSelect = (id: string): void => {
    setActiveClient(id)
    setCleanOpen(false)
    closeMenu()
    setTimeout(() => {
      document.getElementById('client-types')?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }

  const navBg   = scrolled ? 'var(--color-off-white)'          : 'rgba(11,29,46,0.75)'
  const navBdr  = scrolled ? '1px solid var(--color-light-gray)' : '1px solid rgba(255,255,255,0.07)'
  const linkClr = scrolled ? 'rgba(11,29,46,0.55)'             : 'rgba(255,255,255,0.6)'
  const barClr  = scrolled ? 'var(--color-navy)'               : 'white'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{ background: navBg, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: navBdr }}
    >
      {/* ── Main bar ── */}
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

        {/* Logo + wordmark */}
        <button
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); setCleanOpen(false) }}
          className="flex-shrink-0 focus:outline-none flex items-center gap-3"
          aria-label="Back to top"
        >
          <div
            style={{
              background: scrolled ? 'transparent' : 'rgba(255,255,255,0.92)',
              borderRadius: 0,
              padding: 0,
              overflow: 'hidden',
              lineHeight: 0,
              transition: 'all 0.3s',
            }}
          >
            <Image
              src="/brand/logo.jpg"
              alt="Brazusa Cleaning"
              width={120}
              height={42}
              className="h-10 md:h-11 w-auto object-contain"
              style={{ display: 'block' }}
              priority
            />
          </div>
          <span
            className="hidden sm:block"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '1.15rem',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '0.03em',
              color: scrolled ? 'var(--color-navy)' : 'rgba(255,255,255,0.88)',
              transition: 'color 0.3s',
              whiteSpace: 'nowrap',
            }}
          >
            Brazusa Cleaning
          </span>
        </button>

        {/* ── Desktop center: "Clean my…" + nav links ── */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">

          {/* "Clean my…" dropdown trigger */}
          <div className="relative" ref={cleanRef}>
            <button
              onClick={() => setCleanOpen(!cleanOpen)}
              className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-100"
              style={{ color: linkClr, letterSpacing: '0.06em' }}
            >
              Clean my…
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                className="transition-transform duration-200"
                style={{ transform: cleanOpen ? 'rotate(180deg)' : 'none' }}
              >
                <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown panel */}
            {cleanOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-52 py-1.5 shadow-xl z-50"
                style={{
                  background: scrolled ? 'var(--color-off-white)' : 'var(--color-navy)',
                  border: scrolled ? '1px solid var(--color-light-gray)' : '1px solid rgba(255,255,255,0.10)',
                }}
              >
                {clientTypes.map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() => handleClientSelect(ct.id)}
                    className="w-full text-left px-4 py-2.5 text-xs transition-colors"
                    style={{
                      color: scrolled ? 'rgba(11,29,46,0.75)' : 'rgba(255,255,255,0.75)',
                      minHeight: '36px',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = scrolled ? 'rgba(11,29,46,0.06)' : 'rgba(255,255,255,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {ct.label}
                  </button>
                ))}
                <div style={{ borderTop: scrolled ? '1px solid var(--color-light-gray)' : '1px solid rgba(255,255,255,0.08)', margin: '4px 0' }} />
                <button
                  onClick={() => { onOtherClick(); setCleanOpen(false) }}
                  className="w-full text-left px-4 py-2.5 text-xs transition-colors"
                  style={{
                    color: 'var(--color-brand-gold)',
                    minHeight: '36px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = scrolled ? 'rgba(11,29,46,0.06)' : 'rgba(255,255,255,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  Something else…
                </button>
              </div>
            )}
          </div>

          {/* Standard nav links */}
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs font-medium transition-opacity hover:opacity-100"
              style={{ color: linkClr, letterSpacing: '0.06em', textDecoration: 'none' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop: Quote CTA | Mobile: Hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onQuoteClick}
            className="hidden md:block text-xs font-medium px-4 py-2 transition-all duration-200 text-white"
            style={{
              background: scrolled ? 'var(--color-navy)' : 'rgba(255,255,255,0.1)',
              borderLeft: '2px solid var(--color-brand-gold)',
              letterSpacing: '0.05em',
            }}
          >
            Free Quote
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 focus:outline-none flex-shrink-0"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="w-5 h-px block transition-all duration-300 origin-center"
              style={{ background: barClr, transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}
            />
            <span
              className="w-5 h-px block transition-all duration-300"
              style={{ background: barClr, opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="w-5 h-px block transition-all duration-300 origin-center"
              style={{ background: barClr, transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '420px' : '0',
          background: scrolled ? 'var(--color-off-white)' : 'var(--color-navy)',
          borderTop: menuOpen ? navBdr : 'none',
        }}
      >
        <div className="px-5 pt-2 pb-5 flex flex-col">
          {/* Clean my… section */}
          <div
            className="text-xs font-medium py-2 mb-1"
            style={{ color: 'var(--color-brand-gold)', letterSpacing: '0.1em' }}
          >
            CLEAN MY…
          </div>
          {clientTypes.map((ct) => (
            <button
              key={ct.id}
              onClick={() => handleClientSelect(ct.id)}
              className="text-sm font-medium py-2.5 text-left transition-opacity"
              style={{
                color: scrolled ? 'rgba(11,29,46,0.65)' : 'rgba(255,255,255,0.65)',
                borderBottom: scrolled ? '1px solid rgba(11,29,46,0.05)' : '1px solid rgba(255,255,255,0.05)',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {ct.label}
            </button>
          ))}
          <button
            onClick={() => { onOtherClick(); closeMenu() }}
            className="text-sm font-medium py-2.5 text-left"
            style={{
              color: 'var(--color-brand-gold)',
              borderBottom: scrolled ? '1px solid rgba(11,29,46,0.05)' : '1px solid rgba(255,255,255,0.05)',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Something else…
          </button>

          {/* Divider */}
          <div className="my-3" style={{ borderTop: scrolled ? '1px solid rgba(11,29,46,0.10)' : '1px solid rgba(255,255,255,0.10)' }} />

          {/* Nav links */}
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={closeMenu}
              className="text-sm font-medium py-3.5 transition-opacity"
              style={{
                color: scrolled ? 'rgba(11,29,46,0.75)' : 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                borderBottom: scrolled ? '1px solid rgba(11,29,46,0.07)' : '1px solid rgba(255,255,255,0.07)',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { onQuoteClick(); closeMenu() }}
            className="mt-4 w-full text-sm font-medium text-white transition-all duration-200"
            style={{ background: 'var(--color-brand-blue)', borderLeft: '2px solid rgba(255,255,255,0.3)', minHeight: '44px' }}
          >
            Free Quote
          </button>
        </div>
      </div>
    </nav>
  )
}
