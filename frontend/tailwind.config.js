/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#615EF0",
        },
        secondary: {
          DEFAULT: "#4d4bc0",
        },
      },
    },
  },
  plugins: [],
};
