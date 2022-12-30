// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Segoe UI', 'sans-serif'],
      serif: ['Nunito Sans', 'serif'],
    },
    extend: {
      fontSize: {
        lg: '19px',
      },
      screens: {
        sm: '385px',
        md: '560px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        primary: {
          DEFAULT: '#09A683',
          25: '#E0FCD6',
          50: '#04CD9E',
          100: '#008069',
        },
        orange: {
          DEFAULT: '#FF6900',
          25: '#fac39d',
          50: '#ff9f5c',
          100: '#d66618',
        },
        merigold: {
          DEFAULT: '#FCB900',
          25: '#fce49f',
          50: '#ffdc7a',
          100: '#d9ab2e',
        },
        yellow: {
          DEFAULT: '#ffeb3b',
          25: '#f7f4d2',
          50: '#c9b504',
          100: '#d6c213',
        },
        softblue: {
          DEFAULT: '#8ED1FC',
          25: '#a2d8fa',
          50: '#71c1f5',
          100: '#4ba8e3',
        },
        blue: {
          DEFAULT: '#0693E3',
          25: '#9cd6f7',
          50: '#6cb9e6',
          100: '#2485bd',
        },
        red: {
          DEFAULT: '#EB144C',
          25: '#f79eb5',
          50: '#e35f82',
          100: '#9c1034',
        },
        pink: {
          DEFAULT: '#F78DA7',
          25: '#fab9c9',
          50: '#d47b91',
          100: '#c43d5e',
        },
        purple: {
          DEFAULT: '#9900EF',
          25: '#dda1ff',
          50: '#8404cc',
          100: '#550185',
        },
        brown: {
          DEFAULT: '#795548',
          25: '#fab69d',
          50: '#c23908',
          100: '#852401',
        },
        dark: {
          DEFAULT: '#1f2c33',
          secondary: '#54646F',
          third: '#111b21',
        },
        grey: {
          DEFAULT: '#DDDDDC',
          secondary: '#EFF2F5',
          third: '#F0F2F5',
        },
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
  darkMode: ['class'],
};
