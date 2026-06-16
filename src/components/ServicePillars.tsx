type Pillar = {
  title: string
  description: string
}

const pillars: Pillar[] = [
  {
    title: 'UAE will',
    description:
      'Protect your family and assets you leave behind in the UAE. Registered through the UAE courts.',
  },
  {
    title: 'Home-country will',
    description: 'A local will for assets you hold abroad. UK and India available now.',
  },
  {
    title: 'Power of attorney',
    description: 'Let someone you trust act for you while you are alive if you cannot.',
  },
  {
    title: 'Vault & guidance',
    description: 'Keep your important documents safe and accessible to the right people.',
  },
]

export default function ServicePillars() {
  return (
    <section id="services" className="bg-brand-cream section-padding">
      <div className="container-width">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold leading-tight text-brand-navy">
            Estate planning for cross-border lives.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-gray-500">
            Most expat lives aren&apos;t contained in one country. We help you protect what
            matters, here and back home.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-left">
              <h3 className="font-serif text-xl font-semibold text-brand-navy">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-gray-500">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a href="/start" className="btn-primary">
            Start Your Will
          </a>
        </div>
      </div>
    </section>
  )
}
