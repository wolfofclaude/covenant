'use client'

import { useState } from 'react'
import Link from 'next/link'

const field =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-brand-navy outline-none placeholder:text-brand-navy/40 focus:border-brand-navy'

export default function ResetRequestForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    await fetch('/api/auth/reset/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {})
    setBusy(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div>
        <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-tight text-brand-navy">Check your email</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
          If an account exists for <strong>{email}</strong>, we&rsquo;ve sent a link to reset your password. It expires in one hour.
        </p>
        <p className="mt-8 text-center text-[14px] text-gray-500">
          <Link href="/auth/sign-in" className="font-medium text-brand-navy underline underline-offset-2">
            Back to log in
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-tight text-brand-navy">Reset your password</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-gray-500">Enter your email and we&rsquo;ll send a reset link.</p>

      <form onSubmit={submit} className="mt-7 space-y-4">
        <input type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
        <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
          {busy ? 'Sending…' : 'Send reset link'}
        </button>
      </form>

      <p className="mt-8 text-center text-[14px] text-gray-500">
        <Link href="/auth/sign-in" className="font-medium text-brand-navy underline underline-offset-2">
          Back to log in
        </Link>
      </p>
    </div>
  )
}
