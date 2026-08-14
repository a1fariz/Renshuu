import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="gelap"]'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--latar-panel)',
        canvas: 'var(--latar)',
        muted: 'var(--latar-lembut)',
        ink: 'var(--teks)',
        subtle: 'var(--teks-lembut)',
        line: 'var(--garis)',
        accent: 'var(--aksen)',
        'accent-dark': 'var(--aksen-gelap)',
        'accent-soft': 'var(--aksen-lembut)',
        mastered: 'var(--dikuasai)',
        almost: 'var(--hampir)',
        practiced: 'var(--dilatih)',
        untouched: 'var(--belum)',
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        japanese: ['Yu Gothic', 'Meiryo', 'Hiragino Kaku Gothic ProN', 'MS Gothic', 'Noto Sans JP', 'sans-serif'],
      },
      boxShadow: {
        panel: 'var(--bayang)',
      },
      borderRadius: {
        panel: '10px',
      },
      keyframes: {
        enter: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        enter: 'enter 0.25s ease',
      },
    },
  },
  plugins: [],
};

export default config;
