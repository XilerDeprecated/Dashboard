const DarkTheme = require("@xiler/theme").Themes.dark;

module.exports = {
  purge: false,
  //   purge: {
  //     mode: "all",
  //     enabled: true,
  //     layers: ["base", "components", "utilities"],
  //     content: [
  //       "./pages/**/*.{js,ts,jsx,tsx}",
  //       "./components/**/*.{js,ts,jsx,tsx}",
  //     ],
  //     options: {
  //       keyframes: true,
  //       fontFace: true,
  //     },
  //   },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    colors: DarkTheme,
    extend: {
      gridTemplateRows: {
        "fix-bottom": "1fr auto"
      },
      gridTemplateColumns: {
        "fix-right": "1fr auto"
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: ["tailwindcss", "autoprefixer"],
};
