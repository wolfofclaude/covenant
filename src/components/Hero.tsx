import Image from 'next/image'

const HEADLINE_LINES = ['Make your', 'will online.'] as const
const SUBTEXT = 'Protect your family, assets and wishes in the UAE and beyond.'
const TRUST_LABEL = 'ADJD & DIFC court registration'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand-navy">
      {/* ── Background family photo ── */}
      <Image
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
        alt="Dubai Marina cityscape at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* ── Legibility overlays ── */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        aria-hidden="true"
      />

      {/* ── Content (lower-left) ── */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pt-32 pb-24 sm:pb-32 lg:px-10 lg:pb-40">
        <div className="max-w-2xl text-white">
          {/* Headline */}
          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {HEADLINE_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p className="mt-5 max-w-md text-base text-white/85 sm:text-lg">{SUBTEXT}</p>

          {/* CTA row */}
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <a
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-brand-navy transition hover:bg-white/90"
            >
              Start Your Will
            </a>
            <a
              href="#how-it-works"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-white transition hover:text-white/80"
            >
              See how it works
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-white/80">
            <span className="inline-flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="h-4 w-4 text-white/90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {TRUST_LABEL}
            </span>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 font-medium text-white/80 transition hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4 text-white/90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3l7 3v5c0 4.418-2.985 8.166-7 9-4.015-.834-7-4.582-7-9V6l7-3z"
                />
              </svg>
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
