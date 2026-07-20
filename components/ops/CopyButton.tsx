'use client'

import { useState } from 'react'

/** Copies WhatsApp-ready text to the clipboard. Client component (needs navigator). */
export function CopyButton({
  text,
  label = 'Copy for WhatsApp',
  size = 'md',
}: {
  text: string
  label?: string
  size?: 'sm' | 'md'
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback for older mobile browsers without the async clipboard API
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const pad = size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'
  return (
    <button
      onClick={copy}
      className={`${pad} border-l-2 font-medium tracking-[0.04em] transition-all duration-200 ${
        copied
          ? 'border-white bg-brand-gold text-navy'
          : 'border-brand-gold bg-white-10 text-white hover:bg-brand-gold hover:text-navy'
      }`}
    >
      {copied ? '✓ Copied' : label}
    </button>
  )
}
