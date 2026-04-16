import { Resend } from 'resend'
import type { QuoteFormData } from '@/lib/validators/quote'
import type { ClientConfig } from '@/lib/clients'

function getClient() {
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM_ADDRESS = 'Brazusa Cleaning <hello@brazusa.com>'

export async function sendQuoteNotification(
  data: QuoteFormData,
  config: ClientConfig
): Promise<void> {
  const resend = getClient()
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: config.notificationEmail,
    subject: `New quote request — ${data.name}`,
    text: formatQuoteEmail(data),
  })
}

export async function sendNewsletterConfirmation(
  email: string,
  _config: ClientConfig
): Promise<void> {
  const resend = getClient()
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "You're on our list",
    text: "Thanks for subscribing. We'll be in touch with cleaning tips and updates.",
  })
}

function formatQuoteEmail(data: QuoteFormData): string {
  const lines: string[] = [
    `Name: ${data.name}`,
    `Contact: ${data.contact} (prefers ${data.contactMethod})`,
    `Space type: ${data.spaceType}`,
    `Outcome requested: ${data.outcome}`,
    '',
  ]

  if (data.rooms || data.bathrooms || data.cleanLevel || data.frequency || data.focusAreas) {
    lines.push('Details:')
    if (data.rooms)       lines.push(`  Rooms: ${data.rooms}`)
    if (data.bathrooms)   lines.push(`  Bathrooms: ${data.bathrooms}`)
    if (data.cleanLevel)  lines.push(`  Clean level: ${data.cleanLevel}`)
    if (data.frequency)   lines.push(`  Frequency: ${data.frequency}`)
    if (data.focusAreas)  lines.push(`  Focus areas: ${data.focusAreas}`)
    lines.push('')
  }

  if (data.notes) {
    lines.push('Notes:')
    lines.push(`  ${data.notes}`)
    lines.push('')
  }

  if (data.outcome === 'schedule') {
    lines.push('Scheduling:')
    if (data.address)               lines.push(`  Address: ${data.address}`)
    if (data.preferredDays?.length) lines.push(`  Preferred days: ${data.preferredDays.join(', ')}`)
    if (data.timeOfDay)             lines.push(`  Time of day: ${data.timeOfDay}`)
  }

  return lines.join('\n')
}
