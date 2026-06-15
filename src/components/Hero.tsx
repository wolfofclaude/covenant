import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import { HERO_REASSURANCES } from '@/constants/data'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Unsplash backdrop ── */}
      <Image
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
        alt="Dubai Marina cityscape at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark + brand gradient overlay — left-heavy so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />

      {/* ── Content ── */}
      <div className="relative container-width pt-24 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-xl lg:max-w-2xl">

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20
                          rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-[glow_2s_ease-in-out_infinite]" />
            <span className="text-[13px] font-semibold text-white/90 tracking-wide">
              2,000+ UAE wills created
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[46px] sm:text-[56px] lg:text-[72px] font-bold text-white
                         leading-[1.06] tracking-tight mb-6">
            Make your Will<br />
            <span className="text-white/60">online</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[17px] sm:text-[19px] text-white/75 leading-relaxed mb-10 max-w-[460px]">
            Protect your family, assets and wishes in the UAE and beyond.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a href="/start" className="btn-primary group bg-white !text-brand-navy hover:!bg-white/90 !shadow-xl">
              Start Your Will
              <svg aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#how-it-works"
               className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white
                          font-semibold rounded-full hover:bg-white/20 active:scale-95 transition-all
                          duration-200 text-[15px] border border-white/25 backdrop-blur-sm">
              See how it works
            </a>
          </div>

          {/* Reassurances — light version */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {HERO_REASSURANCES.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[13px] text-white/65">
                <svg aria-hidden="true" className="w-3.5 h-3.5 text-emerald-400 shrink-0"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Floating stat cards — desktop only */}
        <div className="hidden lg:flex flex-col gap-4 absolute right-8 xl:right-16 bottom-24">
          {[
            { label: 'UAE wills created', value: '2,000+' },
            { label: 'Completion time',   value: '10–15 min' },
            { label: 'Starting from',     value: 'AED 799' },
          ].map((stat) => (
            <div key={stat.label}
                 className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-right">
              <p className="text-[22px] font-bold text-white leading-none">{stat.value}</p>
              <p className="text-[12px] text-white/55 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave into white */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 72L480 36L960 54L1440 0V72H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
