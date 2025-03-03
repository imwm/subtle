/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: {
          10: '#fcfdf9',
          20: '#f9fcf7',
          30: '#f7faf5',
          40: '#f5f9f3',
          50: '#f3f8f1',
          60: '#f1f7ef',
          70: '#eff6ed',
          80: '#edf5eb',
          90: '#ebf4e9',
          100: '#e9f3e7',
          110: '#e7f2e5',
          120: '#e5f1e3',
          130: '#e3f0e1',
          140: '#e1efdf',
          150: '#dfeedd',
          160: '#ddeddb',
          170: '#dbecd9',
          180: '#d9ebd7',
          190: '#d7ead5',
          200: '#d5e9d3',
          210: '#d3e8d1',
          220: '#d1e7cf',
          230: '#cfe6cd',
          240: '#cde5cb',
          250: '#cbe4c9',
          300: '#c9e3c7',
          350: '#c7e2c5',
          400: '#c5e1c3',
          450: '#c3e0c1',
          500: '#c1dfbf',
        },
      },
      backgroundColor: {
        'dark-parchment': '#1a1c19',
        'dark-box': '#2a2c28',
      },
      textColor: {
        'dark-text': '#e0e7dd',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
