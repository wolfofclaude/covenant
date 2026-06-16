'use client'

import { useState } from 'react'
import type { WillDetails } from '@/types'

type Bene = { fullName: string; relationship: string; sharePercent: number }
type Guard = { fullName: string; relationship: string; kind: string }

const field =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[15px] text-brand-navy outline-none placeholder:text-brand-navy/40 focus:border-brand-navy'
const label = 'mb-1.5 block text-[13px] font-medium text-brand-navy'

export default function WillIntakeForm({
  initialDetails,
  initialBeneficiaries,
  initialGuardians,
  showGuardians,
}: {
  initialDetails: WillDetails | null
  initialBeneficiaries: Bene[]
  initialGuardians: Guard[]
  showGuardians: boolean
}) {
  const [testator, setTestator] = useState(
    initialDetails?.testator ?? { fullName: '', nationality: '', passportNumber: '', emiratesId: '', address: '' },
  )
  const [executor, setExecutor] = useState(
    initialDetails?.executor ?? { fullName: '', relationship: '', backupName: '' },
  )
  const [beneficiaries, setBeneficiaries] = useState<Bene[]>(
    initialBeneficiaries.length ? initialBeneficiaries : [{ fullName: '', relationship: '', sharePercent: 100 }],
  )
  const [guardians, setGuardians] = useState<Guard[]>(
    initialGuardians.length ? initialGuardians : [{ fullName: '', relationship: '', kind: 'permanent' }],
  )
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const totalShare = beneficiaries.reduce((s, b) => s + (Number(b.sharePercent) || 0), 0)

  function setBene(i: number, patch: Partial<Bene>) {
    setBeneficiaries((arr) => arr.map((b, j) => (j === i ? { ...b, ...patch } : b)))
  }
  function setGuard(i: number, patch: Partial<Guard>) {
    setGuardians((arr) => arr.map((g, j) => (j === i ? { ...g, ...patch } : g)))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (totalShare !== 100) {
      setError(`Beneficiary shares must add up to 100% (currently ${totalShare}%).`)
      return
    }
    setBusy(true)
    const details: WillDetails = { testator, executor }
    const res = await fetch('/api/will/details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        details,
        beneficiaries,
        guardians: showGuardians ? guardians : [],
      }),
    })
    setBusy(false)
    if (!res.ok) {
      setError('Could not save your details. Please try again.')
      return
    }
    window.location.href = '/checkout'
  }

  return (
    <form onSubmit={submit} className="space-y-10">
      {/* Testator */}
      <section>
        <h2 className="font-serif text-2xl text-brand-navy">About you</h2>
        <p className="mt-1 text-sm text-brand-navy/50">The person making the will (the testator).</p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Full legal name</label>
            <input className={field} required value={testator.fullName} onChange={(e) => setTestator({ ...testator, fullName: e.target.value })} placeholder="As on your passport" />
          </div>
          <div>
            <label className={label}>Nationality</label>
            <input className={field} value={testator.nationality} onChange={(e) => setTestator({ ...testator, nationality: e.target.value })} />
          </div>
          <div>
            <label className={label}>Passport number</label>
            <input className={field} value={testator.passportNumber} onChange={(e) => setTestator({ ...testator, passportNumber: e.target.value })} />
          </div>
          <div>
            <label className={label}>Emirates ID</label>
            <input className={field} value={testator.emiratesId} onChange={(e) => setTestator({ ...testator, emiratesId: e.target.value })} placeholder="784-XXXX-XXXXXXX-X" />
          </div>
          <div>
            <label className={label}>UAE address</label>
            <input className={field} value={testator.address} onChange={(e) => setTestator({ ...testator, address: e.target.value })} />
          </div>
        </div>
      </section>

      {/* Beneficiaries */}
      <section>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-2xl text-brand-navy">Beneficiaries</h2>
            <p className="mt-1 text-sm text-brand-navy/50">Who inherits, and what share of your estate.</p>
          </div>
          <span className={`text-sm font-medium ${totalShare === 100 ? 'text-brand-navy/50' : 'text-red-600'}`}>{totalShare}% allocated</span>
        </div>
        <div className="mt-5 space-y-3">
          {beneficiaries.map((b, i) => (
            <div key={i} className="grid grid-cols-12 items-center gap-3">
              <input className={`${field} col-span-5`} required placeholder="Full name" value={b.fullName} onChange={(e) => setBene(i, { fullName: e.target.value })} />
              <input className={`${field} col-span-4`} placeholder="Relationship" value={b.relationship} onChange={(e) => setBene(i, { relationship: e.target.value })} />
              <input className={`${field} col-span-2`} type="number" min={0} max={100} value={b.sharePercent} onChange={(e) => setBene(i, { sharePercent: Number(e.target.value) })} />
              <button type="button" aria-label="Remove" className="col-span-1 text-brand-navy/40 hover:text-red-600" onClick={() => setBeneficiaries((arr) => arr.filter((_, j) => j !== i))}>×</button>
            </div>
          ))}
        </div>
        <button type="button" className="mt-3 text-sm font-medium text-brand-navy underline underline-offset-2" onClick={() => setBeneficiaries((arr) => [...arr, { fullName: '', relationship: '', sharePercent: 0 }])}>
          + Add beneficiary
        </button>
      </section>

      {/* Guardians */}
      {showGuardians && (
        <section>
          <h2 className="font-serif text-2xl text-brand-navy">Guardians for your children</h2>
          <p className="mt-1 text-sm text-brand-navy/50">Interim guardians act immediately; permanent guardians take over long-term care.</p>
          <div className="mt-5 space-y-3">
            {guardians.map((g, i) => (
              <div key={i} className="grid grid-cols-12 items-center gap-3">
                <input className={`${field} col-span-5`} placeholder="Full name" value={g.fullName} onChange={(e) => setGuard(i, { fullName: e.target.value })} />
                <input className={`${field} col-span-3`} placeholder="Relationship" value={g.relationship} onChange={(e) => setGuard(i, { relationship: e.target.value })} />
                <select className={`${field} col-span-3`} value={g.kind} onChange={(e) => setGuard(i, { kind: e.target.value })}>
                  <option value="permanent">Permanent</option>
                  <option value="interim">Interim</option>
                </select>
                <button type="button" aria-label="Remove" className="col-span-1 text-brand-navy/40 hover:text-red-600" onClick={() => setGuardians((arr) => arr.filter((_, j) => j !== i))}>×</button>
              </div>
            ))}
          </div>
          <button type="button" className="mt-3 text-sm font-medium text-brand-navy underline underline-offset-2" onClick={() => setGuardians((arr) => [...arr, { fullName: '', relationship: '', kind: 'permanent' }])}>
            + Add guardian
          </button>
        </section>
      )}

      {/* Executor */}
      <section>
        <h2 className="font-serif text-2xl text-brand-navy">Executor</h2>
        <p className="mt-1 text-sm text-brand-navy/50">The person who carries out your wishes and administers the estate.</p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Executor full name</label>
            <input className={field} required value={executor.fullName} onChange={(e) => setExecutor({ ...executor, fullName: e.target.value })} />
          </div>
          <div>
            <label className={label}>Relationship</label>
            <input className={field} value={executor.relationship} onChange={(e) => setExecutor({ ...executor, relationship: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Backup executor (optional)</label>
            <input className={field} value={executor.backupName ?? ''} onChange={(e) => setExecutor({ ...executor, backupName: e.target.value })} />
          </div>
        </div>
      </section>

      {error && <p className="text-[14px] text-red-600">{error}</p>}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
          {busy ? 'Saving…' : 'Save and continue'}
        </button>
        <span className="text-sm text-brand-navy/45">Next: review and checkout</span>
      </div>
    </form>
  )
}
