import { NextRequest, NextResponse } from 'next/server'
import { validateNewsletter } from '@/lib/validators/newsletter'
import type { NewsletterFormData } from '@/lib/validators/newsletter'
import { clients } from '@/lib/clients'
import { sendNewsletterConfirmation } from '@/lib/integrations/resend'
import { saveNewsletterToAirtable } from '@/lib/integrations/airtable'
import { saveNewsletterToSheets } from '@/lib/integrations/google-sheets'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (body === null) {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const validation = validateNewsletter(body)
  if (!validation.valid) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
  }

  const data = body as NewsletterFormData
  const config = clients[data.clientId as keyof typeof clients]
  if (!config) {
    return NextResponse.json({ success: false, error: 'Unknown client' }, { status: 400 })
  }

  try {
    await Promise.all([
      sendNewsletterConfirmation(data.email, config),
      saveNewsletterToAirtable(data, config),
      saveNewsletterToSheets(data, config),
    ])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter submission error:', error)
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 })
  }
}
