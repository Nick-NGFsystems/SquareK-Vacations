import { Resend } from 'resend'

/**
 * Email helper for SquareK-Vacations.
 *
 * Sends notification emails via Resend when site forms are submitted.
 *
 * Required env vars:
 *   RESEND_API_KEY        - Resend API key (Vercel env)
 *   EMAIL_FROM            - Verified sender, e.g. "Square K Vacations <bookings@squarekvacations.com>"
 *   NOTIFY_EMAILS         - Default recipient list, comma-separated (fallback for all forms)
 *   BOOKING_NOTIFY_EMAILS - Optional override for booking requests
 *   CONTACT_NOTIFY_EMAILS - Optional override for general inquiries
 *
 * To send to MULTIPLE recipients, just comma-separate them, e.g.
 *   NOTIFY_EMAILS="tyler@squarekvacations.com, bookings@squarekvacations.com, nick@ngfsystems.com"
 */

let _resend: Resend | null = null
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!_resend) _resend = new Resend(key)
  return _resend
}

/** Split a comma-separated env value into a clean list of email addresses. */
function parseRecipients(value: string | undefined): string[] {
  if (!value) return []
  return value
    .split(',')
    .map(e => e.trim())
    .filter(Boolean)
}

/**
 * Resolve the recipient list for a given form, preferring the form-specific
 * env var and falling back to the shared NOTIFY_EMAILS.
 */
export function getRecipients(specificEnv?: string): string[] {
  const specific = parseRecipients(specificEnv)
  if (specific.length > 0) return specific
  return parseRecipients(process.env.NOTIFY_EMAILS)
}

const FROM = () =>
  process.env.EMAIL_FROM || 'Square K Vacations <onboarding@resend.dev>'

export interface EmailField {
  label: string
  value: string
}

/** Build a clean, email-client-safe HTML body from a title + field rows. */
export function renderEmailHtml(opts: {
  heading: string
  intro?: string
  fields: EmailField[]
}): string {
  const { heading, intro, fields } = opts
  const rows = fields
    .filter(f => f.value && f.value.trim() !== '')
    .map(
      f => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #ece7df;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#9b8060;white-space:nowrap;vertical-align:top;">${escapeHtml(
          f.label,
        )}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #ece7df;font-size:15px;color:#2b2b2b;">${escapeHtml(
          f.value,
        ).replace(/\n/g, '<br>')}</td>
      </tr>`,
    )
    .join('')

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f6f3ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f3ee;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ece7df;">
            <tr>
              <td style="background:#9b8060;padding:20px 24px;">
                <div style="font-size:18px;font-weight:700;color:#ffffff;">Square K Vacations</div>
                <div style="font-size:13px;color:#f0e9df;margin-top:2px;">${escapeHtml(
                  heading,
                )}</div>
              </td>
            </tr>
            ${
              intro
                ? `<tr><td style="padding:20px 24px 0;font-size:15px;color:#2b2b2b;line-height:1.5;">${escapeHtml(
                    intro,
                  )}</td></tr>`
                : ''
            }
            <tr>
              <td style="padding:16px 8px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px 24px;font-size:12px;color:#9b9489;line-height:1.5;">
                This message was sent from the contact form on squarekvacations.com. Reply directly to respond to the guest.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export interface SendResult {
  ok: boolean
  error?: string
}

/** Send a notification email. Returns ok:false with a reason rather than throwing. */
export async function sendNotificationEmail(opts: {
  to: string[]
  subject: string
  html: string
  replyTo?: string
}): Promise<SendResult> {
  const { to, subject, html, replyTo } = opts

  if (to.length === 0) {
    return { ok: false, error: 'No recipient emails configured' }
  }

  const resend = getResend()
  if (!resend) {
    return { ok: false, error: 'RESEND_API_KEY not configured' }
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM(),
      to,
      subject,
      html,
      replyTo,
    })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Send failed' }
  }
}
