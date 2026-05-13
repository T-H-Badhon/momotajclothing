import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1556px',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        body: 'var(--colorBody)',
        drawerText: 'var(--colorDrawerText)',
        bodyText: 'var(--color-body-text)',
        bodyTextPink: 'var(--colorCartDot)',
        linkText: 'var(--colorLinkText)',
        modalBg: 'var(--colorModalBg)',
        gridOverlay: 'var(--colorGridOverlay)',
        btnPrimary: 'var(--colorBtnPrimary)',
        accent: 'var(--colorAccent)',
        sand: 'var(--colorBodyDim)',
        border: 'var(--colorBorder)',
      },
      fontFamily: {
        primary: ['var(--typeBasePrimary)'],
        secondary: ['var(--typeHeaderPrimary)'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
