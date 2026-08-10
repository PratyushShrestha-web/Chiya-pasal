import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: { top: "#f0c9a0", bot: "#d9895a" },
        wall: { DEFAULT: "#a8492f", deep: "#7e3120" },
        wood: { DEFAULT: "#3d2418", light: "#5a3624" },
        cream: { DEFAULT: "#f3e6d2", dim: "#e6d3b8" },
        brass: { DEFAULT: "#caa24a", bright: "#e8c168" },
        leaf: { DEFAULT: "#3c4b32", dark: "#293620" },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
