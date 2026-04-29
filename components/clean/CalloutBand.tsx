import type { JSX } from 'react'

export default function CalloutBand(): JSX.Element {
  return (
    <section
      className="grain bg-navy"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 56px',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: '780px' }}
      >
        {/* Gold rule — one gold moment for this section */}
        <div className="mb-8" style={{ width: '42px', height: '1px', background: 'var(--color-brand-gold)' }} />

        <p
          className="md:hidden"
          style={{
            fontFamily: 'var(--font-ibm-plex-sans)',
            fontSize: '22px',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          You shouldn&apos;t have to manage the people managing your space.
        </p>
        <p
          className="hidden md:block"
          style={{
            fontFamily: 'var(--font-ibm-plex-sans)',
            fontSize: '38px',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          You shouldn&apos;t have to manage<br />the people managing your space.
        </p>

        <p
          style={{
            fontSize: '15px',
            color: 'var(--color-white-50)',
            lineHeight: 1.5,
          }}
        >
          That&apos;s the whole point.
        </p>
      </div>
    </section>
  )
}
