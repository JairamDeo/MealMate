// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bootstrap Dark 5 colors
        dark: {
          body: "#121212",
          surface: "#1E1E1E",
          border: "#2C2C2C",
          muted: "#6C757D",
          primary: "#0D6EFD",
          secondary: "#6C757D",
          success: "#198754",
          info: "#0DCAF0",
          warning: "#FFC107",
          danger: "#DC3545",
          light: "#F8F9FA",
          dark: "#212529",
          white: "#FFFFFF",
          background: "#0F0F0F"
        }
      },
    },
  },
  plugins: [],
};
