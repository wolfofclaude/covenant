// Minimal Ziina Payments API client (raw REST — Ziina has no official SDK).
// Docs: https://docs.ziina.com/api-reference/payment-intent
const BASE = 'https://api-v2.ziina.com/api'

export const ziinaConfigured = !!process.env.ZIINA_API_KEY

export type ZiinaStatus =
  | 'requires_payment_instrument'
  | 'requires_user_action'
  | 'pending'
  | 'completed'
  | 'failed'
  | 'canceled'

export interface ZiinaPaymentIntent {
  id: string
  amount: number
  currency_code: string
  status: ZiinaStatus
  redirect_url: string
  latest_error: unknown
}

function authHeaders() {
  return {
    Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

/** Create a hosted-checkout payment intent. `amountFils` is the total in fils (AED * 100). */
export async function createPaymentIntent(opts: {
  amountFils: number
  message: string
  successUrl: string
  cancelUrl: string
  failureUrl: string
}): Promise<ZiinaPaymentIntent> {
  const res = await fetch(`${BASE}/payment_intent`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      amount: opts.amountFils,
      currency_code: 'AED',
      message: opts.message,
      success_url: opts.successUrl,
      cancel_url: opts.cancelUrl,
      failure_url: opts.failureUrl,
      // Test mode outside production so no real card is charged during the demo.
      test: process.env.NODE_ENV !== 'production',
    }),
  })
  if (!res.ok) throw new Error(`Ziina create failed: ${res.status} ${await res.text()}`)
  return res.json()
}

export async function getPaymentIntent(id: string): Promise<ZiinaPaymentIntent> {
  const res = await fetch(`${BASE}/payment_intent/${id}`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Ziina get failed: ${res.status}`)
  return res.json()
}
