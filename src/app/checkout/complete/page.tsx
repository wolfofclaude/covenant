import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getPaymentIntent } from '@/lib/ziina'
import { settlePayment } from '@/lib/payments'

export const dynamic = 'force-dynamic'

export default async function CheckoutCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>
}) {
  const { intent } = await searchParams
  if (!intent) redirect('/dashboard')

  const payment = await prisma.payment.findFirst({ where: { providerRef: intent } })

  if (payment && payment.status !== 'paid') {
    // Verify with Ziina directly (don't trust the redirect alone).
    try {
      const pi = await getPaymentIntent(intent)
      if (pi.status === 'completed') await settlePayment(payment.id)
    } catch {
      // fall through to the pending screen
    }
  }

  const fresh = payment ? await prisma.payment.findUnique({ where: { id: payment.id } }) : null
  if (fresh?.status === 'paid') redirect('/dashboard')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-cream px-6 text-center">
      <h1 className="font-serif text-3xl text-brand-navy">Payment still processing</h1>
      <p className="mt-3 max-w-md text-brand-navy/60">
        We haven&rsquo;t received confirmation from Ziina yet. This can take a moment — your dashboard
        updates automatically once it&rsquo;s confirmed.
      </p>
      <Link href="/dashboard" className="btn-primary mt-8">
        Go to dashboard
      </Link>
    </main>
  )
}
