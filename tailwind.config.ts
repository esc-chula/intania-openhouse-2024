import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D52941",
        secondary: "#939393",
      },
      backgroundImage: {
        "button-solid": "linear-gradient(180deg, #FFF 0%, #F6DBDB 100%)",
        "button-glass":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(246, 219, 219, 0.20) 100%)",
      },
      boxShadow: {
        "button-solid": "0px 4px 8px 0px rgba(0, 0, 0, 0.08)",
        "button-glass": "0px 4px 8px 0px rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "fade-out": "fade-out 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
