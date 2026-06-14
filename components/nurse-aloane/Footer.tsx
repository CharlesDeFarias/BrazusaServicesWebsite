'use client'

import { useLanguage } from '@/components/nurse-aloane/LanguageProvider'
import { site } from '@/lib/nurse-aloane/site'

const NAV_IDS = ['about', 'services', 'whyme', 'reviews', 'contact'] as const

export default function Footer() {
  const { t } = useLanguage()

  const navLabels: Record<(typeof NAV_IDS)[number], string> = {
    about: t.nav.about,
    services: t.nav.services,
    whyme: t.nav.whyme,
    reviews: t.nav.reviews,
    contact: t.nav.contact,
  }

  return (
    <footer className="bg-na-charcoal text-na-ivory">
      <div className="na-container px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="font-na-display text-3xl font-medium text-na-ivory">Nurse Aloane</p>
            <p className="mt-1 text-xs uppercase tracking-na-eyebrow text-na-champagne">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs uppercase tracking-na-eyebrow text-na-ivory/40">{t.footer.nav}</p>
            <ul className="mt-4 space-y-2">
              {NAV_IDS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-na-ivory/75 transition-colors hover:text-na-champagne">
                    {navLabels[id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-na-eyebrow text-na-ivory/40">{t.footer.follow}</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-na-ivory/75 transition-colors hover:text-na-champagne"
                >
                  Instagram · @{site.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-na-ivory/40">
          {t.footer.disclaimer}
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-na-ivory/10 pt-6 text-xs text-na-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.name}. {t.footer.rights}
          </p>
          <p>{site.location.label}</p>
        </div>
      </div>
    </footer>
  )
}
