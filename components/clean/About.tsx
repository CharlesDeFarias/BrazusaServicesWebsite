import Image from 'next/image'

export default function About() {
  return (
    <section
      id="about"
      className="bg-white py-14 px-6"
      style={{ borderTop: '1px solid #D8D0C6', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="italic text-3xl md:text-4xl text-navy mb-5 leading-snug" style={{ fontWeight: 300 }}>
            A family business,<br />rebuilt for today
          </h2>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#6B6360' }}>
            <p>
              Brazusa Cleaning started in 1994 when our mother began cleaning homes. Our father joined in the early 2000s, and the business grew to serve both residential and commercial clients across Greater Boston.
            </p>
            <p>
              Today, the next generation is modernizing the operation — better systems, better communication, same level of care that built the reputation.
            </p>
          </div>
          <div className="mt-7 flex items-center gap-4">
            <div className="w-8 h-px" style={{ background: '#C49A44' }} />
            <span className="text-xs uppercase" style={{ color: '#B0A89E', letterSpacing: '0.14em' }}>Serving Boston since 1994</span>
          </div>
        </div>
        <div className="relative hidden lg:block rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
          <Image
            src="/images/team.png"
            alt="Brazusa Cleaning team"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
      </div>
    </section>
  )
}
