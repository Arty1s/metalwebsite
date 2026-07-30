import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050706',
        obsidian: '#0b100d',
        panel: '#111713',
        hunter: '#6d5b8f',
        mana: '#2f9b73',
        ember: '#b8945f',
        success: '#4fbd83',
        silver: '#c7cec8',
        emerald: '#1f6f55',
      },
      boxShadow: {
        neon: '0 18px 45px rgba(0, 0, 0, 0.34)',
        mana: '0 14px 38px rgba(12, 40, 31, 0.34)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
} satisfies Config;
