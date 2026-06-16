import Image from 'next/image'

const CTA = {
  heading: 'Ready to get started?',
  subtext: 'Protect your family, your assets and your wishes — in the UAE and beyond.',
  primary: { label: 'Start Your Will', href: '/start' },
  image: {
    src: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=1920&q=80',
    alt: 'A happy family',
  },
} as const

export default function FinalCTA() {
  return (
    <section
      className="relative w-full min-h-[60vh] lg:min-h-[70vh] overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <Image
        src={CTA.image.src}
        alt={CTA.image.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent"
      />

      <div className="container-width relative flex min-h-[60vh] lg:min-h-[70vh] items-end">
        <div className="max-w-xl pb-14 lg:pb-20">
          <h2
            id="final-cta-heading"
            className="font-serif text-4xl lg:text-5xl font-semibold leading-[1.1] text-white"
          >
            {CTA.heading}
          </h2>

          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/85">
            {CTA.subtext}
          </p>

          <a
            href={CTA.primary.href}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-brand-navy hover:bg-white/90 transition"
          >
            {CTA.primary.label}
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
