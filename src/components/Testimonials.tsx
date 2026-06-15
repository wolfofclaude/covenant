'use client'

import SectionHeader from '@/components/ui/SectionHeader'
import { useCarousel } from '@/hooks/useCarousel'
import { TESTIMONIALS } from '@/constants/data'

const VISIBLE = 3

const avatarGradients = [
  'from-brand-navy to-brand-navy-mid',
  'from-brand-navy-mid to-brand-navy-light',
  'from-[#1a4a7a] to-brand-navy',
  'from-brand-navy to-[#0d1f3c]',
  'from-[#1e3a6e] to-[#2a5298]',
  'from-brand-navy-light to-brand-navy',
  'from-[#14264A] to-[#1e3a6e]',
  'from-[#0d1f3c] to-[#1e3a6e]',
]

export default function Testimonials() {
  const { start, prev, next, goTo, canPrev, canNext } = useCarousel(TESTIMONIALS.length, VISIBLE)
  const visible = TESTIMONIALS.slice(start, start + VISIBLE)

  return (
    <section id="testimonials" className="bg-brand-cream section-padding overflow-hidden">
      <div className="container-width">

        {/* Header + nav */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Client stories"
            heading="What our clients say"
          />

          <div className="flex items-center gap-3 shrink-0 pb-14">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous testimonials"
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-brand-navy
                         hover:bg-brand-navy hover:text-white hover:border-brand-navy
                         disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Next testimonials"
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-brand-navy
                         hover:bg-brand-navy hover:text-white hover:border-brand-navy
                         disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Testimonials ${start + 1} to ${Math.min(start + VISIBLE, TESTIMONIALS.length)} of ${TESTIMONIALS.length}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {visible.map((t, i) => (
            <article
              key={`${t.name}-${start + i}`}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col gap-5
                         animate-[scaleIn_0.2s_ease-out_forwards]"
            >
              {/* Stars */}
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} aria-hidden="true" className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[15px] text-gray-600 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <footer className="flex items-center gap-3 pt-1 border-t border-gray-50">
                <div
                  aria-hidden="true"
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                    avatarGradients[(start + i) % avatarGradients.length]
                  } flex items-center justify-center text-white text-[13px] font-bold shrink-0`}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-brand-navy">{t.name}</p>
                  <p className="text-[12px] text-gray-400">{t.detail}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8" aria-label="Testimonial navigation">
          {Array.from({ length: TESTIMONIALS.length - VISIBLE + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial group ${i + 1}`}
              aria-current={i === start ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === start ? 'w-6 bg-brand-navy' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
