import { NextRequest, NextResponse } from 'next/server'
import {
  getRecipients,
  renderEmailHtml,
  sendNotificationEmail,
} from '@/lib/email'
import { relayLeadToNgf } from '@/lib/ngf-lead'

/**
 * POST /api/contact
 * Receives a general inquiry and emails the configured recipients.
 */
export async function POST(req: NextRequest) {
  let data: Record<string, string>
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Honeypot (NGF standard: non-semantic `_gotcha`). Real visitors never see the
  // field, so anything in it is a bot. Same success reply a person gets, so it
  // can't tell it was caught; nothing is saved or sent.
  const gotcha = data._gotcha
  if (typeof gotcha === 'string' && gotcha.trim() !== '') {
    console.warn('contact submission filtered: honeypot')
    return NextResponse.json({ ok: true })
  }

  const firstName = (data.firstName || '').trim()
  const lastName = (data.lastName || '').trim()
  const email = (data.email || '').trim()
  const phone = (data.phone || '').trim()
  const property = (data.property || '').trim()
  const message = (data.message || '').trim()

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const fullName = `${firstName} ${lastName}`
  const subject = property
    ? `New Inquiry — ${property} (${fullName})`
    : `New Inquiry — Square K Vacations (${fullName})`

  const html = renderEmailHtml({
    heading: 'New General Inquiry',
    intro: `${fullName} sent a message through the contact form.`,
    fields: [
      { label: 'Name', value: fullName },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone },
      { label: 'Property', value: property },
      { label: 'Message', value: message },
    ],
  })

  // Persist FIRST to the central NGF lead store (system of record) so the
  // enquiry survives an email failure and appears in the client's portal.
  const { spam } = await relayLeadToNgf('contact', data)

  // The NGF store screened it as a sales pitch or a bot: it's saved there (Spam
  // in the portal, one click back to New) and NGF sent no email, so neither do
  // we. A failed relay is never spam, so the email still goes.
  if (spam) {
    console.info('contact screened as spam by NGF: saved, not emailed')
    return NextResponse.json({ ok: true })
  }

  const result = await sendNotificationEmail({
    to: getRecipients(process.env.CONTACT_NOTIFY_EMAILS),
    subject,
    html,
    replyTo: email,
  })

  if (!result.ok) {
    console.error('contact email failed:', result.error)
    return NextResponse.json({ error: 'Could not send message' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
