'use client'

import { useLanguage } from '@/components/nurse-aloane/LanguageProvider'
import Reveal from '@/components/nurse-aloane/Reveal'

const NUMBERS = ['01', '02', '03', '04']

export default function WhyChoose() {
  const { t } = useLanguage()
  const w = t.why

  return (
    <section id="whyme" className="relative bg-na-ivory py-24 sm:py-32">
      <div className="na-container px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal as="p" className="na-eyebrow">
            {w.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.05} className="na-display-title mt-4 text-4xl sm:text-5xl">
            {w.title}
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {w.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 2) * 0.08}
              className="flex gap-6 border-t border-na-forest/15 pt-7"
            >
              <span className="font-na-display text-3xl italic text-na-gold">{NUMBERS[i]}</span>
              <div>
                <h3 className="font-na-display text-2xl text-na-forest">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-na-charcoal/70">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
