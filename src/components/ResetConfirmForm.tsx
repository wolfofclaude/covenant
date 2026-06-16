'use client'

import { useState } from 'react'
import Link from 'next/link'

const field =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-brand-navy outline-none placeholder:text-brand-navy/40 focus:border-brand-navy'

export default function ResetConfirmForm({ email, token }: { email: string; token: string }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const res = await fetch('/api/auth/reset/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token, password }),
    })
    setBusy(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Could not reset your password.')
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div>
        <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-tight text-brand-navy">Password updated</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-500">You can now log in with your new password.</p>
        <Link href="/auth/sign-in" className="btn-primary mt-7 inline-block">
          Log in
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-tight text-brand-navy">Set a new password</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-gray-500">Choose a new password for {email}.</p>

      <form onSubmit={submit} className="mt-7 space-y-4">
        <input type="password" required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
        {error && <p className="text-[13px] text-red-600">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
          {busy ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </div>
  )
}
