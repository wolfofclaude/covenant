import Badge from '@/components/ui/Badge'
import { FINAL_CTA_REASSURANCES } from '@/constants/data'

export default function FinalCTA() {
  return (
    <section className="bg-white section-padding">
      <div className="container-width">
        <div className="bg-gradient-to-br from-brand-cream to-[#E8E4DC] rounded-3xl px-8 py-16 lg:py-20 text-center border border-gray-100">

          <p className="text-[13px] font-semibold text-brand-gold tracking-widest uppercase mb-4">
            Get started today
          </p>

          <h2 className="text-[38px] lg:text-[52px] font-bold text-brand-navy leading-tight mb-5 max-w-2xl mx-auto">
            Protect your family in the UAE and beyond
          </h2>

          <p className="text-[17px] text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
            Join 2,000+ expat families who&apos;ve already secured their futures with Covenant.
            Start your will online in 10–15 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a href="/start" className="btn-primary group">
              Start Your Will
              <svg aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contact" className="btn-secondary">
              Schedule a call
            </a>
          </div>

          <div className="flex justify-center">
            <Badge items={FINAL_CTA_REASSURANCES} />
          </div>
        </div>
      </div>
    </section>
  )
}
