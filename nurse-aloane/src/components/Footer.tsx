import { useLanguage } from '../i18n/LanguageContext'
import { site } from '../data/site'

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
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-3xl font-medium text-ivory">Nurse Aloane</p>
            <p className="mt-1 text-xs uppercase tracking-eyebrow text-champagne">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs uppercase tracking-eyebrow text-ivory/40">{t.footer.nav}</p>
            <ul className="mt-4 space-y-2">
              {NAV_IDS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-ivory/75 transition-colors hover:text-champagne">
                    {navLabels[id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-eyebrow text-ivory/40">{t.footer.follow}</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/75 transition-colors hover:text-champagne"
                >
                  Instagram · @{site.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-ivory/40">
          {t.footer.disclaimer}
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-ivory/10 pt-6 text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.name}. {t.footer.rights}
          </p>
          <p>{site.location.label}</p>
        </div>
      </div>
    </footer>
  )
}
