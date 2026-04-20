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
      style={{ borderTop: '1px solid var(--color-white-5)' }}
    >
      {/* Newsletter strip */}
      <div
        className="max-w-5xl mx-auto py-8"
        style={{ borderBottom: '1px solid var(--color-white-10)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <div className="flex-shrink-0">
            <p className="text-sm font-medium text-white mb-0.5">For hosts &amp; managers</p>
            <p className="text-xs leading-relaxed text-white-40">
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
              style={{ background: 'var(--color-white-90)', padding: 0, overflow: 'hidden', lineHeight: 0, borderRadius: 0 }}
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
            <p className="text-sm mb-1 text-white-40">
              Greater Boston &amp; surrounding areas
            </p>
            <a
              href="tel:7816867189"
              className="text-sm block mt-1.5 text-white-40 hover:text-white transition-colors"
            >
              781-686-7189
            </a>
            <a
              href="mailto:info@brazusa.com"
              className="text-sm block mt-1 text-white-40 hover:text-white transition-colors"
            >
              info@brazusa.com
            </a>
          </div>

          <div>
            <p
              className="text-xs uppercase mb-5 text-white-20"
              style={{
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
                    className="text-sm text-white-40 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className="text-xs pt-6 text-white-20"
          style={{
            borderTop: '1px solid var(--color-white-5)',
          }}
        >
          © {new Date().getFullYear()} Brazusa Cleaning. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
