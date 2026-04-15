import type { QuoteFormData } from '@/lib/validators/quote'
import type { NewsletterFormData } from '@/lib/validators/newsletter'
import type { ClientConfig } from '@/lib/clients'

const AIRTABLE_API_URL = 'https://api.airtable.com/v0'

async function createRecord(
  baseId: string,
  table: string,
  fields: Record<string, unknown>
): Promise<void> {
  const response = await fetch(
    `${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(table)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Airtable error: ${response.status} ${text}`)
  }
}

export async function saveQuoteToAirtable(
  data: QuoteFormData,
  config: ClientConfig
): Promise<void> {
  await createRecord(config.airtable.baseId, config.airtable.quoteTable, {
    Name: data.name,
    Contact: data.contact,
    'Contact Method': data.contactMethod,
    'Space Type': data.spaceType,
    Rooms: data.rooms ?? '',
    Bathrooms: data.bathrooms ?? '',
    'Clean Level': data.cleanLevel ?? '',
    Frequency: data.frequency ?? '',
    'Focus Areas': data.focusAreas ?? '',
    Notes: data.notes ?? '',
    Outcome: data.outcome,
    Address: data.address ?? '',
    'Preferred Days': data.preferredDays?.join(', ') ?? '',
    'Time of Day': data.timeOfDay ?? '',
    'Submitted At': new Date().toISOString(),
  })
}

export async function saveNewsletterToAirtable(
  data: NewsletterFormData,
  config: ClientConfig
): Promise<void> {
  await createRecord(config.airtable.baseId, config.airtable.newsletterTable, {
    Email: data.email,
    Phone: data.phone ?? '',
    'Subscribed At': new Date().toISOString(),
  })
}
