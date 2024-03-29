import CategoryCard from "@/components/common/cuiic-cat-card";
import Header from "@/components/common/header";
import Sponser from "@/components/common/sponser";
import CUIICCategory from "@/data/cuiic-category.json";

export default function CUIIC() {
  return (
    <>
      <Header back />
      <div className="flex w-full flex-col items-center pb-9">
        <div className="flex flex-col items-center gap-2 text-center font-bold">
          <h1 className="text-[2.5rem]">CUIIC</h1>
          <p>
            ผลงานนวัตกรรมทางวิศวกรรม <br />
            โดยนักเรียนมัธยมปลาย
          </p>
        </div>
        <div className="my-4 grid w-full grid-cols-1 gap-5 pb-4 pt-2">
          {CUIICCategory.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        <Sponser />
      </div>
    </>
  );
}
