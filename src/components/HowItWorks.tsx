'use client'

import { useState, useEffect, useCallback } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { STEPS } from '@/constants/data'

export default function HowItWorks() {
  const [active, setActive] = useState(0)

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      setActive((s) => Math.min(s + 1, STEPS.length - 1))
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      setActive((s) => Math.max(s - 1, 0))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <section id="how-it-works" className="bg-brand-cream section-padding">
      <div className="container-width">
        <SectionHeader
          eyebrow="The process"
          heading="How it works"
          subtext="We've made estate planning straightforward — from questionnaire to registered will in a matter of days."
        />

        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">

          {/* Step selector — tab list */}
          <ol role="tablist" aria-label="How it works steps" className="lg:col-span-5 space-y-2 mb-10 lg:mb-0 list-none">
            {STEPS.map((step, i) => (
              <li key={step.number}>
                <button
                  role="tab"
                  id={`step-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls={`step-panel-${i}`}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-start gap-5 px-6 py-5 rounded-2xl transition-all duration-200 ${
                    active === i
                      ? 'bg-brand-navy text-white shadow-lg shadow-brand-navy/20'
                      : 'bg-white hover:bg-white/80 text-brand-navy border border-gray-100'
                  }`}
                >
                  <span className={`text-[22px] font-bold tabular-nums leading-none pt-0.5 shrink-0 ${
                    active === i ? 'text-brand-gold' : 'text-brand-gold/50'
                  }`}>
                    {step.number}
                  </span>
                  <span className={`text-[15px] font-semibold leading-snug ${active === i ? 'text-white' : 'text-brand-navy'}`}>
                    {step.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* Detail panel — tab panel */}
          <div
            role="tabpanel"
            id={`step-panel-${active}`}
            aria-labelledby={`step-tab-${active}`}
            aria-live="polite"
            className="lg:col-span-7"
          >
            <div
              key={active}
              className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-sm min-h-[280px] animate-[scaleIn_0.25s_ease-out_forwards]"
            >
              <p className="text-[80px] font-bold text-brand-gold/25 leading-none mb-4 -mt-4 select-none">
                {STEPS[active].number}
              </p>
              <h3 className="text-[26px] lg:text-[30px] font-bold text-brand-navy mb-4 leading-tight">
                {STEPS[active].title}
              </h3>
              <p className="text-[17px] text-gray-500 leading-relaxed">
                {STEPS[active].body}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <a href="/start" className="btn-primary group">
                  Start Your Will
                  <svg aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <span className="text-[13px] text-gray-400">Takes 10–15 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
