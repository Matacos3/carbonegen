import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        "century":["Century Gothic","courier"]
      },
      colors:{
        "primary" : "black",
        "color1":"#2A3244",
        "color2" : "#F0F5FF80",
        "color3" : "#3D85FF",
        "color4" : "#FF564C"
      }
    },
  },
  plugins: [],
};
export default config;
