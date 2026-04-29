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
  { id: 'homes',    label: 'Homes' },
]

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
]

const SCROLL_THRESHOLD_DESKTOP = 540
const SCROLL_THRESHOLD_MOBILE  = 100

export default function StickyNav({ onQuoteClick, setActiveClient, onOtherClick }: StickyNavProps): JSX.Element {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [cleanOpen, setCleanOpen] = useState(false)
  const cleanRef = useRef<HTMLDivElement>(null)
  const previousScrolledRef = useRef(false)

  useEffect(() => {
    const onScroll = (): void => {
      const isMobile = window.innerWidth < 768
      const threshold = isMobile ? SCROLL_THRESHOLD_MOBILE : SCROLL_THRESHOLD_DESKTOP
      const nextScrolled = window.scrollY > threshold

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

  const navBg   = scrolled ? 'var(--color-off-white)'             : 'rgba(11,29,46,0.78)'
  const navBdr  = scrolled ? '1px solid rgba(11,29,46,0.12)'      : 'none'
  const linkClr = scrolled ? 'rgba(11,29,46,0.55)'                : 'var(--color-white-60)'
  const barClr  = scrolled ? 'var(--color-navy)'                  : 'white'

  const dividerClr = scrolled ? 'var(--color-navy-15)' : 'rgba(255,255,255,0.14)'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-250"
      style={{ background: navBg, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: navBdr }}
    >
      {/* 2px gold strip at very top */}
      <div style={{ height: '2px', background: 'var(--color-brand-gold)', width: '100%' }} />

      {/* ── Main bar ── */}
      <div
        className="max-w-6xl mx-auto px-5 flex items-center justify-between gap-4 transition-all duration-250"
        style={{ height: scrolled ? '44px' : '54px' }}
      >

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
              transition: 'all 0.25s',
            }}
          >
            <Image
              src="/brand/logo.jpg"
              alt="Brazusa Cleaning"
              width={120}
              height={42}
              className="w-auto object-contain transition-all duration-250"
              style={{ height: scrolled ? '32px' : '38px', display: 'block' }}
              priority
            />
          </div>
          <span
            className="hidden sm:block"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: scrolled ? '14px' : '15px',
              fontWeight: 600,
              letterSpacing: '0.03em',
              color: scrolled ? 'var(--color-navy)' : 'rgba(255,255,255,0.88)',
              transition: 'all 0.25s',
              whiteSpace: 'nowrap',
            }}
          >
            Brazusa Cleaning
          </span>
        </button>

        {/* ── Desktop: phone + centered links + quote ── */}
        <div className="hidden md:flex items-center gap-0 flex-1 justify-between">

          {/* Phone in dead space — left of centered links */}
          <div className="flex items-center gap-3 pl-4">
            {/* Vertical divider */}
            <div style={{ width: '1px', height: '18px', background: dividerClr }} />
            <a
              href="tel:7816867189"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-100"
              style={{ textDecoration: 'none' }}
            >
              {/* Phone icon */}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-brand-gold)', flexShrink: 0 }}>
                <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '12.5px',
                  color: linkClr,
                  letterSpacing: '0.02em',
                }}
              >
                781-686-7189
              </span>
            </a>
          </div>

          {/* Centered links */}
          <div className="flex items-center gap-6">
            {/* "Clean my…" dropdown trigger */}
            <div className="relative" ref={cleanRef}>
              <button
                onClick={() => setCleanOpen(!cleanOpen)}
                className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-100"
                style={{ color: linkClr, letterSpacing: '0.06em' }}
              >
                Clean my{'…'}
                <svg
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  className="transition-transform duration-200"
                  style={{ transform: cleanOpen ? 'rotate(180deg)' : 'none' }}
                >
                  <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {cleanOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-52 py-1.5 shadow-xl z-50"
                  style={{
                    background: scrolled ? 'var(--color-off-white)' : 'var(--color-navy)',
                    border: scrolled ? '1px solid var(--color-light-gray)' : '1px solid var(--color-white-10)',
                  }}
                >
                  {clientTypes.map((ct) => (
                    <button
                      key={ct.id}
                      onClick={() => handleClientSelect(ct.id)}
                      className="w-full text-left px-4 py-2.5 text-xs transition-colors"
                      style={{ color: scrolled ? 'rgba(11,29,46,0.75)' : 'rgba(255,255,255,0.75)', minHeight: '36px' }}
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
                    style={{ color: 'var(--color-brand-gold)', minHeight: '36px' }}
                    onMouseEnter={e => (e.currentTarget.style.background = scrolled ? 'rgba(11,29,46,0.06)' : 'rgba(255,255,255,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    Something else{'…'}
                  </button>
                </div>
              )}
            </div>

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

          {/* Get a Quote */}
          <button
            onClick={onQuoteClick}
            className="text-xs font-medium px-4 py-2 transition-all duration-200"
            style={{
              background: scrolled ? 'var(--color-navy)' : 'transparent',
              color: scrolled ? 'white' : 'white',
              borderLeft: '2px solid var(--color-brand-gold)',
              letterSpacing: '0.05em',
            }}
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile right cluster: Clean my… | Quote | ☏ | ≡ */}
        <div className="md:hidden flex items-center gap-2 flex-shrink-0">

          {/* Clean my… dropdown trigger (outlined) */}
          <div className="relative" ref={cleanRef}>
            <button
              onClick={() => setCleanOpen(!cleanOpen)}
              className="text-xs font-medium px-2.5 py-1.5 flex items-center gap-1"
              style={{
                fontFamily: 'var(--font-syne)',
                color: scrolled ? 'var(--color-navy)' : 'white',
                border: scrolled ? '1px solid rgba(11,29,46,0.2)' : '1px solid rgba(255,255,255,0.25)',
                letterSpacing: '0.04em',
              }}
            >
              Clean my{'…'}
              <svg
                width="8" height="8" viewBox="0 0 10 10" fill="none"
                style={{ transform: cleanOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              >
                <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {cleanOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-52 py-1.5 shadow-xl z-50"
                style={{
                  background: scrolled ? 'var(--color-off-white)' : 'var(--color-navy)',
                  border: scrolled ? '1px solid var(--color-light-gray)' : '1px solid var(--color-white-10)',
                }}
              >
                {clientTypes.map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() => handleClientSelect(ct.id)}
                    className="w-full text-left px-4 py-2.5 text-xs transition-colors"
                    style={{ color: scrolled ? 'rgba(11,29,46,0.75)' : 'rgba(255,255,255,0.75)', minHeight: '36px' }}
                    onMouseEnter={e => (e.currentTarget.style.background = scrolled ? 'rgba(11,29,46,0.06)' : 'rgba(255,255,255,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {ct.label}
                  </button>
                ))}
                <div style={{ borderTop: scrolled ? '1px solid var(--color-light-gray)' : '1px solid rgba(255,255,255,0.08)', margin: '4px 0' }} />
                <button
                  onClick={() => { onOtherClick(); setCleanOpen(false) }}
                  className="w-full text-left px-4 py-2.5 text-xs"
                  style={{ color: 'var(--color-brand-gold)', minHeight: '36px' }}
                  onMouseEnter={e => (e.currentTarget.style.background = scrolled ? 'rgba(11,29,46,0.06)' : 'rgba(255,255,255,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  Something else{'…'}
                </button>
              </div>
            )}
          </div>

          {/* Quote button */}
          <button
            onClick={onQuoteClick}
            className="text-xs font-medium px-2.5 py-1.5 min-h-[32px]"
            style={{
              background: scrolled ? 'var(--color-navy)' : 'var(--color-navy)',
              color: 'white',
              borderLeft: '2px solid var(--color-brand-gold)',
              letterSpacing: '0.04em',
            }}
          >
            Quote
          </button>

          {/* Phone icon button */}
          <a
            href="tel:7816867189"
            className="flex items-center justify-center w-9 h-9"
            aria-label="Call or text 781-686-7189"
            style={{ color: scrolled ? 'var(--color-navy)' : 'white' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus:outline-none flex-shrink-0"
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

      {/* ── Mobile full menu (hamburger expanded) ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '420px' : '0',
          background: scrolled ? 'var(--color-off-white)' : 'var(--color-navy)',
          borderTop: menuOpen ? navBdr : 'none',
        }}
      >
        <div className="px-5 pt-2 pb-5 flex flex-col">
          <div
            className="text-xs font-medium py-2 mb-1"
            style={{ color: 'var(--color-brand-gold)', letterSpacing: '0.1em' }}
          >
            CLEAN MY{'…'}
          </div>
          {clientTypes.map((ct) => (
            <button
              key={ct.id}
              onClick={() => handleClientSelect(ct.id)}
              className="text-sm font-medium py-2.5 text-left transition-opacity"
              style={{
                color: scrolled ? 'rgba(11,29,46,0.65)' : 'rgba(255,255,255,0.65)',
                borderBottom: scrolled ? '1px solid var(--color-navy-5)' : '1px solid var(--color-white-5)',
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
              borderBottom: scrolled ? '1px solid var(--color-navy-5)' : '1px solid var(--color-white-5)',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Something else{'…'}
          </button>

          <div className="my-3" style={{ borderTop: scrolled ? '1px solid var(--color-navy-10)' : '1px solid var(--color-white-10)' }} />

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
            style={{ background: 'var(--color-navy)', borderLeft: '2px solid var(--color-brand-gold)', minHeight: '44px' }}
          >
            Get a Quote
          </button>
        </div>
      </div>
    </nav>
  )
}
