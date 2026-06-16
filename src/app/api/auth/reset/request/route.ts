import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import { resetEmail } from '@/lib/email-templates'

// Request a password reset. Always returns ok (never reveals whether an account
// exists). When the email matches a password account, emails a one-hour link.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string } | null
  const email = body?.email?.toLowerCase().trim()
  if (!email) return NextResponse.json({ ok: true })

  const user = await prisma.user.findUnique({ where: { email } })
  if (user?.passwordHash) {
    const token = crypto.randomUUID()
    const expires = new Date(Date.now() + 60 * 60 * 1000)
    // Clear any prior tokens for this email, then issue a fresh one.
    await prisma.verificationToken.deleteMany({ where: { identifier: email } })
    await prisma.verificationToken.create({ data: { identifier: email, token, expires } })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const link = `${appUrl}/auth/reset/confirm?email=${encodeURIComponent(email)}&token=${token}`
    try {
      await sendEmail({ ...resetEmail(link), to: email })
    } catch {
      // best-effort
    }
  }

  return NextResponse.json({ ok: true })
}
