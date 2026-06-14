'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Lang, type Translation } from '@/lib/nurse-aloane/translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'nurse-aloane-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start at 'en' so server and client first render match (no hydration
  // mismatch). The saved/browser preference is applied on mount.
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'pt') {
      setLangState(saved)
    } else if (navigator.language?.toLowerCase().startsWith('pt')) {
      setLangState('pt')
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const setLang = (next: Lang) => setLangState(next)
  const toggle = () => setLangState((prev) => (prev === 'en' ? 'pt' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
