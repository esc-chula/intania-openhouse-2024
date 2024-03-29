import InnovationCard from "@/components/common/cuiic-inno-card";
import Header from "@/components/common/header";
import Sponser from "@/components/common/sponser";
import CUIICCategory from "@/data/cuiic-category.json";
import CUIIC from "@/data/cuiic.json";

export default function CategoryPage({ params }: { params: { cat: string } }) {
  const innovations = CUIIC.filter((innovation) =>
    innovation.name.startsWith(params.cat),
  );

  const category = CUIICCategory.find((category) => category.id === params.cat);

  return (
    <>
      <Header back />
      <div className="flex w-full flex-col items-center pb-9">
        <div className="flex flex-col items-center gap-2 text-center font-bold">
          <h1 className="text-[2.5rem] leading-none">{category?.th}</h1>
          <p className="text-lg">{category?.en}</p>
        </div>
        <div className="my-4 grid w-full grid-cols-1 gap-5 pb-4 pt-2">
          {innovations.map((innovation) => (
            <InnovationCard key={innovation.name} innovation={innovation} />
          ))}
        </div>
        <Sponser />
      </div>
    </>
  );
}
