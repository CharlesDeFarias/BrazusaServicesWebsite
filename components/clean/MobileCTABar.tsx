import type { JSX } from 'react'

interface MobileCTABarProps {
  onQuoteClick: () => void
  drawerOpen: boolean
}

export default function MobileCTABar({ onQuoteClick, drawerOpen }: MobileCTABarProps): JSX.Element | null {
  if (drawerOpen) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden grid grid-cols-2 shadow-xl"
      style={{
        borderTop: '2px solid var(--color-brand-gold)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <button
        onClick={onQuoteClick}
        className="py-4 text-sm font-medium text-white transition-colors active:opacity-80"
        style={{ background: 'var(--color-navy)', borderRight: '1px solid var(--color-white-10)' }}
      >
        Get a Free Quote
      </button>
      <a
        href="tel:7816867189"
        className="py-4 text-sm font-medium text-center transition-colors active:opacity-80 text-navy"
        style={{ background: 'var(--color-off-white)' }}
      >
        Call Now
      </a>
    </div>
  )
}
