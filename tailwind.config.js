/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        parchment: {
          10: "#fcfdf9",
          20: "#f9fcf7",
          30: "#f7faf5",
          40: "#f5f9f3",
          50: "#e3e8e1",
          500: "#c1dfbf",
          700: "#e1ffcf",
        },
      },
      backgroundColor: {
        "dark-box": "#1a1c19",
        "dark-surface": "#1c1e1b",
        "dark-deeper": "#161815",
      },
      textColor: {
        "dark-text": "#c0c7bd",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            maxWidth: 'none',
          },
        },
        invert: {
          css: {
            color: theme('colors.dark-text'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 