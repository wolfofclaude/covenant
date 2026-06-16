import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { recommend } from '@/lib/recommendation'
import { DRAFT_COOKIE } from '@/lib/draft'
import type { QuestionnaireAnswers } from '@/types'

/** Persist the questionnaire answers as a draft will application.
 *  Anonymous for now — tied to an httpOnly cookie until accounts land. */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { answers?: QuestionnaireAnswers } | null
  const answers = body?.answers ?? {}
  const recommendation = recommend(answers)

  const jar = await cookies()
  const existingToken = jar.get(DRAFT_COOKIE)?.value

  const data = {
    answers: JSON.stringify(answers),
    recommendation: JSON.stringify(recommendation),
    jurisdiction: recommendation.jurisdiction,
  }

  if (existingToken) {
    const app = await prisma.willApplication.upsert({
      where: { draftToken: existingToken },
      update: data,
      create: { draftToken: existingToken, ...data },
    })
    return NextResponse.json({ ok: true, id: app.id })
  }

  const token = crypto.randomUUID()
  const app = await prisma.willApplication.create({ data: { draftToken: token, ...data } })
  jar.set(DRAFT_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return NextResponse.json({ ok: true, id: app.id })
}
