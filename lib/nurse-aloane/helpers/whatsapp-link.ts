import { site } from '@/lib/nurse-aloane/site'

/**
 * Build a wa.me deep link with a pre-filled message.
 * Opens the WhatsApp chat directly on mobile and web.
 */
export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message)
  return `https://wa.me/${site.whatsappNumber}?text=${text}`
}
