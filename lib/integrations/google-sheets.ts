import { google } from 'googleapis'
import type { QuoteFormData } from '@/lib/validators/quote'
import type { NewsletterFormData } from '@/lib/validators/newsletter'
import type { ClientConfig } from '@/lib/clients'

function getAuth() {
  const keyJson = Buffer.from(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY!,
    'base64'
  ).toString('utf-8')
  const credentials = JSON.parse(keyJson)

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

async function appendRow(
  spreadsheetId: string,
  sheet: string,
  values: (string | null)[]
): Promise<void> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheet}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  })
}

export async function saveQuoteToSheets(
  data: QuoteFormData,
  config: ClientConfig
): Promise<void> {
  await appendRow(config.googleSheets.spreadsheetId, config.googleSheets.quoteSheet, [
    data.name,
    data.contact,
    data.contactMethod,
    data.spaceType,
    data.rooms ?? '',
    data.bathrooms ?? '',
    data.cleanLevel ?? '',
    data.frequency ?? '',
    data.focusAreas ?? '',
    data.notes ?? '',
    data.outcome,
    data.address ?? '',
    data.preferredDays?.join(', ') ?? '',
    data.timeOfDay ?? '',
    new Date().toISOString(),
  ])
}

export async function saveNewsletterToSheets(
  data: NewsletterFormData,
  config: ClientConfig
): Promise<void> {
  await appendRow(config.googleSheets.spreadsheetId, config.googleSheets.newsletterSheet, [
    data.email,
    data.phone ?? '',
    new Date().toISOString(),
  ])
}
