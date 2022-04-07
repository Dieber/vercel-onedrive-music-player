module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-mode-basic-bg": "rgb(53, 54, 57)",
        "dark-mode-basic-bg-lighten": "rgb(88, 87, 89)",
        "player-bg": "rgb(19,21,26)",

        // "player-bg": "rgb(22,23,36)",
        "player-bg-lighten": "rgb(45 51 88)",
        // "dark-mode-basic-bg": "525354",
      },
    },
  },
  plugins: [],
};
