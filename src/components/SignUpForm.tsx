'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const socialBtn =
  'inline-flex w-full items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 text-[15px] font-medium text-brand-navy transition hover:bg-brand-cream-dark/40'

const field =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-brand-navy outline-none placeholder:text-brand-navy/40 focus:border-brand-navy'

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

export default function SignUpForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Could not create your account.')
        setBusy(false)
        return
      }
      // Account created — sign in immediately, which also claims the draft.
      const signin = await signIn('credentials', { email, password, redirect: false })
      if (signin?.error) {
        setError('Account created, but sign-in failed. Try logging in.')
        setBusy(false)
        return
      }
      window.location.href = '/dashboard'
    } catch {
      setError('Something went wrong. Please try again.')
      setBusy(false)
    }
  }

  return (
    <div>
      <h1 className="font-serif text-[34px] font-semibold leading-tight tracking-tight text-brand-navy">
        Create your account
      </h1>
      <p className="mt-2 text-[15px] text-gray-500">Save your will and pick up on any device.</p>

      <div className="mt-8 space-y-3">
        <button
          type="button"
          className={socialBtn}
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </div>

      <div className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-black/10" />
        <span className="text-[12px] uppercase tracking-wider text-gray-400">or</span>
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium text-brand-navy">
            Name
          </label>
          <input id="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-brand-navy">
            Email
          </label>
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={field} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-brand-navy">
            Password
          </label>
          <input id="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className={field} />
        </div>

        {error && <p className="text-[13px] text-red-600">{error}</p>}

        <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
          {busy ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-8 text-center text-[14px] text-gray-500">
        Already have an account?{' '}
        <Link href="/auth/sign-in" className="font-medium text-brand-navy underline underline-offset-2 hover:text-brand-navy-mid">
          Log in
        </Link>
      </p>
    </div>
  )
}
