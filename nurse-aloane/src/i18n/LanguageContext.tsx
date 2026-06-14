import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Lang, type Translation } from './translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'nurse-aloane-lang'

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'pt') return saved
  // Default to Portuguese for pt-* browsers, otherwise English.
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const setLang = (next: Lang) => setLangState(next)
  const toggle = () => setLangState((prev) => (prev === 'en' ? 'pt' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
