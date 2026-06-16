// Types backing the SEO structured data (see components/StructuredData.tsx).

export interface Plan {
  name: string
  price: string
  note: string
  popular: boolean
  features: string[]
}

export interface Testimonial {
  quote: string
  name: string
  detail: string
}

export interface FAQ {
  question: string
  answer: string
}

/* ────────────────────────────────────────────────────────────
   Product domain model (Phase 1)
   These back the will application flow, not the marketing site.
   ──────────────────────────────────────────────────────────── */

/** Answers collected by the conversational intake at /start.
 *  Keys mirror the `FLOW` step ids in src/app/start/page.tsx. */
export interface QuestionnaireAnswers {
  marital?: 'Married' | 'Single' | 'Divorced' | 'Widowed'
  children?: 'Yes' | 'No'
  uaeProperty?: 'Yes' | 'No'
  abroad?: 'Yes' | 'No'
  name?: string
  email?: string
}

/** UAE registration avenues we support. ADJD is the MVP (fully online). */
export type WillJurisdiction = 'ADJD' | 'DIFC'

/** Optional products layered on top of the core UAE will. */
export type AddOn = 'mirror-will' | 'home-country-will' | 'power-of-attorney' | 'guardianship' | 'digital-assets-will'

/** Output of the recommendation engine — drives the closing screen and pricing. */
export interface Recommendation {
  jurisdiction: WillJurisdiction
  /** Suggested base plan name, matching one of PLANS in src/constants/data.ts. */
  plan: string
  addOns: AddOn[]
  /** Human-readable, ordered rationale shown to the user. */
  reasons: string[]
  /** Personalised closing message for the /start flow. */
  closing: string
}

export interface TestatorDetails {
  fullName: string
  nationality: string
  passportNumber: string
  emiratesId: string
  address: string
}

export interface ExecutorDetails {
  fullName: string
  relationship: string
  backupName?: string
}

/** Extended intake stored as JSON on WillApplication.details. */
export interface WillDetails {
  testator: TestatorDetails
  executor: ExecutorDetails
}

export type WillStatus =
  | 'draft'
  | 'submitted'
  | 'in-review'
  | 'drafted'
  | 'translated'
  | 'awaiting-notary'
  | 'registered'
  | 'delivered'

export interface Beneficiary {
  id: string
  fullName: string
  relationship: string
  /** Share of estate as a percentage (0–100). */
  sharePercent: number
}

export interface Guardian {
  id: string
  fullName: string
  relationship: string
  /** Interim guardians act immediately; permanent guardians take over long-term. */
  kind: 'interim' | 'permanent'
}

export interface WillDocument {
  id: string
  applicationId: string
  kind: 'will-draft' | 'arabic-translation' | 'registration-certificate'
  /** Storage key/URL in the encrypted vault (never a raw public URL). */
  storageKey: string
  createdAt: string
}

export interface Payment {
  id: string
  applicationId: string
  /** Amount in fils (AED * 100) to avoid float rounding. */
  amountFils: number
  currency: 'AED'
  /** Government registration fee, passed through at cost and shown separately. */
  govFeeFils: number
  status: 'pending' | 'paid' | 'refunded'
  stripePaymentIntentId?: string
}

export interface WillApplication {
  id: string
  userId: string
  jurisdiction: WillJurisdiction
  status: WillStatus
  answers: QuestionnaireAnswers
  recommendation?: Recommendation
  beneficiaries: Beneficiary[]
  guardians: Guardian[]
  createdAt: string
  updatedAt: string
}
