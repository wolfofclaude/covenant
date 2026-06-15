'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useScrolled } from '@/hooks/useScrolled'
import { NAV_LINKS } from '@/constants/data'

export default function Navbar() {
  const scrolled    = useScrolled(16)
  const [open, setOpen] = useState(false)

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">

          {/* Logo */}
          <Link
            href="/"
            className="text-[22px] font-bold text-brand-navy tracking-tight select-none"
          >
            covenant
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[15px] text-gray-600 hover:text-brand-navy transition-colors duration-150 link-hover"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="/auth/sign-in"
              className="text-[15px] text-gray-600 hover:text-brand-navy transition-colors link-hover"
            >
              Log in
            </a>
            <a href="/start" className="btn-primary !py-2 !px-5 !text-[14px]">
              Start Your Will
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 p-1 -mr-1"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 origin-center ${
                open ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                open ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 origin-center ${
                open ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile menu — smooth slide */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 bg-white pb-5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-[15px] text-gray-600 border-b border-gray-50 hover:text-brand-navy transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a href="/auth/sign-in" className="block py-3 text-[15px] text-gray-600 hover:text-brand-navy">
              Log in
            </a>
            <a href="/start" className="btn-primary w-full mt-3">
              Start Your Will
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
