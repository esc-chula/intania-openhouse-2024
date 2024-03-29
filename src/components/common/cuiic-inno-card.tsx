import CUIIC from "@/data/cuiic.json";
import Image from "next/image";
import Link from "next/link";

export default function InnovationCard({
  innovation,
}: {
  innovation: (typeof CUIIC)[0];
}) {
  return (
    <Link
      href={`/CUIIC/${innovation.name.slice(0, 2)}/${innovation.name.slice(0, 4)}/`}
    >
      <div className="flex flex-col justify-between gap-4 rounded-[20px] bg-button-solid px-5 py-6 shadow-button-solid">
        <div className="relative h-44">
          <Image
            src={`https://drive.google.com/uc?export=view&id=${innovation.image.split("=")[1]}`}
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
            {innovation.institution.startsWith("โรงเรียน")
              ? innovation.institution
              : "โรงเรียน" + innovation.institution}
          </p>
          <p className=" font-bold text-gray-700">
            {innovation.name.split("-").slice(1).join("-")}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2.5">
          <Link href={innovation.video}>
            <button className="rounded-[20px] bg-red-600 px-5 py-1.5 text-sm font-bold text-white shadow-button-solid">
              ดูคลิปนำเสนอ
            </button>
          </Link>
          <Link
            href={`/CUIIC/${innovation.name.slice(0, 2)}/${innovation.name.slice(0, 4)}/`}
          >
            <button className="rounded-[20px] bg-gray-400 px-3.5 py-1.5 text-xs font-bold text-white shadow-button-solid">
              ข้อมูลเพิ่มเติม
            </button>
          </Link>
        </div>
      </div>
    </Link>
  );
}
