const serviceLinks = [
  { label: 'Painting',      href: '/painting' },
  { label: 'Construction',  href: '/construction' },
  { label: 'Roofing',       href: '/roofing' },
  { label: 'Tiling',        href: '/tiling' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-12 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          <div>
            <p className="font-semibold text-white mb-3">Brazusa Cleaning</p>
            <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Greater Boston &amp; surrounding areas</p>
            <a href="tel:+1" className="text-sm block mt-1 hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Call / Text Us
            </a>
            <a href="mailto:info@brazusa.com" className="text-sm block mt-1 hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
              info@brazusa.com
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>More Services</p>
            <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>Need more than cleaning?</p>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)' }}>
          © {new Date().getFullYear()} Brazusa Cleaning. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
