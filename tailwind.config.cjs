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
          90: '#E0FCD6',
          100: '#008069',
        },
        dark: {
          DEFAULT: '#131B20',
          secondary: '#54646F',
          third: '#2D3941',
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
