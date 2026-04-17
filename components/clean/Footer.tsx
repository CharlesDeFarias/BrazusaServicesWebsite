'use client'

import type { JSX } from 'react'
import Image from 'next/image'
import NewsletterCTA from './NewsletterCTA'

const serviceLinks = [
  { label: 'Painting',     href: '/painting' },
  { label: 'Construction', href: '/construction' },
  { label: 'Roofing',      href: '/roofing' },
  { label: 'Tiling',       href: '/tiling' },
]

export default function Footer(): JSX.Element {
  return (
    <footer
      className="bg-navy text-white px-6"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Newsletter strip */}
      <div
        className="max-w-5xl mx-auto py-8"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <div className="flex-shrink-0">
            <p className="text-sm font-medium text-white mb-0.5">For hosts &amp; managers</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Occasional tips for homes, STR hosts &amp; property managers — plus promo windows when we have availability.
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <NewsletterCTA />
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-5xl mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          <div>
            <div
              className="inline-flex mb-4"
              style={{ background: 'rgba(255,255,255,0.92)', padding: 0, overflow: 'hidden', lineHeight: 0, borderRadius: 0 }}
            >
              <Image
                src="/brand/logo.jpg"
                alt="Brazusa Cleaning"
                width={160}
                height={55}
                className="h-10 w-auto object-contain"
                style={{ display: 'block' }}
              />
            </div>
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
              Need more than cleaning? We also help with:
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
