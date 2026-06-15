'use client'

import { FOOTER_LINKS } from '@/constants/data'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="container-width pt-16 pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand column */}
          <div className="col-span-2">
            <a href="/" className="text-[22px] font-bold tracking-tight text-white">covenant</a>
            <p className="mt-4 text-[14px] text-white/55 leading-relaxed max-w-[260px]">
              Simple, affordable estate planning for expat families living and working in the UAE.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60
                             hover:bg-white/20 hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex gap-2"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                className="flex-1 px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/30
                           text-[13px] border border-white/10 focus:outline-none focus:border-white/30
                           transition-colors min-w-0"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="px-4 py-2 bg-brand-gold text-white text-[13px] font-medium rounded-full
                           hover:bg-brand-gold/80 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-5 text-[12px] text-white/30">
              Licenced to practise in the UAE.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <nav key={group} aria-label={`${group} navigation`}>
              <h3 className="text-[12px] font-semibold text-white/40 tracking-widest uppercase mb-4">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14px] text-white/70 hover:text-white link-hover transition-colors duration-150"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/35">
            © {new Date().getFullYear()} Covenant Technologies Ltd. All rights reserved.
          </p>
          <button
            type="button"
            className="text-[13px] text-white/35 hover:text-white/60 transition-colors"
          >
            Manage cookies
          </button>
        </div>
      </div>
    </footer>
  )
}
