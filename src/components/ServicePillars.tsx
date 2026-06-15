import SectionHeader from '@/components/ui/SectionHeader'

const services = [
  {
    icon: (
      <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title:       'UAE will',
    description: 'Protect your family and assets you leave behind in the UAE. Registered through UAE courts.',
    href:        '#pricing',
  },
  {
    icon: (
      <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title:       'Home-country will',
    description: 'A local will for assets you hold abroad. UK and India available now.',
    href:        '#pricing',
  },
  {
    icon: (
      <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title:       'Power of attorney',
    description: 'Let someone you trust act for you while alive if you cannot.',
    href:        '#pricing',
  },
  {
    icon: (
      <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title:       'Vault & guidance',
    description: 'Keep your important documents safe and accessible to the right people.',
    href:        '#pricing',
  },
]

export default function ServicePillars() {
  return (
    <section id="services" className="bg-white section-padding">
      <div className="container-width">
        <SectionHeader
          eyebrow="What we offer"
          heading={`Estate planning for\ncross-border lives`}
          subtext="One platform to protect everything you've built — wherever in the world it is."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative bg-brand-cream rounded-2xl p-7 border border-gray-100
                         hover:border-brand-navy/20 hover:shadow-xl hover:-translate-y-1
                         transition-all duration-300 cursor-pointer block"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl
                              bg-brand-navy/[0.08] text-brand-navy mb-5
                              group-hover:bg-brand-navy group-hover:text-white
                              group-hover:scale-110 group-hover:rotate-3
                              transition-all duration-300">
                {s.icon}
              </div>

              <h3 className="text-[17px] font-semibold text-brand-navy mb-2">{s.title}</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed">{s.description}</p>

              <div className="mt-5 flex items-center gap-1 text-[13px] font-medium text-brand-navy
                              opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                Learn more
                <svg aria-hidden="true" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
