'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/nurse-aloane/LanguageProvider'
import LanguageToggle from '@/components/nurse-aloane/LanguageToggle'
import { site } from '@/lib/nurse-aloane/site'
import { whatsappLink } from '@/lib/nurse-aloane/helpers/whatsapp-link'

const NAV_IDS = ['about', 'services', 'whyme', 'reviews', 'contact'] as const

export default function Header() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLabels: Record<(typeof NAV_IDS)[number], string> = {
    about: t.nav.about,
    services: t.nav.services,
    whyme: t.nav.whyme,
    reviews: t.nav.reviews,
    contact: t.nav.contact,
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-na-forest/10 bg-na-ivory/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="na-container flex items-center justify-between px-5 py-4 sm:px-8">
        {/* Wordmark */}
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-na-display text-2xl font-medium tracking-tight text-na-forest">
            Nurse Aloane
          </span>
          <span className="mt-0.5 text-[0.6rem] uppercase tracking-na-eyebrow text-na-gold">
            Nurse Injector
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="relative text-sm font-medium text-na-charcoal/80 transition-colors hover:text-na-forest
                         after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-na-gold
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              {navLabels[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />
          <a
            href={whatsappLink(t.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="na-btn-primary hidden !px-5 !py-2.5 sm:inline-flex"
          >
            {t.nav.book}
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-na-forest/20 text-na-forest lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-na-forest/10 bg-na-ivory/95 backdrop-blur-md transition-[max-height] duration-500 lg:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="na-container flex flex-col gap-1 px-5 py-4 sm:px-8">
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="border-b border-na-forest/5 py-3 font-na-display text-xl text-na-forest"
            >
              {navLabels[id]}
            </a>
          ))}
          <div className="mt-3 flex items-center justify-between">
            <LanguageToggle />
            <a
              href={whatsappLink(t.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="na-btn-primary !px-5 !py-2.5"
              onClick={() => setOpen(false)}
            >
              {t.nav.book}
            </a>
          </div>
          <p className="mt-3 text-xs text-na-charcoal/50">@{site.instagram}</p>
        </nav>
      </div>
    </header>
  )
}
