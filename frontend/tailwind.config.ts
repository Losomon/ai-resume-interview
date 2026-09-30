import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Canvas
        bg: '#FDFCF7',
        'bg-secondary': '#F7F5EC',
        card: '#FFFFFF',
        'card-elevated': '#FFFDF6',
        border: '#E8E4D5',
        'border-hover': '#D6D0BC',

        // Brand / AI / action
        primary: '#15803D',
        'primary-hover': '#166534',
        'primary-tint': '#DCFCE7',

        // Contrast-safe greens
        green: '#15803D',
        'green-deep': '#14532D',
        'green-tint': '#DCFCE7',

        // Data / info
        info: '#0E7490',
        'info-tint': '#CFFAFE',

        // Semantic states
        success: '#16A34A',
        'success-tint': '#DCFCE7',
        attention: '#D97706',
        'attention-tint': '#FEF3C7',
        problem: '#DC2626',
        'problem-tint': '#FEE2E2',

        // Accent glow
        glow: '#86EFAC',
        'glow-warm': '#FDE68A',

        // Text
        text: '#1C1917',
        'text-secondary': '#57534E',
        'text-muted': '#A8A29E',
        'text-inverse': '#FFFFFF',
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
