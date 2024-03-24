import { interDepartment } from "@/constants/departments";
import Deparments from "@/data/departments.json";
import Link from "next/link";

export default function ClassCard({
  department,
}: {
  department: (typeof Deparments)[0];
}) {
  return (
    <Link href={`/classes/${department.id}`}>
      <div className="flex h-[120px] w-full items-center justify-center rounded-[20px] bg-button-solid text-primary shadow-button-solid">
        {interDepartment.includes(department.id)
          ? department.name.en
          : department.name.th}
      </div>
    </Link>
  );
}
