import { describe, it, expect } from 'vitest'
import { whatsappLink } from '@/lib/nurse-aloane/helpers/whatsapp-link'
import { site } from '@/lib/nurse-aloane/site'

describe('whatsappLink', () => {
  it('targets the configured wa.me number', () => {
    expect(whatsappLink('hi')).toContain(`https://wa.me/${site.whatsappNumber}?text=`)
  })

  it('url-encodes the message text, including spaces and newlines', () => {
    const link = whatsappLink('Hi Aloane!\nBotox?')
    expect(link).toContain('text=Hi%20Aloane!%0ABotox%3F')
    // Raw spaces and newlines must never appear in the final link.
    expect(link).not.toMatch(/text=.*[ \n]/)
  })
})
