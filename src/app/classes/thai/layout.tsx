import Header from "@/components/common/header";
import PageSwitcher from "@/components/common/page-switcher";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space flex h-full flex-col">
      <Header />
      <div className="py-2">
        <PageSwitcher
          links={[
            {
              href: "/classes/thai",
              text: "ภาคไทย",
            },
            {
              href: "/classes/inter",
              text: "ภาคอินเตอร์",
            },
          ]}
        />
      </div>
      {children}
    </div>
  );
}
