module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      keyframes: {
        "bounce-custom": {
          "0%": { transform: "scale(1.2)" },
          "50%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        "bounce-custom": "bounce-custom 1.5s ease-in-out infinite 0.25s",
      },
    },
  },
  plugins: [],
};
