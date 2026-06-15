'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { FAQS } from '@/constants/data'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faqs" className="bg-white section-padding">
      <div className="container-width">
        <SectionHeader
          eyebrow="Common questions"
          heading="Frequently asked questions"
          subtext="Everything you need to know about estate planning in the UAE."
        />

        <div className="max-w-3xl space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen ? 'border-brand-navy/20 bg-brand-cream' : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                  className="w-full text-left flex items-center justify-between px-6 py-5 gap-4"
                >
                  <span className="text-[15px] font-semibold text-brand-navy leading-snug">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center
                                transition-all duration-300 ${isOpen ? 'bg-brand-navy border-brand-navy rotate-45' : 'bg-white'}`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-colors ${isOpen ? 'text-white' : 'text-gray-500'}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-[15px] text-gray-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex items-center gap-4 text-[14px] text-gray-500">
          <span>Still have questions?</span>
          <a href="#contact" className="font-medium text-brand-navy hover:underline underline-offset-4">
            Talk to our team →
          </a>
        </div>
      </div>
    </section>
  )
}
