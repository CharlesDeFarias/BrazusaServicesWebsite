'use client'

import { useLanguage } from '@/components/nurse-aloane/LanguageProvider'
import Reveal from '@/components/nurse-aloane/Reveal'
import { site } from '@/lib/nurse-aloane/site'

function Stars() {
  return (
    <div className="flex gap-0.5 text-na-gold" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.3 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.4l1.3-6.7-5-4.6 6.8-.8L12 2Z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLanguage()
  const r = t.reviews

  return (
    <section id="reviews" className="relative bg-na-cream py-24 sm:py-32">
      <div className="na-container px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal as="p" className="na-eyebrow">
            {r.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.05} className="na-display-title mt-4 text-4xl sm:text-5xl">
            {r.title}
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {r.items.map((item, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 0.08}
              className="flex flex-col justify-between rounded-3xl border border-na-forest/10 bg-na-ivory p-8 shadow-sm shadow-na-forest/5"
            >
              <div>
                <Stars />
                <p className="mt-5 font-na-display text-xl italic leading-snug text-na-charcoal/85">
                  “{item.quote}”
                </p>
              </div>
              <div className="mt-7 border-t border-na-forest/10 pt-5">
                <p className="font-medium text-na-forest">{item.author}</p>
                <p className="text-sm text-na-charcoal/55">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-na-gold underline-offset-4 hover:underline"
          >
            @{site.instagram} →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
