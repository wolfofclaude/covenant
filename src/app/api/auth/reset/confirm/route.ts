import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

// Complete a password reset: validate the token, set the new password hash.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: string; token?: string; password?: string }
    | null

  const email = body?.email?.toLowerCase().trim()
  const token = body?.token
  const password = body?.password ?? ''

  if (!email || !token) return NextResponse.json({ error: 'Invalid reset link.' }, { status: 400 })
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
  }

  const vt = await prisma.verificationToken.findUnique({
    where: { identifier_token: { identifier: email, token } },
  })
  if (!vt || vt.expires < new Date()) {
    return NextResponse.json({ error: 'This reset link is invalid or has expired.' }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.$transaction([
    prisma.user.update({ where: { email }, data: { passwordHash } }),
    prisma.verificationToken.deleteMany({ where: { identifier: email } }),
  ])

  return NextResponse.json({ ok: true })
}
