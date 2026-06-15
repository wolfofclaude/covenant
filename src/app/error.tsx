'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="text-center max-w-md">
        <p className="text-[13px] font-semibold text-brand-gold tracking-widest uppercase mb-4">Something went wrong</p>
        <h1 className="text-[40px] font-bold text-brand-navy mb-4">An error occurred</h1>
        <p className="text-gray-500 mb-8">We&apos;re sorry — something unexpected happened. Please try again or contact our team if the issue persists.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">Try again</button>
          <a href="/" className="btn-secondary">Go home</a>
        </div>
      </div>
    </div>
  )
}
