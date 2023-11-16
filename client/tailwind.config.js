/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,js,tsx,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "t-light": "#1A1A1A",
        "t-dark": "#F2F2F2",
        "c-light": "#667085",
        "c-dark": "#C0C5D0",
        "d-light": "#7D5FC5",
        "d-dark": "#9685BF",
        "bg-dark": "#090D1F",
        "bg-light": "#FAFAFA",
      }
    },
  },
  plugins: [],
};

