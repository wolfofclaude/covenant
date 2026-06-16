import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import type { QuestionnaireAnswers, Recommendation, WillDetails } from '@/types'

export const dynamic = 'force-dynamic'

// NOTE: demo gate — any signed-in user can act as ops staff. Production must
// restrict this to a "draftsman"/"admin" role.
const STATUSES = [
  'draft',
  'submitted',
  'in-review',
  'drafted',
  'translated',
  'awaiting-notary',
  'registered',
  'delivered',
] as const

async function advanceStatus(formData: FormData) {
  'use server'
  const id = String(formData.get('id'))
  const status = String(formData.get('status'))
  if (id && (STATUSES as readonly string[]).includes(status)) {
    await prisma.willApplication.update({ where: { id }, data: { status } })
    revalidatePath('/ops')
  }
}

export default async function OpsPage() {
  const session = await auth()
  if (!session?.user) redirect('/auth/sign-in')

  const apps = await prisma.willApplication.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { payments: true },
  })

  return (
    <main className="min-h-screen bg-brand-cream">
      <header className="border-b border-black/5">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-serif text-2xl font-semibold text-brand-navy">
            covenant <span className="text-brand-navy/40">ops</span>
          </Link>
          <span className="text-xs text-brand-navy/50">{apps.length} application(s)</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
          Internal case console (demo). Any signed-in user can edit here — restrict to staff roles before launch.
        </p>

        <div className="overflow-x-auto rounded-brand border border-black/5 bg-white">
          <table className="w-full text-left text-[14px]">
            <thead className="border-b border-black/5 text-xs uppercase tracking-wide text-brand-navy/45">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Paid</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => {
                const answers = JSON.parse(a.answers) as QuestionnaireAnswers
                const rec = a.recommendation ? (JSON.parse(a.recommendation) as Recommendation) : null
                const details = a.details ? (JSON.parse(a.details) as WillDetails) : null
                const name = details?.testator.fullName || answers.name || '—'
                const paid = a.payments.some((p) => p.status === 'paid')
                return (
                  <tr key={a.id} className="border-b border-black/5 last:border-0">
                    <td className="px-4 py-3 text-brand-navy">{name}</td>
                    <td className="px-4 py-3 text-brand-navy/70">{rec?.plan ?? '—'}</td>
                    <td className="px-4 py-3">{paid ? '✓' : '—'}</td>
                    <td className="px-4 py-3">
                      <form action={advanceStatus} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={a.id} />
                        <select name="status" defaultValue={a.status} className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-[13px]">
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <button type="submit" className="rounded-lg bg-brand-navy px-3 py-1.5 text-[13px] font-medium text-white">
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
