'use client'

import { useLanguage } from '@/components/nurse-aloane/LanguageProvider'
import Reveal from '@/components/nurse-aloane/Reveal'

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="relative bg-na-cream py-24 sm:py-32">
      <div className="na-container grid gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Decorative arch panel with signature + credentials */}
        <Reveal className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-na-moss/25 via-na-blush/30 to-na-ivory p-8">
            <div className="flex h-full flex-col justify-between rounded-[2rem] border border-na-ivory/70 bg-na-ivory/50 p-8 backdrop-blur-sm">
              <p className="font-na-display text-7xl italic text-na-gold">“</p>
              <div>
                <p className="font-na-display text-3xl italic leading-tight text-na-forest">
                  {a.signature}
                </p>
                <ul className="mt-6 space-y-2">
                  {a.credentials.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-sm text-na-charcoal/75">
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-na-gold" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal as="p" className="na-eyebrow">
            {a.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.05} className="na-display-title mt-4 text-4xl sm:text-5xl">
            {a.title}
          </Reveal>
          <div className="mt-7 space-y-5">
            {a.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={0.12 + i * 0.08} className="text-lg leading-relaxed text-na-charcoal/75">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
