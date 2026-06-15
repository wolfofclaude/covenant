export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-cream animate-pulse" aria-label="Loading">
      {/* Nav skeleton */}
      <div className="h-[72px] bg-white border-b border-gray-100" />

      {/* Hero skeleton */}
      <div className="pt-24 pb-16 container-width">
        <div className="h-5 w-40 bg-gray-200 rounded-full mb-8" />
        <div className="h-16 w-3/4 bg-gray-200 rounded-2xl mb-4" />
        <div className="h-16 w-1/2 bg-gray-200 rounded-2xl mb-8" />
        <div className="h-5 w-96 bg-gray-200 rounded-full mb-10" />
        <div className="flex gap-3">
          <div className="h-12 w-40 bg-gray-300 rounded-full" />
          <div className="h-12 w-40 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="bg-white py-20">
        <div className="container-width grid grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
