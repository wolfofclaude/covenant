interface BadgeProps {
  items: string[]
  className?: string
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4 text-emerald-500 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Badge({ items, className = '' }: BadgeProps) {
  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {items.map((item) => (
        <span key={item} className="flex items-center gap-1.5 text-[13px] text-gray-500">
          <CheckIcon />
          {item}
        </span>
      ))}
    </div>
  )
}
