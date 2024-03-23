import ClassCard from "@/components/common/class-card";

export default function ThaiClass() {
  return (
    <div className="my-4 grid w-full grid-cols-2 gap-5 overflow-y-scroll py-4">
      {Array.from({ length: 15 }, (_, index) => (
        <ClassCard key={index}></ClassCard>
      ))}
    </div>
  );
}
