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
          // Dark / ink — Blanket uses a warm near-black (--warm-black #1a1816)
          navy:        '#1A1816',
          'navy-mid':  '#2B2826',
          'navy-light':'#48433F',
          // Warm off-white background (--cream / --chrome-light #f9f8f6)
          cream:       '#F9F8F6',
          'cream-dark':'#F0EDE9',
          // Brand accent — Blanket's primary is blue, not gold (--accent-blue)
          blue:        '#1E6FBA',
          'blue-strong':'#185D9E',
          // `gold` retained as an alias of the accent so legacy usages stay on-brand
          gold:        '#1E6FBA',
          muted:       '#6A7282',
          // Warm footer tone (slightly deeper than cream)
          'cream-warm':'#ECE9E3',
        },
        // Muted pastel testimonial cards (Blanket palette)
        pastel: {
          sage:  '#DDE4D8',
          tan:   '#EFE7DA',
          blue:  '#D8E3EC',
          stone: '#E7E4DD',
          rose:  '#EEE1DC',
        },
      },
      borderRadius: {
        // Blanket's large card/surface radius (--border-radius: 24px)
        brand: '24px',
      },
      fontFamily: {
        sans: [
          'var(--font-source-sans)',
          '"Source Sans 3"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        // Display/heading serif — matches Blanket's --font-landing-serif
        serif: [
          'var(--font-source-serif)',
          '"Source Serif 4"',
          'ui-serif',
          'Georgia',
          'serif',
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
        'marquee':    'marquee 55s linear infinite',
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
        marquee:      { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}

export default config
