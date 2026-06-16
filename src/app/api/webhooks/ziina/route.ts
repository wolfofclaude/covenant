import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { settleByProviderRef } from '@/lib/payments'

export const runtime = 'nodejs'

// Ziina webhook. Verifies the HMAC-SHA256 signature (X-Hmac-Signature over the
// raw body) when a secret is configured, then settles the matching payment.
export async function POST(req: Request) {
  const raw = await req.text()

  const secret = process.env.ZIINA_WEBHOOK_SECRET
  if (secret) {
    const sig = req.headers.get('x-hmac-signature') ?? ''
    const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex')
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
    }
  }

  const body = JSON.parse(raw) as { event?: string; data?: { id?: string; status?: string } }
  if (body.event === 'payment_intent.status.updated' && body.data?.status === 'completed' && body.data.id) {
    await settleByProviderRef(body.data.id)
  }

  return NextResponse.json({ ok: true })
}
