const serviceLinks = [
  { label: 'Painting',     href: '/painting' },
  { label: 'Construction', href: '/construction' },
  { label: 'Roofing',      href: '/roofing' },
  { label: 'Tiling',       href: '/tiling' },
]

export default function Footer() {
  return (
    <footer
      className="bg-navy text-white py-12 px-6"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          <div>
            <p
              className="font-semibold text-white mb-3"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Brazusa Cleaning
            </p>
            <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Greater Boston &amp; surrounding areas
            </p>
            <a
              href="tel:7816867189"
              className="text-sm block mt-1.5 hover:text-white transition-colors"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              781-686-7189
            </a>
            <a
              href="mailto:info@brazusa.com"
              className="text-sm block mt-1 hover:text-white transition-colors"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              info@brazusa.com
            </a>
          </div>

          <div>
            <p
              className="text-xs uppercase mb-5"
              style={{
                color: 'rgba(255,255,255,0.22)',
                letterSpacing: '0.14em',
                fontFamily: 'var(--font-syne)',
              }}
            >
              More Services
            </p>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'rgba(255,255,255,0.38)' }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className="text-xs pt-6"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.18)',
          }}
        >
          © {new Date().getFullYear()} Brazusa Cleaning. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
