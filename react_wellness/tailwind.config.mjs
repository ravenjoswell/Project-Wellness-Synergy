// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#133156',
        accent: '#64aaff',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Open Sans', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'xl': '50px',
      },
      spacing: {
        '100': '100px',
        '150vh': '150vh',
        '310vh': '310vh',
      },
    },
  },
  plugins: [],
};

export default config;
