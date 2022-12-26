/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Segoe UI', 'sans-serif'],
      serif: ['Nunito Sans', 'serif'],
    },
    extend: {
      screens: {
        sm: '385px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        primary: {
          DEFAULT: '#4BA485',
          90: '#E0FCD6',
          100: '#265B4C',
        },
        dark: {
          DEFAULT: '#131B20',
          secondary: "#222C32",
          third: '#2D3941'
        },
        grey:{
          DEFAULT: '#EAECEF',
          secondary: '#E2E1DD',
          third: '#F0F2F5'
        }
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
  darkMode: ['class'],
};
