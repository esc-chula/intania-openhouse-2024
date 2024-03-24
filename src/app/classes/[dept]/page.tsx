import Header from "@/components/common/header";
import LocalAvatar from "@/components/common/local-avatar";
import ShareButton from "@/components/common/share-button";
import Button from "@/components/ui/button";
import Departments from "@/data/departments.json";
import Informations from "@/data/informations.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return Departments.map((dept) => ({
    dept: dept.id,
  }));
}

export default function DepartmentPage({
  params,
}: {
  params: { dept: string };
}) {
  const department = Departments.find((d) => d.id === params.dept);

  if (!department) {
    notFound();
  }

  return (
    <>
      <Header back />
      <div className="flex flex-col space-y-8 pb-8">
        <div className="flex w-full flex-col items-center gap-7">
          <div className="flex w-full px-2">
            <div className="relative flex aspect-[10/12] w-full rounded-[30px] bg-button-glass p-3 shadow-button-glass ring-[1.5px] ring-white ring-opacity-30">
              <div className="relative flex h-full w-full justify-center rounded-[18px] bg-[#D9D9D9]">
                <LocalAvatar />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <h1 className="text-4xl font-bold">วิชาคอมป้อก</h1>
            <h2 className="text-xl font-bold opacity-80">
              สาชาวิชา{department?.name.th}
            </h2>
          </div>
          <div>
            <p
              className="opacity-80"
              dangerouslySetInnerHTML={{
                __html:
                  Informations.find((info) => info.id === department.id)
                    ?.intro || "",
              }}
            ></p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <Link href="/register">
            <Button variant="default" className="w-48">
              จอง Workshop
            </Button>
          </Link>
          <ShareButton department={department} />
        </div>
      </div>
    </>
  );
}
