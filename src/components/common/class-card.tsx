import { interDepartment } from "@/constants/departments";
import Deparments from "@/data/departments.json";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function ClassCard({
  department,
}: {
  department: (typeof Deparments)[0];
}) {
  return (
    <Link href={`/classes/${department.id}`}>
      <div className="flex h-[120px] w-full items-center justify-between rounded-[20px] bg-button-solid px-5 text-primary shadow-button-solid">
        <div className="flex h-full flex-col justify-center">
          <h3 className="text-2xl font-bold">
            {department.name.th.length > 20
              ? department.name.short
              : interDepartment.includes(department.id)
                ? department.name.en
                : department.name.th.replace("วิศวกรรม", "")}
          </h3>
          <p className="text-sm text-gray-600">
            {interDepartment.includes(department.id)
              ? department.name.th
              : department.name.en}
          </p>
        </div>
        <div>
          <FiArrowRight className="text-xl text-gray-500" />
        </div>
      </div>
    </Link>
  );
}
