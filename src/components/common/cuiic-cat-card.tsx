import CUIICCategory from "@/data/cuiic-category.json";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function CategoryCard({
  category,
}: {
  category: (typeof CUIICCategory)[0];
}) {
  return (
    <Link href={`/CUIIC/${category.id}`}>
      <div className="flex h-[97px] w-full items-center justify-between rounded-[20px] bg-button-solid px-5 text-primary shadow-button-solid">
        <div className="flex h-full flex-col justify-center">
          <h3 className="text-2xl font-bold">{category.th}</h3>
          <p className="text-sm font-bold text-gray-500">{category.en}</p>
        </div>
        <div>
          <FiArrowRight className="text-xl text-gray-500" />
        </div>
      </div>
    </Link>
  );
}
