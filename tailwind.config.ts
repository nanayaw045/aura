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
          900: '#0B1D3A',
          800: '#101D35',
          700: '#14223E'
        },
        gold: {
          DEFAULT: '#C7A461',
          dark: '#B8923E',
          light: '#D7B980'
        }
      },
      boxShadow: {
        glow: '0 20px 60px rgba(199, 164, 97, 0.16)',
        card: '0 12px 40px rgba(11, 29, 58, 0.28)'
      },
      backgroundImage: {
        radial: 'radial-gradient(circle at top, rgba(199,164,97,0.12), transparent 40%), radial-gradient(circle at bottom right, rgba(255,255,255,0.06), transparent 28%)'
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif']
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem'
      }
    }
  },
  plugins: []
};

export default config;
