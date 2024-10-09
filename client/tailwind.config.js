/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
    darkMode:'selector',
  theme: {
    extend: {backgroundImage: {
      'custom-image': "url('https://plus.unsplash.com/premium_photo-1683309563255-fef9e541cdec?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    },
    fontFamily:{
      "sora": ["Sora", "sans-serif"]
    }

    },
  },
  plugins: [],
}

