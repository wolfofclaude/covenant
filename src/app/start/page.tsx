'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────────────
interface Child   { name: string; dob: string }
interface Bene    { name: string; relationship: string; percentage: string }
interface ChatMsg { role: 'user' | 'assistant'; content: string }

interface FormData {
  // Step 1
  firstName: string; lastName: string; email: string; phone: string
  dob: string; nationality: string; visaType: string; emirate: string
  // Step 2
  maritalStatus: string; spouseName: string; spouseNationality: string
  marriageDate: string; children: Child[]; dependentsDetails: string
  // Step 3
  hasUaeProperty: boolean; uaePropertyDetails: string
  uaeBanks: string; hasUaeInvestments: boolean; uaeInvestmentDetails: string
  hasUaeBusiness: boolean; uaeBusinessDetails: string
  hasVehicles: boolean; vehicleDetails: string
  // Step 4
  homeCountry: string; hasAbroadProperty: boolean; abroadPropertyDetails: string
  hasAbroadBank: boolean; abroadBankDetails: string
  // Step 5
  beneficiaries: Bene[]; guardianName: string; guardianRelationship: string
  executorName: string; executorRelationship: string
  specificBequests: string; funeralWishes: string
}

const DEFAULT_FORM: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  dob: '', nationality: '', visaType: '', emirate: '',
  maritalStatus: '', spouseName: '', spouseNationality: '',
  marriageDate: '', children: [], dependentsDetails: '',
  hasUaeProperty: false, uaePropertyDetails: '',
  uaeBanks: '', hasUaeInvestments: false, uaeInvestmentDetails: '',
  hasUaeBusiness: false, uaeBusinessDetails: '',
  hasVehicles: false, vehicleDetails: '',
  homeCountry: '', hasAbroadProperty: false, abroadPropertyDetails: '',
  hasAbroadBank: false, abroadBankDetails: '',
  beneficiaries: [{ name: '', relationship: '', percentage: '100' }],
  guardianName: '', guardianRelationship: '',
  executorName: '', executorRelationship: '',
  specificBequests: '', funeralWishes: '',
}

const STEPS = [
  { label: 'About you' },
  { label: 'Your family' },
  { label: 'UAE assets' },
  { label: 'Assets abroad' },
  { label: 'Your wishes' },
  { label: 'Review' },
]

const EMIRATES   = ['Abu Dhabi','Dubai','Sharjah','Ajman','Umm Al Quwain','Ras Al Khaimah','Fujairah']
const VISA_TYPES = ['Employment/Work','Investor/Business','Family Residence','Golden Visa','Retirement','Other']
const BANKS_UAE  = ['Emirates NBD','First Abu Dhabi Bank (FAB)','Abu Dhabi Commercial Bank (ADCB)','Dubai Islamic Bank','Mashreq','RAKBank','HSBC UAE','Citibank UAE','Standard Chartered UAE','Other']

// ── Small shared components ────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[14px] font-semibold text-brand-navy mb-1.5">
      {children}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )
}

function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-brand-navy text-[15px]
                  placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-navy/30 focus:border-brand-navy
                  transition-colors ${className}`}
      {...props}
    />
  )
}

function Select({ className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-brand-navy text-[15px]
                  focus:outline-none focus:ring-2 focus:ring-brand-navy/30 focus:border-brand-navy
                  transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

function Textarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={3}
      className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-brand-navy text-[15px]
                  placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-navy/30 focus:border-brand-navy
                  transition-colors resize-none ${className}`}
      {...props}
    />
  )
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none
                    focus:ring-2 focus:ring-brand-navy/30 ${checked ? 'bg-brand-navy' : 'bg-gray-200'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`} />
      </button>
      <span className="text-[15px] text-gray-700">{label}</span>
    </label>
  )
}

// ── Form Steps ─────────────────────────────────────────────────────────────
function Step1({ form, set }: { form: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>First name</Label>
          <Input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="e.g. James" />
        </div>
        <div>
          <Label required>Last name</Label>
          <Input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="e.g. Wilson" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Email address</Label>
          <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="james@example.com" />
        </div>
        <div>
          <Label required>Phone (UAE)</Label>
          <Input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+971 50 000 0000" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Date of birth</Label>
          <Input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
        </div>
        <div>
          <Label required>Nationality</Label>
          <Input value={form.nationality} onChange={e => set('nationality', e.target.value)} placeholder="e.g. British" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>UAE visa / residency type</Label>
          <Select value={form.visaType} onChange={e => set('visaType', e.target.value)}>
            <option value="">Select…</option>
            {VISA_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
          </Select>
        </div>
        <div>
          <Label required>Emirate of residence</Label>
          <Select value={form.emirate} onChange={e => set('emirate', e.target.value)}>
            <option value="">Select…</option>
            {EMIRATES.map(e => <option key={e} value={e}>{e}</option>)}
          </Select>
        </div>
      </div>
    </div>
  )
}

function Step2({ form, set }: { form: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  const addChild    = () => set('children', [...form.children, { name: '', dob: '' }])
  const removeChild = (i: number) => set('children', form.children.filter((_, idx) => idx !== i))
  const setChild    = (i: number, field: keyof Child, val: string) =>
    set('children', form.children.map((c, idx) => idx === i ? { ...c, [field]: val } : c))

  return (
    <div className="space-y-5">
      <div>
        <Label required>Marital status</Label>
        <div className="flex flex-wrap gap-2 mt-1">
          {['Single','Married','Divorced','Widowed'].map(s => (
            <button
              key={s} type="button"
              onClick={() => set('maritalStatus', s)}
              className={`px-4 py-2 rounded-full text-[14px] font-semibold border transition-colors ${
                form.maritalStatus === s
                  ? 'bg-brand-navy text-white border-brand-navy'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand-navy/40'
              }`}
            >{s}</button>
          ))}
        </div>
      </div>

      {form.maritalStatus === 'Married' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-brand-cream border border-gray-100">
          <div>
            <Label>Spouse full name</Label>
            <Input value={form.spouseName} onChange={e => set('spouseName', e.target.value)} placeholder="e.g. Sarah Wilson" />
          </div>
          <div>
            <Label>Spouse nationality</Label>
            <Input value={form.spouseNationality} onChange={e => set('spouseNationality', e.target.value)} placeholder="e.g. Australian" />
          </div>
          <div>
            <Label>Date of marriage</Label>
            <Input type="date" value={form.marriageDate} onChange={e => set('marriageDate', e.target.value)} />
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Children</Label>
          <button type="button" onClick={addChild}
                  className="text-[13px] font-semibold text-brand-navy hover:text-brand-navy-mid flex items-center gap-1">
            <span>+</span> Add child
          </button>
        </div>
        {form.children.length === 0 && (
          <p className="text-[14px] text-gray-400 italic">No children added — click &quot;Add child&quot; if you have any.</p>
        )}
        <div className="space-y-3">
          {form.children.map((c, i) => (
            <div key={i} className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end p-3 rounded-xl bg-brand-cream border border-gray-100">
              <div>
                <Label>Name</Label>
                <Input value={c.name} onChange={e => setChild(i, 'name', e.target.value)} placeholder="Full name" />
              </div>
              <div>
                <Label>Date of birth</Label>
                <Input type="date" value={c.dob} onChange={e => setChild(i, 'dob', e.target.value)} />
              </div>
              <button type="button" onClick={() => removeChild(i)}
                      className="pb-1 text-gray-400 hover:text-red-400 transition-colors text-lg leading-none self-end">×</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Other dependents</Label>
        <Textarea value={form.dependentsDetails} onChange={e => set('dependentsDetails', e.target.value)}
                  placeholder="e.g. elderly parent you support financially (optional)" />
      </div>
    </div>
  )
}

function Step3({ form, set }: { form: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Toggle checked={form.hasUaeProperty} onChange={v => set('hasUaeProperty', v)} label="I own property in the UAE" />
        {form.hasUaeProperty && (
          <div>
            <Label>Property details</Label>
            <Textarea value={form.uaePropertyDetails} onChange={e => set('uaePropertyDetails', e.target.value)}
                      placeholder="e.g. 2BR apartment in Dubai Marina, owned outright, approx. value AED 1.4M" />
          </div>
        )}
      </div>

      <div>
        <Label>UAE bank accounts</Label>
        <div className="flex flex-wrap gap-2 mt-1">
          {BANKS_UAE.map(b => {
            const active = form.uaeBanks.split(',').map(s => s.trim()).includes(b)
            return (
              <button
                key={b} type="button"
                onClick={() => {
                  const current = form.uaeBanks ? form.uaeBanks.split(',').map(s => s.trim()).filter(Boolean) : []
                  const updated = active ? current.filter(x => x !== b) : [...current, b]
                  set('uaeBanks', updated.join(', '))
                }}
                className={`px-3 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${
                  active ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-navy/40'
                }`}
              >{b}</button>
            )
          })}
        </div>
      </div>

      <div className="space-y-3">
        <Toggle checked={form.hasUaeInvestments} onChange={v => set('hasUaeInvestments', v)} label="I have UAE investments / stocks / funds" />
        {form.hasUaeInvestments && (
          <div>
            <Label>Investment details</Label>
            <Textarea value={form.uaeInvestmentDetails} onChange={e => set('uaeInvestmentDetails', e.target.value)}
                      placeholder="e.g. portfolio at Saxo Bank UAE, DFM stocks, crypto holdings" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Toggle checked={form.hasUaeBusiness} onChange={v => set('hasUaeBusiness', v)} label="I have a UAE business interest or partnership" />
        {form.hasUaeBusiness && (
          <div>
            <Label>Business details</Label>
            <Textarea value={form.uaeBusinessDetails} onChange={e => set('uaeBusinessDetails', e.target.value)}
                      placeholder="e.g. 50% shareholder in XYZ Trading LLC, Dubai Mainland" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Toggle checked={form.hasVehicles} onChange={v => set('hasVehicles', v)} label="I own vehicles registered in the UAE" />
        {form.hasVehicles && (
          <div>
            <Label>Vehicle details</Label>
            <Input value={form.vehicleDetails} onChange={e => set('vehicleDetails', e.target.value)}
                   placeholder="e.g. 2022 Toyota Camry, plate P 12345 Dubai" />
          </div>
        )}
      </div>
    </div>
  )
}

function Step4({ form, set }: { form: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Home country</Label>
        <Input value={form.homeCountry} onChange={e => set('homeCountry', e.target.value)}
               placeholder="e.g. United Kingdom, India, Pakistan…" />
        <p className="text-[12px] text-gray-400 mt-1">Home-country wills currently available for UK and India.</p>
      </div>

      <div className="space-y-3">
        <Toggle checked={form.hasAbroadProperty} onChange={v => set('hasAbroadProperty', v)} label="I own property in my home country" />
        {form.hasAbroadProperty && (
          <div>
            <Label>Property details</Label>
            <Textarea value={form.abroadPropertyDetails} onChange={e => set('abroadPropertyDetails', e.target.value)}
                      placeholder="e.g. semi-detached home in Manchester, joint ownership with spouse, approx. £420,000" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Toggle checked={form.hasAbroadBank} onChange={v => set('hasAbroadBank', v)} label="I have bank accounts outside the UAE" />
        {form.hasAbroadBank && (
          <div>
            <Label>Bank account details</Label>
            <Textarea value={form.abroadBankDetails} onChange={e => set('abroadBankDetails', e.target.value)}
                      placeholder="e.g. Barclays UK current & savings accounts, HDFC India NRI account" />
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
        <p className="text-[13px] text-blue-700 font-semibold mb-1">Good to know</p>
        <p className="text-[13px] text-blue-600 leading-relaxed">
          If you have assets in both the UAE and abroad, we recommend a combined plan — UAE will + home-country will.
          This prevents conflicts between jurisdictions and ensures your wishes are followed everywhere.
        </p>
      </div>
    </div>
  )
}

function Step5({ form, set }: { form: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  const addBene    = () => set('beneficiaries', [...form.beneficiaries, { name: '', relationship: '', percentage: '0' }])
  const removeBene = (i: number) => set('beneficiaries', form.beneficiaries.filter((_, idx) => idx !== i))
  const setBene    = (i: number, field: keyof Bene, val: string) =>
    set('beneficiaries', form.beneficiaries.map((b, idx) => idx === i ? { ...b, [field]: val } : b))

  const totalPct = form.beneficiaries.reduce((s, b) => s + (parseFloat(b.percentage) || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label required>Beneficiaries</Label>
          <button type="button" onClick={addBene}
                  className="text-[13px] font-semibold text-brand-navy hover:text-brand-navy-mid flex items-center gap-1">
            <span>+</span> Add beneficiary
          </button>
        </div>
        <div className="space-y-3">
          {form.beneficiaries.map((b, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_80px_auto] gap-3 items-end p-3 rounded-xl bg-brand-cream border border-gray-100">
              <div>
                <Label>Full name</Label>
                <Input value={b.name} onChange={e => setBene(i, 'name', e.target.value)} placeholder="e.g. Sarah Wilson" />
              </div>
              <div>
                <Label>Relationship</Label>
                <Input value={b.relationship} onChange={e => setBene(i, 'relationship', e.target.value)} placeholder="e.g. Spouse" />
              </div>
              <div>
                <Label>Share %</Label>
                <Input type="number" min="0" max="100" value={b.percentage}
                       onChange={e => setBene(i, 'percentage', e.target.value)} placeholder="100" />
              </div>
              {form.beneficiaries.length > 1 && (
                <button type="button" onClick={() => removeBene(i)}
                        className="pb-1 text-gray-400 hover:text-red-400 transition-colors text-lg self-end">×</button>
              )}
            </div>
          ))}
        </div>
        <div className={`mt-2 text-[13px] font-semibold ${totalPct === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
          Total: {totalPct}% {totalPct !== 100 && '— must equal 100%'}
        </div>
      </div>

      {form.children.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Guardian for your children</Label>
            <Input value={form.guardianName} onChange={e => set('guardianName', e.target.value)}
                   placeholder="Guardian's full name" />
          </div>
          <div>
            <Label>Guardian relationship</Label>
            <Input value={form.guardianRelationship} onChange={e => set('guardianRelationship', e.target.value)}
                   placeholder="e.g. Brother, Close friend" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Executor of your will</Label>
          <Input value={form.executorName} onChange={e => set('executorName', e.target.value)}
                 placeholder="Who you trust to administer your estate" />
        </div>
        <div>
          <Label>Executor relationship</Label>
          <Input value={form.executorRelationship} onChange={e => set('executorRelationship', e.target.value)}
                 placeholder="e.g. Spouse, Sibling, Solicitor" />
        </div>
      </div>

      <div>
        <Label>Specific bequests (optional)</Label>
        <Textarea value={form.specificBequests} onChange={e => set('specificBequests', e.target.value)}
                  placeholder="e.g. My watch collection to my brother David; my car to my nephew James" />
      </div>

      <div>
        <Label>Funeral or religious wishes (optional)</Label>
        <Textarea value={form.funeralWishes} onChange={e => set('funeralWishes', e.target.value)}
                  placeholder="e.g. Islamic burial, repatriation to UK, cremation — any preferences" />
      </div>
    </div>
  )
}

function Step6({ form }: { form: FormData }) {
  const sections = [
    {
      title: 'About you',
      rows: [
        ['Name',        `${form.firstName} ${form.lastName}`.trim() || '—'],
        ['Email',       form.email || '—'],
        ['Nationality', form.nationality || '—'],
        ['Residence',   form.emirate ? `${form.emirate}, UAE` : '—'],
        ['Visa type',   form.visaType || '—'],
      ],
    },
    {
      title: 'Family',
      rows: [
        ['Marital status', form.maritalStatus || '—'],
        ['Spouse',         form.spouseName || 'N/A'],
        ['Children',       form.children.length ? form.children.map(c => c.name).join(', ') : 'None'],
      ],
    },
    {
      title: 'UAE assets',
      rows: [
        ['Property',    form.hasUaeProperty ? 'Yes' : 'No'],
        ['Banks',       form.uaeBanks || 'None listed'],
        ['Investments', form.hasUaeInvestments ? 'Yes' : 'No'],
        ['Business',    form.hasUaeBusiness ? 'Yes' : 'No'],
      ],
    },
    {
      title: 'Assets abroad',
      rows: [
        ['Home country',     form.homeCountry || '—'],
        ['Property abroad',  form.hasAbroadProperty ? 'Yes' : 'No'],
        ['Bank abroad',      form.hasAbroadBank ? 'Yes' : 'No'],
      ],
    },
    {
      title: 'Wishes',
      rows: [
        ['Beneficiaries', form.beneficiaries.map(b => `${b.name} (${b.percentage}%)`).join(' · ') || '—'],
        ['Guardian',      form.guardianName || 'N/A'],
        ['Executor',      form.executorName || '—'],
      ],
    },
  ]

  const needsHomeCwill = form.hasAbroadProperty || form.hasAbroadBank
  const needsPoa       = form.maritalStatus === 'Married'

  return (
    <div className="space-y-6">
      {/* Recommended products */}
      <div className="rounded-2xl border border-brand-navy/20 bg-brand-navy/[0.03] p-5">
        <p className="text-[13px] font-semibold text-brand-gold tracking-wider uppercase mb-3">Recommended for you</p>
        <div className="space-y-2">
          <RecommendedItem title="UAE Will" price="AED 799" always />
          {needsHomeCwill && <RecommendedItem title="Home-country Will" price="from AED 499" />}
          {needsPoa       && <RecommendedItem title="Power of Attorney" price="AED 499" />}
          <RecommendedItem title="Vault & Document Storage" price="Included" />
        </div>
        <p className="text-[12px] text-gray-400 mt-3">+ UAE court registration fee (AED 950 per will). Paid directly to the court.</p>
      </div>

      {/* Summary */}
      {sections.map(s => (
        <div key={s.title}>
          <p className="text-[13px] font-semibold text-brand-muted uppercase tracking-widest mb-2">{s.title}</p>
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            {s.rows.map(([k, v], i) => (
              <div key={k} className={`flex justify-between gap-4 px-4 py-2.5 text-[14px] ${i % 2 === 0 ? 'bg-white' : 'bg-brand-cream/50'}`}>
                <span className="text-gray-500 shrink-0">{k}</span>
                <span className="text-brand-navy font-medium text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="btn-primary w-full justify-center text-[16px] py-4"
      >
        Submit and proceed to payment
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>

      <p className="text-[12px] text-gray-400 text-center">
        By submitting you agree to our <a href="/terms" className="underline">Terms of Service</a> and{' '}
        <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>
    </div>
  )
}

function RecommendedItem({ title, price, always }: { title: string; price: string; always?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <svg aria-hidden="true" className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-[14px] font-semibold text-brand-navy">{title}</span>
        {always && <span className="text-[11px] text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full font-semibold">Required</span>}
      </div>
      <span className="text-[14px] font-bold text-brand-navy">{price}</span>
    </div>
  )
}

// ── AI Assistant ───────────────────────────────────────────────────────────
function AIAssistant({ step, stepLabel, formSummary }: { step: number; stepLabel: string; formSummary: string }) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: 'assistant',
      content: `Hi! I'm your Covenant AI assistant. I can help answer any questions as you fill out Step ${step}: "${stepLabel}". What would you like to know?`,
    },
  ])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Reset intro message when step changes
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: `You're now on Step ${step}: "${stepLabel}". Ask me anything about this step or the will process in general.`,
    }])
  }, [step, stepLabel])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const newMessages: ChatMsg[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/will-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          step,
          stepLabel,
          formSummary,
        }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message ?? 'Sorry, something went wrong.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I\'m having trouble connecting right now. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, step, stepLabel, formSummary])

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-brand-navy border-b border-brand-navy/80">
        <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy font-bold text-[13px] shrink-0">
          AI
        </div>
        <div>
          <p className="text-[14px] font-bold text-white leading-tight">Covenant Assistant</p>
          <p className="text-[11px] text-white/50">Powered by AI · Ask me anything</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] text-white/50">Online</span>
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
              m.role === 'user'
                ? 'bg-brand-navy text-white rounded-br-sm'
                : 'bg-brand-cream text-brand-navy rounded-bl-sm border border-gray-100'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-brand-cream border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
              {[0,1,2].map(i => (
                <span key={i} className="w-1.5 h-1.5 bg-brand-muted rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {['What documents do I need?', 'Explain court fees', 'Who should be my executor?'].map(p => (
          <button
            key={p}
            type="button"
            onClick={() => { setInput(p); }}
            className="shrink-0 text-[12px] text-brand-navy bg-brand-cream border border-gray-200
                       rounded-full px-3 py-1.5 hover:border-brand-navy/40 transition-colors whitespace-nowrap"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Ask a question…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-[14px] text-brand-navy
                       placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-navy/30
                       focus:border-brand-navy transition-colors"
          />
          <button
            type="button"
            onClick={send}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center
                       hover:bg-brand-navy-mid disabled:opacity-40 transition-all active:scale-95 shrink-0"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function StartPage() {
  const [step, setStep]       = useState(0)
  const [form, setForm]       = useState<FormData>(DEFAULT_FORM)
  const [showAI, setShowAI]   = useState(false)
  const topRef                = useRef<HTMLDivElement>(null)

  const set = useCallback((k: keyof FormData, v: unknown) => {
    setForm(prev => ({ ...prev, [k]: v }))
  }, [])

  const nextStep = () => {
    setStep(s => Math.min(s + 1, STEPS.length - 1))
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }
  const prevStep = () => {
    setStep(s => Math.max(s - 1, 0))
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const formSummary = `
Name: ${form.firstName} ${form.lastName}
Nationality: ${form.nationality} | Emirate: ${form.emirate}
Marital status: ${form.maritalStatus}
Children: ${form.children.length}
UAE property: ${form.hasUaeProperty ? 'Yes' : 'No'}
Home country: ${form.homeCountry || 'Not specified'}
  `.trim()

  const stepComponents = [
    <Step1 key={0} form={form} set={set} />,
    <Step2 key={1} form={form} set={set} />,
    <Step3 key={2} form={form} set={set} />,
    <Step4 key={3} form={form} set={set} />,
    <Step5 key={4} form={form} set={set} />,
    <Step6 key={5} form={form} />,
  ]

  return (
    <div className="min-h-screen bg-brand-cream">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/" className="text-[20px] font-bold text-brand-navy tracking-tight">covenant</Link>

          {/* Mobile AI toggle */}
          <button
            type="button"
            onClick={() => setShowAI(v => !v)}
            className="lg:hidden flex items-center gap-2 text-[13px] font-semibold text-brand-navy
                       bg-brand-navy/5 border border-brand-navy/10 rounded-full px-3 py-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {showAI ? 'Hide AI' : 'Ask AI'}
          </button>

          <a href="/auth/sign-in" className="hidden sm:block text-[14px] text-gray-500 hover:text-brand-navy">
            Save & continue later
          </a>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-brand-navy transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </header>

      <div ref={topRef} />

      {/* ── Mobile AI drawer ── */}
      {showAI && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm"
             onClick={() => setShowAI(false)}>
          <div className="h-[70vh] bg-white rounded-t-3xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <p className="font-bold text-brand-navy">AI Assistant</p>
              <button type="button" onClick={() => setShowAI(false)}
                      className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="flex-1 min-h-0">
              <AIAssistant step={step + 1} stepLabel={STEPS[step].label} formSummary={formSummary} />
            </div>
          </div>
        </div>
      )}

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-10 xl:gap-14 items-start">

          {/* ── Left: Form ── */}
          <div>
            {/* Step pills — scrollable on mobile */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-semibold
                              transition-all border ${
                    i === step
                      ? 'bg-brand-navy text-white border-brand-navy'
                      : i < step
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-pointer hover:bg-emerald-100'
                        : 'bg-white text-gray-400 border-gray-100 cursor-default'
                  }`}
                >
                  {i < step ? (
                    <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-[11px]">{i + 1}</span>
                  )}
                  {s.label}
                </button>
              ))}
            </div>

            {/* Step card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8
                            animate-[scaleIn_0.2s_ease-out_forwards]" key={step}>
              <div className="mb-6">
                <p className="text-[12px] font-semibold text-brand-gold tracking-widest uppercase mb-1">
                  Step {step + 1} of {STEPS.length}
                </p>
                <h1 className="text-[24px] sm:text-[28px] font-bold text-brand-navy">
                  {STEPS[step].label}
                </h1>
              </div>

              <form onSubmit={e => { e.preventDefault(); if (step < STEPS.length - 1) nextStep() }}>
                {stepComponents[step]}

                {/* Nav buttons */}
                {step < STEPS.length - 1 && (
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={prevStep}
                      className={`flex items-center gap-2 text-[14px] font-semibold text-gray-500
                                  hover:text-brand-navy transition-colors ${step === 0 ? 'invisible' : ''}`}
                    >
                      <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <button type="submit" className="btn-primary">
                      Continue
                      <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 justify-center">
              {['256-bit encrypted','UAE court-registered','Reviewed by legal team'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-[12px] text-gray-400">
                  <svg aria-hidden="true" className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: AI Assistant (desktop) ── */}
          <div className="hidden lg:flex flex-col sticky top-[80px] h-[calc(100vh-120px)]">
            <AIAssistant step={step + 1} stepLabel={STEPS[step].label} formSummary={formSummary} />
          </div>
        </div>
      </div>
    </div>
  )
}
