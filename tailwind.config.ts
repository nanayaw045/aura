import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#071224',
          900: '#0A1F44',
          800: '#10284F',
          700: '#12305D'
        },
        gold: {
          DEFAULT: '#C9A961',
          dark: '#A78641',
          light: '#E0C485'
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
