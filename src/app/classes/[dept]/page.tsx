import Header from "@/components/common/header";
import LocalAvatar from "@/components/common/local-avatar";
import ShareButton from "@/components/common/share-button";
import { interDepartment } from "@/constants/departments";
import Departments from "@/data/departments.json";
import Informations from "@/data/informations.json";
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
              <div className="relative flex h-full w-full justify-center overflow-hidden rounded-[18px] bg-[url('/assets/avatar/background.webp')] bg-cover bg-bottom">
                <LocalAvatar className="z-10 -mb-6" hideShadow />
                <div className="absolute z-0 h-full w-full bg-white/10" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <ShareButton department={department} />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <h1 className="text-4xl font-bold">
              {department.name.th.length > 20
                ? department.name.short
                : interDepartment.includes(department.id)
                  ? department.name.en
                  : department.name.th.replace("วิศวกรรม", "")}
            </h1>
            <h2 className="text-xl font-bold opacity-80">
              สาชาวิชา{department?.name.th}
            </h2>
          </div>
          <div>
            <p
              className="-mx-6 bg-gradient-to-b from-transparent via-black/15 to-transparent px-6 text-white opacity-80"
              dangerouslySetInnerHTML={{
                __html:
                  Informations.find((info) => info.id === department.id)
                    ?.intro || "",
              }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
}
