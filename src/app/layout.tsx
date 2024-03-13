import { lineSeedSansTh } from "@/utils/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intania Open House 2024",
  description:
    "เปิดบ้านคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ปีการศึกษา 2567",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={lineSeedSansTh.className}>{children}</body>
    </html>
  );
}
