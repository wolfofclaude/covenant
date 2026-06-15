import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:        '#14264A',
          'navy-mid':  '#1E3A6E',
          'navy-light':'#2A5298',
          cream:       '#FAF8F5',
          'cream-dark':'#F0EDE6',
          gold:        '#B8924A',
          muted:       '#64748B',
        },
      },
      fontFamily: {
        sans: [
          '"Source Sans 3"',
          '"Source Sans 3 Fallback"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        // Slightly larger base scale to suit Source Sans 3's proportions
        'xs':  ['0.8125rem', { lineHeight: '1.2rem' }],
        'sm':  ['0.9375rem', { lineHeight: '1.375rem' }],
        'base':['1.0625rem', { lineHeight: '1.625rem' }],
        'lg':  ['1.1875rem', { lineHeight: '1.75rem' }],
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-up':   'slideUp 0.5s ease-out forwards',
        'slide-left': 'slideInLeft 0.4s ease-out forwards',
        'slide-right':'slideInRight 0.4s ease-out forwards',
        'scale-in':   'scaleIn 0.25s ease-out forwards',
        'glow':       'glow 2s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'bounce-soft':'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:       { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:      { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInLeft:  { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:      { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        glow:         { '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.6)' }, '50%': { boxShadow: '0 0 0 6px rgba(34,197,94,0)' } },
        shimmer:      { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        bounceSoft:   { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
      },
    },
  },
  plugins: [],
}

export default config
