import { NextRequest, NextResponse } from 'next/server'
import { validateNewsletter } from '@/lib/validators/newsletter'
import type { NewsletterFormData } from '@/lib/validators/newsletter'
import { clients } from '@/lib/clients'
import { sendNewsletterConfirmation } from '@/lib/integrations/resend'
import { saveNewsletterToAirtable } from '@/lib/integrations/airtable'
import { saveNewsletterToSheets } from '@/lib/integrations/google-sheets'
import { log } from '@/lib/helpers/logger'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rawBody = await request.json().catch(() => null)

  if (rawBody === null) {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const validation = validateNewsletter(rawBody)
  if (!validation.valid) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
  }

  const newsletterFormData = rawBody as NewsletterFormData
  const newsletterClientConfig = clients[newsletterFormData.clientId as keyof typeof clients]
  if (!newsletterClientConfig) {
    return NextResponse.json({ success: false, error: 'Unknown client' }, { status: 400 })
  }

  try {
    await Promise.all([
      sendNewsletterConfirmation(newsletterFormData.email),
      saveNewsletterToAirtable(newsletterFormData, newsletterClientConfig),
      saveNewsletterToSheets(newsletterFormData, newsletterClientConfig),
    ])
    return NextResponse.json({ success: true })
  } catch (error) {
    log.error('newsletter_submission_failed', error, { clientId: newsletterFormData.clientId })
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 })
  }
}
