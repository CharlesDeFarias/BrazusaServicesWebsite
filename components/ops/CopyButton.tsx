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

  const pad = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
  return (
    <button
      onClick={copy}
      className={`${pad} rounded-md border transition-colors ${
        copied
          ? 'border-emerald-600 bg-emerald-950/40 text-emerald-300'
          : 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:border-neutral-500'
      }`}
    >
      {copied ? '✓ Copied' : label}
    </button>
  )
}
