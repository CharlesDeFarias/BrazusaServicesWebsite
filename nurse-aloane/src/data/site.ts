/**
 * Central site configuration.
 *
 * 👉 Swap real values here once available. Everything else reads from this file,
 * so you only update contact details in ONE place.
 */
export const site = {
  name: 'Nurse Aloane',
  // Instagram handle (without the @)
  instagram: 'nursealoane',
  instagramUrl: 'https://instagram.com/nursealoane',

  // WhatsApp number in INTERNATIONAL format, digits only (no +, spaces or dashes).
  // Example for a US number: '17815551234'
  whatsappNumber: '19293164737',

  // Optional email for the contact form fallback (mailto). Leave '' to hide.
  email: '',

  location: {
    label: 'Greater Boston, MA',
    city: 'Malden',
    region: 'Greater Boston Area',
  },
} as const

/**
 * Build a wa.me deep link with a pre-filled message.
 * Opens the WhatsApp chat directly on mobile and web.
 */
export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message)
  return `https://wa.me/${site.whatsappNumber}?text=${text}`
}
