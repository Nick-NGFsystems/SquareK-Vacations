import { NextRequest, NextResponse } from 'next/server'
import {
  getRecipients,
  renderEmailHtml,
  sendNotificationEmail,
} from '@/lib/email'
import { relayLeadToNgf } from '@/lib/ngf-lead'

/**
 * POST /api/booking-request
 * Receives a property booking request and emails the configured recipients.
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
    console.warn('booking-request submission filtered: honeypot')
    return NextResponse.json({ ok: true })
  }

  const firstName = (data.firstName || '').trim()
  const lastName = (data.lastName || '').trim()
  const email = (data.email || '').trim()
  const phone = (data.phone || '').trim()
  const checkIn = (data.checkIn || '').trim()
  const checkOut = (data.checkOut || '').trim()
  const guests = (data.guests || '').trim()
  const message = (data.message || '').trim()
  const propertyName = (data.propertyName || '').trim()

  // Minimal validation
  if (!firstName || !lastName || !email || !phone || !guests) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const fullName = `${firstName} ${lastName}`
  const subject = `New Booking Request — ${propertyName || 'Square K Vacations'} (${fullName})`

  const html = renderEmailHtml({
    heading: 'New Booking Request',
    intro: `${fullName} has requested a stay${propertyName ? ` at ${propertyName}` : ''}.`,
    fields: [
      { label: 'Property', value: propertyName },
      { label: 'Name', value: fullName },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone },
      { label: 'Check-In', value: checkIn },
      { label: 'Check-Out', value: checkOut },
      { label: 'Guests', value: guests },
      { label: 'Message', value: message },
    ],
  })

  // Persist FIRST to the central NGF lead store (system of record).
  const { spam } = await relayLeadToNgf('booking-request', data)

  // The NGF store screened it as a sales pitch or a bot: it's saved there (Spam
  // in the portal, one click back to New) and NGF sent no email, so neither do
  // we. A failed relay is never spam, so the email still goes.
  if (spam) {
    console.info('booking-request screened as spam by NGF: saved, not emailed')
    return NextResponse.json({ ok: true })
  }

  const result = await sendNotificationEmail({
    to: getRecipients(process.env.BOOKING_NOTIFY_EMAILS),
    subject,
    html,
    replyTo: email,
  })

  if (!result.ok) {
    console.error('booking-request email failed:', result.error)
    return NextResponse.json({ error: 'Could not send request' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
