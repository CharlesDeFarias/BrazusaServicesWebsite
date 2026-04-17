import type { JSX } from 'react'
import Image from 'next/image'

const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

export default function About(): JSX.Element {
  return (
    <section
      id="about"
      className="bg-off-white py-14 px-6"
      style={{ borderTop: '1px solid var(--color-light-gray)', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="italic text-3xl md:text-4xl text-navy mb-5 leading-snug" style={{ fontWeight: 300 }}>
            A family business,<br />rebuilt for today
          </h2>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--color-warm-gray-darker)' }}>
            <p>
              Brazusa Cleaning started in 1994 when our mother began cleaning homes. Our father joined in the early 2000s, and the business grew to serve both residential and commercial clients across Greater Boston.
            </p>
            <p>
              Today, the next generation is modernizing the operation — better systems, better communication, same level of care that built the reputation.
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
