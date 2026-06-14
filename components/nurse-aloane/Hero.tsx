'use client'

import { useLanguage } from '@/components/nurse-aloane/LanguageProvider'
import { whatsappLink } from '@/lib/nurse-aloane/helpers/whatsapp-link'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section
      id="top"
      className="na-grain relative overflow-hidden bg-na-ivory pt-40 pb-20 sm:pt-48 sm:pb-28"
    >
      {/* Atmospheric background washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-na-blush/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-na-moss/15 blur-3xl"
      />

      <div className="na-container relative grid items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy column */}
        <div className="max-w-xl">
          <p className="na-eyebrow na-fade-up" style={{ animationDelay: '0.05s' }}>
            {h.eyebrow}
          </p>
          <h1
            className="mt-5 font-na-display text-6xl font-medium leading-[0.95] text-na-forest na-fade-up sm:text-7xl lg:text-8xl"
            style={{ animationDelay: '0.15s' }}
          >
            Nurse
            <br />
            <span className="italic text-na-gold">Aloane</span>
          </h1>
          <p
            className="mt-6 max-w-md font-na-display text-2xl italic leading-snug text-na-charcoal/80 na-fade-up"
            style={{ animationDelay: '0.28s' }}
          >
            {h.subtitle}
          </p>
          <p
            className="mt-5 max-w-md text-base leading-relaxed text-na-charcoal/70 na-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            {h.description}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3 na-fade-up"
            style={{ animationDelay: '0.52s' }}
          >
            <a
              href={whatsappLink(t.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="na-btn-primary"
            >
              {h.primaryCta}
            </a>
            <a href="#services" className="na-btn-ghost">
              {h.secondaryCta}
            </a>
          </div>
        </div>

        {/* Visual column — arch-framed portrait placeholder + floating chips */}
        <div
          className="relative mx-auto w-full max-w-sm na-fade-in lg:max-w-none"
          style={{ animationDelay: '0.45s' }}
        >
          <div className="relative aspect-[4/5] w-full">
            {/* Arch frame */}
            <div className="absolute inset-0 rounded-t-full rounded-b-[2.5rem] bg-gradient-to-b from-na-moss/30 via-na-blush/40 to-na-cream shadow-2xl shadow-na-forest/10" />
            <div className="absolute inset-3 overflow-hidden rounded-t-full rounded-b-[2rem] border border-na-ivory/60 bg-gradient-to-br from-na-cream to-na-sand">
              {/* Photo placeholder — dashed slot clearly marks where Aloane's portrait goes */}
              <div className="absolute inset-4 flex flex-col items-center justify-center gap-3 rounded-t-full rounded-b-[1.5rem] border-2 border-dashed border-na-forest/30 text-center text-na-forest/45">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
                </svg>
                <span className="px-6 font-na-display text-xl italic">{h.photoCaption}</span>
                <span className="rounded-full bg-na-forest/10 px-3 py-1 text-[0.6rem] uppercase tracking-na-eyebrow text-na-forest/60">
                  {h.photoHint}
                </span>
              </div>
            </div>

            {/* Floating credential chip */}
            <div className="absolute -left-4 top-10 na-float rounded-2xl border border-na-forest/10 bg-na-ivory/90 px-4 py-3 shadow-lg shadow-na-forest/10 backdrop-blur sm:-left-8">
              <p className="text-[0.6rem] uppercase tracking-na-eyebrow text-na-gold">{h.chipCertified}</p>
              <p className="font-na-display text-lg text-na-forest">{h.chipRole}</p>
            </div>

            {/* Floating stat chip */}
            <div
              className="absolute -right-3 bottom-10 na-float rounded-2xl border border-na-forest/10 bg-na-forest px-4 py-3 text-na-ivory shadow-lg shadow-na-forest/20 sm:-right-6"
              style={{ animationDelay: '1.5s' }}
            >
              <p className="font-na-display text-2xl leading-none">5.0★</p>
              <p className="text-[0.6rem] uppercase tracking-na-eyebrow text-na-champagne">{h.chipRated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="na-container relative mt-16 px-5 sm:px-8">
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-na-forest/10 bg-na-forest/10 text-center">
          {[
            { big: h.stat1, small: h.stat1label },
            { big: h.stat2, small: h.stat2label },
            { big: h.stat3, small: h.stat3label },
          ].map((s, i) => (
            <div key={i} className="bg-na-ivory px-3 py-6">
              <p className="font-na-display text-2xl text-na-forest sm:text-3xl">{s.big}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-na-eyebrow text-na-charcoal/55">{s.small}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
