import { NextRequest, NextResponse } from 'next/server'
import { validateQuote } from '@/lib/validators/quote'
import type { QuoteFormData } from '@/lib/validators/quote'
import { clients } from '@/lib/clients'
import { sendQuoteNotification } from '@/lib/integrations/resend'
import { saveQuoteToAirtable } from '@/lib/integrations/airtable'
import { saveQuoteToSheets } from '@/lib/integrations/google-sheets'
import { log } from '@/lib/helpers/logger'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rawBody = await request.json().catch(() => null)

  if (rawBody === null) {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const validation = validateQuote(rawBody)
  if (!validation.valid) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
  }

  const quoteFormData = rawBody as QuoteFormData
  const quoteClientConfig = clients[quoteFormData.clientId as keyof typeof clients]
  if (!quoteClientConfig) {
    return NextResponse.json({ success: false, error: 'Unknown client' }, { status: 400 })
  }

  try {
    await Promise.all([
      sendQuoteNotification(quoteFormData, quoteClientConfig),
      saveQuoteToAirtable(quoteFormData, quoteClientConfig),
      saveQuoteToSheets(quoteFormData, quoteClientConfig),
    ])
    return NextResponse.json({ success: true })
  } catch (error) {
    log.error('quote_submission_failed', error, { clientId: quoteFormData.clientId })
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 })
  }
}
