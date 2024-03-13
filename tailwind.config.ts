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
    },
  },
  plugins: [],
};
export default config;
