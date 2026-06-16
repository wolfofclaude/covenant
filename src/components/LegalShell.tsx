import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* Shared chrome + prose styling for the legal pages (Terms, Privacy, Cookies).
   Follows DESIGN.md: solid navbar, cream canvas, serif headings, left-aligned
   article column, warm-ink/muted body, generous spacing. */
export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <Navbar overHero={false} />
      <main className="bg-brand-cream">
        <div className="container-width pt-36 pb-20 lg:pt-44 lg:pb-28">
          <article className="max-w-3xl">
            <h1 className="font-serif text-[40px] font-semibold leading-[1.05] tracking-tight text-brand-navy sm:text-[52px]">
              {title}
            </h1>
            <p className="mt-4 text-[13px] uppercase tracking-wider text-gray-400">Last updated: {updated}</p>

            <div
              className="mt-10 text-[15px] leading-relaxed text-gray-600 [&>*+*]:mt-4
                         [&_h2]:!mt-12 [&_h2]:font-serif [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:text-brand-navy lg:[&_h2]:text-[26px]
                         [&_a]:font-medium [&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-brand-navy-mid
                         [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5
                         [&_strong]:font-semibold [&_strong]:text-brand-navy"
            >
              {children}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
