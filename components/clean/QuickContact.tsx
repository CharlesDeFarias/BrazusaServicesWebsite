import type { JSX } from 'react'

export default function QuickContact(): JSX.Element {
  return (
    <section
      id="contact"
      className="py-14 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--color-linen), var(--color-off-white))', borderTop: '1px solid var(--color-light-gray)', scrollMarginTop: '56px' }}
    >
      {/* no token: intentional — 1.5% opacity falls below all stops */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(11,29,46,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,46,0.015) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="max-w-5xl mx-auto relative">
        <h2 className="italic text-3xl md:text-4xl text-navy mb-2 leading-snug" style={{ fontWeight: 300 }}>
          Reach us directly
        </h2>
        <p className="text-sm mb-10 text-warm-gray">
          {'We respond quickly \u2014 usually same day.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-5 flex-wrap">
          {/* Phone */}
          <a
            href="tel:7816867189"
            className="flex items-center gap-4 group flex-1 min-w-[220px]"
          >
            <div
              className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-navy"
              style={{ background: 'var(--color-navy-subtle)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-navy group-hover:text-white transition-colors">
                <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider mb-0.5 text-warm-gray-light">Call or Text</p>
              <p className="font-medium text-navy group-hover:underline underline-offset-2" style={{ fontFamily: 'var(--font-syne)' }}>
                781-686-7189
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:info@brazusa.com"
            className="flex items-center gap-4 group flex-1 min-w-[220px]"
          >
            <div
              className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-navy"
              style={{ background: 'var(--color-navy-subtle)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-navy group-hover:text-white transition-colors">
                <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider mb-0.5 text-warm-gray-light">Email</p>
              <p className="font-medium text-navy group-hover:underline underline-offset-2" style={{ fontFamily: 'var(--font-syne)' }}>
                info@brazusa.com
              </p>
            </div>
          </a>

          {/* Google Business */}
          <a
            href="https://maps.app.goo.gl/gvJ4MmpuShUocGB3A"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 group transition-all duration-200 hover:shadow-md flex-1 min-w-[220px]"
            style={{ border: '1px solid var(--color-light-gray)', background: 'white' }}
          >
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg" style={{ background: '#F8F4EE' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 3-4.33 3-7.31z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.96-.89 6.62-2.42l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.75-5.59-4.12H1.08v2.6A10 10 0 0 0 10 20z" fill="#34A853"/>
                <path d="M4.41 11.91A6 6 0 0 1 4.1 10c0-.67.11-1.32.31-1.91V5.5H1.08A10.01 10.01 0 0 0 0 10c0 1.61.39 3.14 1.08 4.5l3.33-2.59z" fill="#FBBC05"/>
                <path d="M10 3.97c1.47 0 2.79.5 3.83 1.5l2.87-2.87C14.96.89 12.7 0 10 0A10 10 0 0 0 1.08 5.5l3.33 2.58C5.2 5.72 7.4 3.97 10 3.97z" fill="#EA4335"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wider mb-0.5 text-warm-gray-light">Google Business</p>
              <p className="font-medium text-navy text-sm" style={{ fontFamily: 'var(--font-syne)' }}>
                View our profile &amp; reviews
              </p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 transition-transform group-hover:translate-x-0.5">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="var(--color-brand-gold)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
