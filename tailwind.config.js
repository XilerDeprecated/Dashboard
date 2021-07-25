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
    colors: {
      ...DarkTheme,
      online: "#28C76F",
      transparent: "#00000000"
    },
    extend: {
      gridTemplateRows: {
        "fix-bottom": "1fr auto",
        "fix-top": "auto 1fr",
      },
      gridTemplateColumns: {
        "fix-left": "auto 1fr",
        "fix-right": "1fr auto",
      },
      borderWidth: {
        3: "3px",
      },
      maxWidth: {
        "xxs": "8rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: ["tailwindcss", "autoprefixer"],
};
