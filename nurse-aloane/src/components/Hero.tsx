import { useLanguage } from '../i18n/LanguageContext'
import { whatsappLink } from '../data/site'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section id="top" className="grain relative overflow-hidden bg-ivory pt-40 pb-20 sm:pt-48 sm:pb-28">
      {/* Atmospheric background washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blush/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-moss/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-content items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy column */}
        <div className="max-w-xl">
          <p className="eyebrow animate-fade-up opacity-0" style={{ animationDelay: '0.05s' }}>
            {h.eyebrow}
          </p>
          <h1
            className="mt-5 font-display text-6xl font-medium leading-[0.95] text-forest animate-fade-up opacity-0 sm:text-7xl lg:text-8xl"
            style={{ animationDelay: '0.15s' }}
          >
            Nurse
            <br />
            <span className="italic text-gold">Aloane</span>
          </h1>
          <p
            className="mt-6 max-w-md font-display text-2xl italic leading-snug text-charcoal/80 animate-fade-up opacity-0"
            style={{ animationDelay: '0.28s' }}
          >
            {h.subtitle}
          </p>
          <p
            className="mt-5 max-w-md text-base leading-relaxed text-charcoal/70 animate-fade-up opacity-0"
            style={{ animationDelay: '0.4s' }}
          >
            {h.description}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up opacity-0"
            style={{ animationDelay: '0.52s' }}
          >
            <a
              href={whatsappLink(t.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {h.primaryCta}
            </a>
            <a href="#services" className="btn-ghost">
              {h.secondaryCta}
            </a>
          </div>
        </div>

        {/* Visual column — arch-framed portrait placeholder + floating chips */}
        <div
          className="relative mx-auto w-full max-w-sm animate-fade-in opacity-0 lg:max-w-none"
          style={{ animationDelay: '0.45s' }}
        >
          <div className="relative aspect-[4/5] w-full">
            {/* Arch frame */}
            <div className="absolute inset-0 rounded-t-full rounded-b-[2.5rem] bg-gradient-to-b from-moss/30 via-blush/40 to-cream shadow-2xl shadow-forest/10" />
            <div className="absolute inset-3 overflow-hidden rounded-t-full rounded-b-[2rem] border border-ivory/60 bg-gradient-to-br from-cream to-sand">
              {/* Photo placeholder */}
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-forest/40">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
                </svg>
                <span className="px-6 font-display text-lg italic">Photo of Aloane</span>
              </div>
            </div>

            {/* Floating credential chip */}
            <div className="absolute -left-4 top-10 animate-float rounded-2xl border border-forest/10 bg-ivory/90 px-4 py-3 shadow-lg shadow-forest/10 backdrop-blur sm:-left-8">
              <p className="text-[0.6rem] uppercase tracking-eyebrow text-gold">Certified</p>
              <p className="font-display text-lg text-forest">Nurse Injector</p>
            </div>

            {/* Floating stat chip */}
            <div
              className="absolute -right-3 bottom-10 animate-float rounded-2xl border border-forest/10 bg-forest px-4 py-3 text-ivory shadow-lg shadow-forest/20 sm:-right-6"
              style={{ animationDelay: '1.5s' }}
            >
              <p className="font-display text-2xl leading-none">5.0★</p>
              <p className="text-[0.6rem] uppercase tracking-eyebrow text-champagne">Client rated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="relative mx-auto mt-16 max-w-content px-5 sm:px-8">
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-forest/10 bg-forest/10 text-center">
          {[
            { big: h.stat1, small: h.stat1label },
            { big: h.stat2, small: h.stat2label },
            { big: h.stat3, small: h.stat3label },
          ].map((s, i) => (
            <div key={i} className="bg-ivory px-3 py-6">
              <p className="font-display text-2xl text-forest sm:text-3xl">{s.big}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-eyebrow text-charcoal/55">{s.small}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
