import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: "#000000",
      "black/64": "rgba(0, 0, 0, 0.64)",
      "black/32": "rgba(0, 0, 0, 0.32)",
      green: "#43a047",
      "lightgreen/16": "rgba(165, 214, 167, 0.16)",
      gray: "#939393",
      lightgray: "#bebebe",
      white: "#ffffff",
    },
    extend: {
      boxShadow: {
        ai: "0 2px 8px 0 rgba(33, 33, 33, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
