import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Canvas
        bg: 'var(--bg)',
        'bg-secondary': 'var(--bg-secondary)',
        card: 'var(--card)',
        'card-elevated': 'var(--card-elevated)',
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',

        // Brand / AI / action
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-tint': 'var(--primary-tint)',

        // Contrast-safe greens
        green: 'var(--green)',
        'green-deep': 'var(--green-deep)',
        'green-tint': 'var(--green-tint)',

        // Data / info
        info: 'var(--info)',
        'info-tint': 'var(--info-tint)',

        // Semantic states
        success: 'var(--success)',
        'success-tint': 'var(--success-tint)',
        attention: 'var(--attention)',
        'attention-tint': 'var(--attention-tint)',
        problem: 'var(--problem)',
        'problem-tint': 'var(--problem-tint)',

        // Accent glow
        glow: 'var(--glow)',
        'glow-warm': 'var(--glow-warm)',

        // Text
        text: 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-inverse': 'var(--text-inverse)',
      },

      borderRadius: {
        card: '14px',
        button: '8px',
        'button-lg': '10px',
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        hero: ['64px', { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '700' }],
        'hero-md': ['48px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'hero-sm': ['38px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        dashboard: ['30px', { lineHeight: '1.2', fontWeight: '650' }],
        card: ['17px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['15px', { lineHeight: '1.6' }],
        small: ['14px', { lineHeight: '1.5' }],
      },

      boxShadow: {
        card: '0 1px 2px rgba(60,50,30,0.04), 0 2px 8px rgba(60,50,30,0.05)',
        'card-hover': '0 2px 4px rgba(60,50,30,0.06), 0 8px 20px rgba(60,50,30,0.08)',
        glow: '0 0 24px rgba(134,239,172,0.45)',
        'glow-warm': '0 0 28px rgba(253,230,138,0.5)',
      },

      transitionDuration: {
        card: '180ms',
        panel: '225ms',
        page: '300ms',
      },

      keyframes: {
        'orb-breathe': {
          '0%,100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
        'orb-think': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'skeleton-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'dot-pulse': {
          '0%,80%,100%': { opacity: '0.3' },
          '40%': { opacity: '1' },
        },
      },

      animation: {
        'orb-breathe': 'orb-breathe 3s ease-in-out infinite',
        'orb-think': 'orb-think 4s linear infinite',
        skeleton: 'skeleton-shimmer 1.6s ease-in-out infinite',
        'dot-1': 'dot-pulse 1.2s ease-in-out infinite',
        'dot-2': 'dot-pulse 1.2s ease-in-out 0.2s infinite',
        'dot-3': 'dot-pulse 1.2s ease-in-out 0.4s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;