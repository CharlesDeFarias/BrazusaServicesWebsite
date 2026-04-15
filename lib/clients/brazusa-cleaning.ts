export const brazusaCleaningConfig = {
  clientId: 'brazusa-cleaning' as const,
  notificationEmail: process.env.BRAZUSA_CLEANING_NOTIFICATION_EMAIL!,
  airtable: {
    baseId: process.env.BRAZUSA_CLEANING_AIRTABLE_BASE_ID!,
    quoteTable: 'Quote Requests',
    newsletterTable: 'Newsletter',
  },
  googleSheets: {
    spreadsheetId: process.env.BRAZUSA_CLEANING_SHEET_ID!,
    quoteSheet: 'Quote Requests',
    newsletterSheet: 'Newsletter',
  },
}
