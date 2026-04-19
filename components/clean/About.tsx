import type { JSX } from 'react'
import Image from 'next/image'

const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

export default function About(): JSX.Element {
  return (
    <section
      id="about"
      className="py-14 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--color-linen), var(--color-off-white))', borderTop: '1px solid var(--color-light-gray)', scrollMarginTop: '56px' }}
    >
      {/* no token: intentional — 1.5% opacity falls below all stops */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(11,29,46,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,46,0.015) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative">
        <div>
          <h2 className="italic text-3xl md:text-4xl text-navy mb-5 leading-snug" style={{ fontWeight: 300 }}>
            A family business,<br />rebuilt for today
          </h2>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--color-warm-gray-darker)' }}>
            <p>
              Brazusa started in 1994 when our mother began cleaning homes.
            </p>
            <p>
              Over time, it grew into a full business when our father joined after being laid off during the housing crisis.
            </p>
            <p>
              Since then, we&apos;ve worked across homes, apartments, offices, and large property operations.
            </p>
            <p>
              The difference now is structure.
            </p>
            <p>
              The next generation is building systems around that experience — so the quality stays the same,
              but everything around it works better.
            </p>
          </div>
          <div className="mt-7 flex items-center gap-4">
            <div className="w-8 h-px" style={{ background: 'var(--color-brand-gold)' }} />
            <span className="text-xs uppercase" style={{ color: 'var(--color-warm-gray-light)', letterSpacing: '0.14em' }}>Serving Boston since 1994</span>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/5]">
          <Image
            src="/images/team.png"
            alt="Brazusa Cleaning team"
            fill
            className="object-cover"
            style={{ objectPosition: 'center top' }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </div>
    </section>
  )
}
