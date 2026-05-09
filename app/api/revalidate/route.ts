import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/revalidate?secret=<WEBSITE_REVALIDATION_SECRET>
 *
 * Called by the NGF portal after content is published.
 * getNgfContent() uses cache: 'no-store', so content is always fresh on next request.
 * This endpoint validates the secret and returns 200 to confirm the site is reachable.
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const expected = process.env.WEBSITE_REVALIDATION_SECRET

  if (expected && secret !== expected) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  return NextResponse.json({ revalidated: true })
}
