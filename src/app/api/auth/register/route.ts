import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import { welcomeEmail } from '@/lib/email-templates'

// Create an email/password account. Sign-in itself happens via the Credentials
// provider after this succeeds (see the sign-up form).
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { name?: string; email?: string; password?: string }
    | null

  const name = body?.name?.trim() || null
  const email = body?.email?.toLowerCase().trim()
  const password = body?.password ?? ''

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.user.create({ data: { email, name, passwordHash } })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  try {
    await sendEmail({ ...welcomeEmail(name, appUrl), to: email })
  } catch {
    // Welcome email is best-effort; never block sign-up on it.
  }

  return NextResponse.json({ ok: true })
}
