/**
 * Nurse Aloane — central site configuration.
 *
 * 👉 Swap real values here once available. Everything reads from this file,
 * so contact details only change in ONE place.
 */
export const site = {
  name: 'Nurse Aloane',
  instagram: 'nursealoane',
  instagramUrl: 'https://instagram.com/nursealoane',

  // WhatsApp number in INTERNATIONAL format, digits only (no +, spaces, dashes).
  // Example for a US number: '17815551234'
  whatsappNumber: '19293164737',

  email: '',

  location: {
    label: 'Greater Boston, MA',
    city: 'Malden',
    region: 'Greater Boston Area',
  },
} as const
