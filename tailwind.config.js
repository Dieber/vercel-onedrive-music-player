module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-mode-basic-bg": "black",
        "dark-mode-basic-bg-lighten": "#111",
        "player-bg": "black",
        "player-bg-lighten": "rgb(45 51 88)",
      },
    },
  },
  plugins: [],
};
