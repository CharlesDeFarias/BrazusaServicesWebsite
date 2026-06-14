import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { LanguageProvider } from '@/components/nurse-aloane/LanguageProvider'
import './nurse-aloane.css'

// Scoped to the /nurse-aloane route only — exposed as CSS variables that the
// `na-` design tokens (globals.css @theme) reference.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nurse Aloane · Certified Nurse Injector · Greater Boston',
  description:
    'Nurse Aloane — Certified Nurse Injector serving the Greater Boston area. Botox, fillers, PRP, vitamins, peptides and medical weight loss.',
}

export default function NurseAloaneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`na-root ${cormorant.variable} ${jost.variable}`}>
      <LanguageProvider>{children}</LanguageProvider>
    </div>
  )
}
