/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        modal: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [import("@tailwindcss/typography")],
  darkMode: "selector",
};
