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
          <h2 className="text-3xl md:text-4xl text-navy mb-5 leading-snug">
            Built through real work, not theory
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-warm-gray-darker">
            <p>Brazusa was built in Boston by Brazilian immigrants doing the work themselves. That foundation still shapes how the company operates.</p>
            <p>Since 1994, hands-on experience built strong training, consistent standards, and a clear understanding of what clients need.</p>
            <p>Over time, structure was added on top of that. Work is completed, confirmed, and clearly communicated so nothing depends on guesswork.</p>
            <p>Today, the company runs with both layers in place. Strong execution on the ground, with systems to support it.</p>
            <p>For the client, that means less involvement. The work is handled, and you don&apos;t have to manage it.</p>
          </div>
          <div className="mt-7 flex items-center gap-4">
            <div className="w-8 h-px" style={{ background: 'var(--color-brand-gold)' }} />
            <span className="text-xs uppercase text-warm-gray-light" style={{ letterSpacing: '0.14em' }}>Serving Boston since 1994</span>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/5]">
          <Image
            src="/images/team.webp"
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
