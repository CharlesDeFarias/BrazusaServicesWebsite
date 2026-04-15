interface MobileCTABarProps {
  onQuoteClick: () => void
  drawerOpen: boolean
}

export default function MobileCTABar({ onQuoteClick, drawerOpen }: MobileCTABarProps) {
  if (drawerOpen) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden grid grid-cols-2 shadow-xl"
      style={{
        borderTop: '2px solid #C49A44',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <button
        onClick={onQuoteClick}
        className="py-4 text-sm font-medium text-white transition-colors active:opacity-80"
        style={{ background: '#0B1D2E', borderRight: '1px solid rgba(255,255,255,0.1)' }}
      >
        Get a Free Quote
      </button>
      <a
        href="tel:7816867189"
        className="py-4 text-sm font-medium text-center transition-colors active:opacity-80"
        style={{ background: '#F2EDE6', color: '#0B1D2E' }}
      >
        Call Now
      </a>
    </div>
  )
}
