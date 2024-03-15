import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Summary({ name }: { name: string }) {
  return (
    <>
      <div className="flex h-fit w-full flex-col items-center justify-center gap-6 rounded-[30px] bg-button-glass pb-9 pt-6 shadow-button-glass ring-[1.5px] ring-white ring-opacity-30">
        <p className="text-2xl font-bold">{name}</p>
        <Image
          src="/assets/avatar/avatar.svg"
          alt="Avatar"
          width={150}
          height={150}
        />
      </div>
      <div>
        <p className="mb-4 text-center text-sm font-bold">
          พร้อมแล้วใช่มั้ย ลุย!
        </p>
        <Link href="/classes">
          <Button size="default" className="w-36">
            ไปต่อ
          </Button>
        </Link>
      </div>
    </>
  );
}
