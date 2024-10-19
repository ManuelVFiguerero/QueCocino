/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
          colors: {
            brown: {
              DEFAULT: '#6F4E37', 
              200: '#D9B89D', 
              100: '#E7D2C5', 
        },
      },
    plugins: [],
    }
  }
}