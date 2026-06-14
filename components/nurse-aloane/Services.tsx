'use client'

import { useLanguage } from '@/components/nurse-aloane/LanguageProvider'
import Reveal from '@/components/nurse-aloane/Reveal'
import { whatsappLink } from '@/lib/nurse-aloane/helpers/whatsapp-link'

/** Minimal line icons keyed by service index (matches translations.services.items order). */
const ICONS = [
  'M12 3c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9Z',
  'M4 20l3-3m0 0l7-7 4 4-7 7-4-4Zm9-9l3-3m-1-1l4 4',
  'M5 8a7 7 0 0 0 14 0M8 4v2m8-2v2M9 13c1 1.5 5 1.5 6 0',
  'M9 3h6m-5 0v4l-2 3v9a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-9l-2-3V3',
  'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z',
  'M5 19c0-8 6-14 14-14 0 8-6 14-14 14Zm0 0c2.5-5 6-8.5 11-11',
  'M7 7a2 2 0 1 0 .001-.001M17 17a2 2 0 1 0 .001-.001M17 7a2 2 0 1 0 .001-.001M7 17a2 2 0 1 0 .001-.001M8.5 8.5l7 7m0-7l-7 7',
  'M4 7h16M9 7a3 3 0 0 0 6 0M6 7l-2 6a3 3 0 0 0 6 0l-2-6m8 0l-2 6a3 3 0 0 0 6 0l-2-6M12 7v13M9 20h6',
]

export default function Services() {
  const { t } = useLanguage()
  const s = t.services

  return (
    <section id="services" className="na-grain relative overflow-hidden bg-na-forest py-24 text-na-ivory sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-na-moss/40 blur-3xl"
      />
      <div className="na-container relative px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal as="p" className="na-eyebrow !text-na-champagne">
            {s.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.05} className="mt-4 font-na-display text-4xl font-medium leading-tight sm:text-5xl">
            {s.title}
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-5 text-lg leading-relaxed text-na-ivory/70">
            {s.intro}
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-na-ivory/15 bg-na-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item, i) => (
            <Reveal
              key={item.name}
              delay={(i % 4) * 0.06}
              className="group bg-na-forest p-7 transition-colors duration-500 hover:bg-na-charcoal"
            >
              <svg
                className="h-9 w-9 text-na-champagne transition-transform duration-500 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={ICONS[i % ICONS.length]} />
              </svg>
              <h3 className="mt-5 font-na-display text-2xl text-na-ivory">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-na-ivory/65">{item.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm italic text-na-ivory/55">{s.note}</p>
          <a
            href={whatsappLink(t.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-na-champagne px-7 py-3.5 text-sm font-medium tracking-wide text-na-forest transition-all duration-300 hover:bg-na-ivory active:scale-[0.98]"
          >
            {t.nav.book}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
