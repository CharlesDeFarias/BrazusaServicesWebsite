import { useLanguage } from '../i18n/LanguageContext'
import type { Lang } from '../i18n/translations'

const OPTIONS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
]

/**
 * Pill-style EN / PT-BR switch. The active language slides into a filled chip.
 */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className={`inline-flex items-center rounded-full border border-forest/20 bg-ivory/60 p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt.code
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLang(opt.code)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors duration-300 ${
              active ? 'bg-forest text-ivory' : 'text-forest/70 hover:text-forest'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
