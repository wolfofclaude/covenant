import SectionHeader from '@/components/ui/SectionHeader'
import { PLANS, ADDONS } from '@/constants/data'

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white section-padding">
      <div className="container-width">
        <SectionHeader
          eyebrow="Transparent pricing"
          heading="Simple, honest fees"
          subtext="No hidden charges. Court fees are listed separately so you always know exactly what you'll pay."
          align="center"
        />

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-brand-navy text-white border-brand-navy shadow-xl shadow-brand-navy/25 hover:shadow-2xl hover:shadow-brand-navy/30'
                  : 'bg-brand-cream border-gray-100 hover:shadow-lg hover:border-brand-navy/20'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-4 py-1
                                 bg-brand-gold text-white text-[12px] font-semibold rounded-full
                                 animate-[fadeIn_0.4s_ease-out_forwards]">
                  Most popular
                </span>
              )}

              <div className="mb-6">
                <p className={`text-[14px] font-semibold mb-1 ${plan.popular ? 'text-brand-gold' : 'text-brand-muted'}`}>
                  {plan.name}
                </p>
                <p className={`text-[36px] font-bold tracking-tight ${plan.popular ? 'text-white' : 'text-brand-navy'}`}>
                  {plan.price}
                </p>
                <p className={`text-[13px] mt-1 ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                  {plan.note}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8" aria-label={`${plan.name} features`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg
                      aria-hidden="true"
                      className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? 'text-brand-gold' : 'text-emerald-500'}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-[14px] ${plan.popular ? 'text-white/85' : 'text-gray-600'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/start"
                aria-label={`Select ${plan.name} plan`}
                className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-full text-[14px] font-medium
                            transition-all duration-200 hover:scale-105 active:scale-95 ${
                  plan.popular
                    ? 'bg-white text-brand-navy hover:bg-gray-100'
                    : 'bg-brand-navy text-white hover:bg-brand-navy-mid'
                }`}
              >
                Start Your Will
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-brand-cream rounded-2xl p-8 border border-gray-100">
          <h3 className="text-[18px] font-semibold text-brand-navy mb-6">Additional services</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ADDONS.map((a) => (
              <div key={a.name} className="rounded-xl border border-gray-100 bg-white p-5 hover:border-brand-navy/20 hover:shadow-sm transition-all duration-200">
                <p className="text-[13px] text-gray-500 mb-1">{a.name}</p>
                <p className="text-[20px] font-bold text-brand-navy">{a.price}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[12px] text-gray-400 leading-relaxed">
            * Court fees are payable directly to UAE courts and are separate from Covenant fees.
            Standard ADJD registration: AED 950 per will, AED 1,900 for mirror wills. ADGM notarisation: AED 570.
          </p>
        </div>
      </div>
    </section>
  )
}
