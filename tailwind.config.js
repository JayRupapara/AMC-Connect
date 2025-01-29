
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#119da4",
        secondary: "#0c7489",
        accent: "#13505b",
        neutral: "#040404",
        "base-100": "#f3feff",
        info: "#001C32",
        success: "#119da4",
        warning: "#F15641",
        error: "#F15641",
      },
      boxShadow: {
        '3xl': '#119da44c 0px 25px 20px -20px',
      
       
      }
    },
  },
  plugins: [],
}
