interface SectionHeaderProps {
  eyebrow: string
  heading: string
  subtext?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({
  eyebrow,
  heading,
  subtext,
  align = 'left',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <div className={`max-w-2xl mb-14 ${alignClass}`}>
      <p className="text-[13px] font-semibold text-brand-gold tracking-widest uppercase mb-3">
        {eyebrow}
      </p>
      <h2 className="text-[38px] lg:text-[48px] font-bold text-brand-navy leading-tight">
        {heading}
      </h2>
      {subtext && (
        <p className="mt-4 text-[17px] text-gray-500 leading-relaxed">{subtext}</p>
      )}
    </div>
  )
}
