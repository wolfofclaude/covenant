import type { AddOn, QuestionnaireAnswers, Recommendation } from '@/types'

/* ────────────────────────────────────────────────────────────
   Recommendation engine
   Pure, dependency-free rules that turn the /start questionnaire
   answers into a concrete product recommendation. This is the
   single source of truth for the closing screen and (later) the
   pre-filled checkout. No I/O, no framework — easy to unit test.

   MVP scope: ADJD is the default registration avenue (fully online,
   valid in all 7 emirates, lowest government fee). DIFC is layered
   in for cases it serves better (notably crypto via the Digital
   Assets Will), once that path ships in Phase 2.
   ──────────────────────────────────────────────────────────── */

/** A couple is recommended mirror wills rather than two separate single wills. */
function isCouple(answers: QuestionnaireAnswers): boolean {
  return answers.marital === 'Married'
}

export function recommend(answers: QuestionnaireAnswers): Recommendation {
  const reasons: string[] = []
  const addOns: AddOn[] = []

  // Base: every UAE resident benefits from a registered UAE will. ADJD is the MVP avenue.
  const jurisdiction = 'ADJD' as const
  const couple = isCouple(answers)
  const plan = couple ? 'Mirror Wills' : 'UAE Will'

  reasons.push(
    'A registered UAE will is the foundation — without one, your UAE estate may be distributed under default UAE personal status rules rather than your wishes.',
  )

  if (couple) {
    addOns.push('mirror-will')
    reasons.push('As a married couple, mirror wills let you each protect the other and register together.')
  }

  if (answers.children === 'Yes') {
    addOns.push('guardianship')
    reasons.push(
      'With children, your will is the only way to name interim and permanent guardians — critical for expats without family in the UAE.',
    )
  }

  if (answers.abroad === 'Yes') {
    addOns.push('home-country-will')
    reasons.push(
      'Because you hold assets outside the UAE, a coordinated home-country will avoids conflicts between jurisdictions during probate.',
    )
  }

  if (answers.uaeProperty === 'Yes') {
    reasons.push('Your UAE property is covered by the registered will so it passes the way you intend.')
  }

  const closing = buildClosing(answers, addOns)

  return { jurisdiction, plan, addOns, reasons, closing }
}

/** Personalised closing line for the conversational flow. Mirrors the tone of "Layla". */
function buildClosing(answers: QuestionnaireAnswers, addOns: AddOn[]): string {
  const name = answers.name?.trim()
  const greeting = name ? `Thanks, ${name}.` : 'Thanks.'

  const extras: string[] = []
  if (addOns.includes('home-country-will')) extras.push('a coordinated home-country will for your assets abroad')
  if (addOns.includes('guardianship')) extras.push('guardianship for your children')

  const tail =
    extras.length > 0
      ? `, and ${extras.length === 2 ? `${extras[0]} and ${extras[1]}` : extras[0]} ${
          extras.length === 2 ? 'are' : 'is'
        } worth adding`
      : ''

  return `${greeting} Based on what you've shared, a registered UAE will is the right foundation${tail}. We've saved your answers — continue to see your full recommendation.`
}
