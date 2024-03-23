import ClassCard from "@/components/common/class-card";

export default function InterClass() {
  return (
    <div className="my-4 grid w-full grid-cols-1 gap-5 overflow-y-scroll py-4">
      {Array.from({ length: 5 }, (_, index) => (
        <ClassCard key={index}></ClassCard>
      ))}
    </div>
  );
}
