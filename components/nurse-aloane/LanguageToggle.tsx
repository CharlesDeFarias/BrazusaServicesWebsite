'use client'

import { useLanguage } from '@/components/nurse-aloane/LanguageProvider'
import type { Lang } from '@/lib/nurse-aloane/translations'

const OPTIONS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
]

/** Pill-style EN / PT-BR switch. The active language fills with forest. */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className={`inline-flex items-center rounded-full border border-na-forest/20 bg-na-ivory/60 p-0.5 ${className}`}
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
              active ? 'bg-na-forest text-na-ivory' : 'text-na-forest/70 hover:text-na-forest'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
