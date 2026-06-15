export default function FounderQuote() {
  return (
    <section className="bg-brand-navy section-padding">
      <div className="container-width">
        <div className="max-w-3xl mx-auto text-center">

          <svg
            aria-hidden="true"
            className="w-12 h-12 text-brand-gold/50 mx-auto mb-8"
            fill="currentColor" viewBox="0 0 32 32"
          >
            <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.172A5.172 5.172 0 0112 8h-2zm16 0c-3.314 0-6 2.686-6 6v10h10V14h-6.828A5.172 5.172 0 0128 8h-2z" />
          </svg>

          <blockquote className="text-[22px] lg:text-[28px] font-semibold text-white leading-snug mb-8">
            We started Covenant because we saw expat families in the UAE making a life here without the
            legal protection they deserve. Writing a will shouldn&apos;t be complicated or expensive.
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy font-bold text-[18px] shrink-0">
              C
            </div>
            <div className="text-left">
              <p className="text-[15px] font-semibold text-white">Covenant Founders</p>
              <p className="text-[13px] text-white/50">Dubai, UAE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
