import Header from "@/components/common/header";
import PageSwitcher from "@/components/common/page-switcher";
import { notFound } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return notFound();
  return (
    <div className="space flex h-full flex-col">
      <Header />
      <div className="py-2">
        <PageSwitcher
          links={[
            {
              href: "/workshop/reserve",
              text: "ลงทะเบียน",
            },
            {
              href: "/workshop/my",
              text: "ผลลงทะเบียน",
            },
          ]}
        />
      </div>
      {children}
    </div>
  );
}
