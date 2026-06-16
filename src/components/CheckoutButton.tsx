'use client'

import { useState } from 'react'

export default function CheckoutButton() {
  const [busy, setBusy] = useState(false)

  async function pay() {
    setBusy(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json().catch(() => ({}))
      // Ziina returns a hosted-checkout URL; demo mode returns { demo: true }.
      window.location.href = data.redirect_url ?? '/dashboard'
    } catch {
      setBusy(false)
    }
  }

  return (
    <button type="button" onClick={pay} disabled={busy} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
      {busy ? 'Processing…' : 'Pay with Ziina'}
    </button>
  )
}
