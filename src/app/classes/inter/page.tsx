import ClassCard from "@/components/common/class-card";
import { interDepartment } from "@/constants/departments";
import Deparments from "@/data/departments.json";

export default function InterClass() {
  return (
    <div className="my-4 grid w-full grid-cols-1 gap-5 overflow-y-scroll py-2">
      {Deparments.filter((department) =>
        interDepartment.includes(department.id),
      ).map((department) => (
        <ClassCard key={department.id} department={department} />
      ))}
    </div>
  );
}
