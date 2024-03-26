import { config } from "./lib/server/config";
import { FONTS_SANS, FONTS_SERIF } from "./consts";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./pages/**/*.js", "./components/**/*.js", "./layouts/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: "#FAFAF9",
        },
        night: {
          DEFAULT: config.darkBackground || "#0e0e0e",
        },
      },
      fontFamily: {
        sans: FONTS_SANS,
        serif: FONTS_SERIF,
        noEmoji: [
          '"IBM Plex Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
