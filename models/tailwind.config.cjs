/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        text: "text 10s ease infinite",
        pulse: "pulse 2s ease-in-out infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        pulse: {
          "0%": {
            transform: "scale(0.5)",
          },
          "50%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0.5)",
          },
        },
      },
    },
  },
  plugins: [],
};
