import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Canvas
        bg: 'rgb(var(--cf-bg) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--cf-bg-secondary) / <alpha-value>)',
        card: 'rgb(var(--cf-card) / <alpha-value>)',
        'card-elevated': 'rgb(var(--cf-card-elevated) / <alpha-value>)',
        border: 'rgb(var(--cf-border) / <alpha-value>)',
        'border-hover': 'rgb(var(--cf-border-hover) / <alpha-value>)',

        // Brand / AI / action
        primary: 'rgb(var(--cf-primary) / <alpha-value>)',
        'primary-hover': 'rgb(var(--cf-primary-hover) / <alpha-value>)',
        'primary-tint': 'rgb(var(--cf-primary-tint) / <alpha-value>)',

        // Contrast-safe greens
        green: 'rgb(var(--cf-green) / <alpha-value>)',
        'green-deep': 'rgb(var(--cf-green-deep) / <alpha-value>)',
        'green-tint': 'rgb(var(--cf-green-tint) / <alpha-value>)',

        // Data / info
        info: 'rgb(var(--cf-info) / <alpha-value>)',
        'info-tint': 'rgb(var(--cf-info-tint) / <alpha-value>)',

        // Semantic states
        success: 'rgb(var(--cf-success) / <alpha-value>)',
        'success-tint': 'rgb(var(--cf-success-tint) / <alpha-value>)',
        attention: 'rgb(var(--cf-attention) / <alpha-value>)',
        'attention-tint': 'rgb(var(--cf-attention-tint) / <alpha-value>)',
        problem: 'rgb(var(--cf-problem) / <alpha-value>)',
        'problem-tint': 'rgb(var(--cf-problem-tint) / <alpha-value>)',

        // Accent glow
        glow: 'rgb(var(--cf-glow) / <alpha-value>)',
        'glow-warm': 'rgb(var(--cf-glow-warm) / <alpha-value>)',

        // Text
        text: 'rgb(var(--cf-text) / <alpha-value>)',
        'text-secondary': 'rgb(var(--cf-text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--cf-text-muted) / <alpha-value>)',
        'text-inverse': 'rgb(var(--cf-text-inverse) / <alpha-value>)',
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
        glow: '0 0 24px rgb(var(--cf-glow) / 0.45)',
        'glow-warm': '0 0 28px rgb(var(--cf-glow-warm) / 0.5)',
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
