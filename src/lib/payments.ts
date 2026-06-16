import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import { receiptEmail } from '@/lib/email-templates'
import type { QuestionnaireAnswers, Recommendation } from '@/types'

/** Mark a payment paid and move its application into review. Idempotent.
 *  Sends a receipt email (best-effort) once settled. */
export async function settlePayment(paymentId: string) {
  const payment = await prisma.payment.findUnique({ where: { id: paymentId } })
  if (!payment || payment.status === 'paid') return payment

  const updated = await prisma.$transaction(async (tx) => {
    const p = await tx.payment.update({ where: { id: paymentId }, data: { status: 'paid' } })
    await tx.willApplication.update({ where: { id: p.applicationId }, data: { status: 'in-review' } })
    return p
  })

  try {
    await sendReceipt(updated.applicationId, updated.amountFils, updated.govFeeFils)
  } catch {
    // Receipt is best-effort; never fail settlement on email.
  }
  return updated
}

export async function settleByProviderRef(ref: string) {
  const payment = await prisma.payment.findFirst({ where: { providerRef: ref } })
  if (!payment) return null
  return settlePayment(payment.id)
}

async function sendReceipt(applicationId: string, amountFils: number, govFeeFils: number) {
  const app = await prisma.willApplication.findUnique({
    where: { id: applicationId },
    include: { user: true },
  })
  if (!app) return

  const answers = JSON.parse(app.answers) as QuestionnaireAnswers
  const to = app.user?.email ?? answers.email
  if (!to) return

  const rec = app.recommendation ? (JSON.parse(app.recommendation) as Recommendation) : null
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  await sendEmail({
    ...receiptEmail({ plan: rec?.plan ?? 'UAE Will', amountFils, govFeeFils, appUrl }),
    to,
  })
}
