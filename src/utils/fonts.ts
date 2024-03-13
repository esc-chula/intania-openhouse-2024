import localFont from "next/font/local";

export const lineSeedSansTh = localFont({
  variable: "--font-line-seed-sans-th",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/LINESeedSansTH_W_Th.woff",
      weight: "100",
    },
    {
      path: "../../public/fonts/LINESeedSansTH_W_Rg.woff",
      weight: "400",
    },
    {
      path: "../../public/fonts/LINESeedSansTH_W_Bd.woff",
      weight: "700",
    },
    {
      path: "../../public/fonts/LINESeedSansTH_W_XBd.woff",
      weight: "800",
    },
    {
      path: "../../public/fonts/LINESeedSansTH_W_He.woff",
      weight: "900",
    },
  ],
});
