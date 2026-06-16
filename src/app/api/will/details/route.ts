import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentApplication } from '@/lib/application'
import type { WillDetails } from '@/types'

type Body = {
  details?: WillDetails
  beneficiaries?: { fullName: string; relationship: string; sharePercent: number }[]
  guardians?: { fullName: string; relationship: string; kind: string }[]
}

export async function POST(req: Request) {
  const app = await getCurrentApplication()
  if (!app) return NextResponse.json({ error: 'No will application found.' }, { status: 404 })

  const body = (await req.json().catch(() => null)) as Body | null
  if (!body?.details) return NextResponse.json({ error: 'Missing details.' }, { status: 400 })

  const beneficiaries = (body.beneficiaries ?? []).filter((b) => b.fullName?.trim())
  const guardians = (body.guardians ?? []).filter((g) => g.fullName?.trim())

  // Replace the relational rows and store testator/executor as JSON in one go.
  await prisma.$transaction([
    prisma.beneficiary.deleteMany({ where: { applicationId: app.id } }),
    prisma.guardian.deleteMany({ where: { applicationId: app.id } }),
    prisma.willApplication.update({
      where: { id: app.id },
      data: {
        details: JSON.stringify(body.details),
        beneficiaries: {
          create: beneficiaries.map((b) => ({
            fullName: b.fullName.trim(),
            relationship: b.relationship?.trim() || 'Beneficiary',
            sharePercent: Math.max(0, Math.min(100, Math.round(Number(b.sharePercent) || 0))),
          })),
        },
        guardians: {
          create: guardians.map((g) => ({
            fullName: g.fullName.trim(),
            relationship: g.relationship?.trim() || 'Guardian',
            kind: g.kind === 'interim' ? 'interim' : 'permanent',
          })),
        },
      },
    }),
  ])

  return NextResponse.json({ ok: true })
}
