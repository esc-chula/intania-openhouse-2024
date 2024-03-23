import Class from "@/components/classes/class";
import Selector from "@/components/classes/selector";
import Header from "@/components/common/header";

export default function ThaiClass() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start pb-9">
      <Header />
      <Selector select="thai" />
      <div className="grid w-full grid-cols-2 gap-5 overflow-x-scroll">
        {Array.from({ length: 15 }, (_, index) => (
          <Class key={index}></Class>
        ))}
      </div>
    </div>
  );
}
