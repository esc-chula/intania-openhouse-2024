import Header from "@/components/common/header";
import Sponser from "@/components/common/sponser";
import CUIIC from "@/data/cuiic.json";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage({ params }: { params: { id: string } }) {
  const innovation = CUIIC.find((innovation) =>
    innovation.name.startsWith(params.id),
  );

  return (
    <>
      <Header back />
      <div className="flex w-full flex-col items-center pb-9">
        <div className="mb-9 flex w-full flex-col justify-between gap-4 rounded-[20px] bg-button-solid px-5 py-6 shadow-button-solid">
          <div className="relative h-44">
            <Image
              src={`https://drive.google.com/uc?export=view&id=${innovation?.image.split("=")[1]}`}
              alt="innovation image"
              fill
              sizes="100% 100%"
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="text-sm text-gray-400">
              {innovation?.institution.startsWith("โรงเรียน")
                ? innovation?.institution
                : "โรงเรียน" + innovation?.institution}
            </p>
            <p className=" font-bold text-gray-700">
              {innovation?.name.split("-").slice(1).join("-")}
            </p>
            <p className="text-gray-500">{innovation?.description}</p>
          </div>
          <div className="flex flex-row items-center gap-2.5">
            <Link href={innovation?.video ?? "#"}>
              <button className="rounded-[20px] bg-red-600 px-5 py-1.5 text-sm font-bold text-white shadow-button-solid">
                ดูคลิปนำเสนอ
              </button>
            </Link>
          </div>
        </div>
        <Sponser />
      </div>
    </>
  );
}
