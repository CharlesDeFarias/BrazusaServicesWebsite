interface ImagePlaceholderProps {
  aspect?: string
  label: string
  className?: string
  dark?: boolean
}

export default function ImagePlaceholder({
  aspect = '4/3',
  label,
  className = '',
  dark = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        aspectRatio: aspect,
        background: dark
          ? 'linear-gradient(135deg, #0d2035 0%, #162d44 100%)'
          : 'linear-gradient(135deg, #DDD6CC 0%, #C9C0B5 100%)',
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px),
            linear-gradient(90deg, ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />
      {/* Diagonal accent */}
      <div
        className="absolute"
        style={{
          top: '48%',
          left: '-15%',
          right: '-15%',
          height: '1px',
          background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
          transform: 'rotate(-6deg)',
        }}
      />
      {/* Center icon + label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.22)'}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        <span
          className="text-[9px] uppercase tracking-[0.18em]"
          style={{ color: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.18)' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
