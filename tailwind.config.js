/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ruqaa: ['"Aref Ruqaa"', 'serif'],
        zain:  ['"Zain"', 'serif'],
      },
      animation: {
        'bounce-slow': 'bounce 1.5s infinite',
        'spin-fast': 'spin 0.5s linear infinite',
        'pulse-slow': 'pulse 20s infinite', // 🔥 حركة نبض بطيئة
      },
    },
  },
  plugins: [],
}
