import { NextRequest, NextResponse } from 'next/server'
import { validateQuote } from '@/lib/validators/quote'
import type { QuoteFormData } from '@/lib/validators/quote'
import { clients } from '@/lib/clients'
import { sendQuoteNotification } from '@/lib/integrations/resend'
import { saveQuoteToAirtable } from '@/lib/integrations/airtable'
import { saveQuoteToSheets } from '@/lib/integrations/google-sheets'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (body === null) {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const validation = validateQuote(body)
  if (!validation.valid) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
  }

  const data = body as QuoteFormData
  const config = clients[data.clientId as keyof typeof clients]
  if (!config) {
    return NextResponse.json({ success: false, error: 'Unknown client' }, { status: 400 })
  }

  try {
    await Promise.all([
      sendQuoteNotification(data, config),
      saveQuoteToAirtable(data, config),
      saveQuoteToSheets(data, config),
    ])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 })
  }
}
