import Button from "@/components/ui/button";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function Customize({
  name,
  setPage,
}: {
  name: string;
  setPage: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <div className="relative flex h-fit w-full flex-col items-center justify-center gap-6 rounded-[30px] bg-button-glass py-6 shadow-button-glass ring-[1.5px] ring-white ring-opacity-30">
        <Image
          src="/assets/avatar/avatar.svg"
          alt="Avatar"
          width={150}
          height={150}
        />

        <Image
          src="/assets/image.svg"
          alt="Image"
          width={20}
          height={20}
          className="absolute bottom-[18px] right-[18px]"
        />
      </div>

      <div className="flex h-fit w-full flex-col items-center justify-center rounded-[30px] bg-button-solid shadow-button-solid">
        <div className="flex w-full justify-between gap-6 px-6 py-[6px] text-sm font-bold text-[#939393] ">
          <p>ชุด</p>
          <p>ร่างกาย</p>
          <p>ตา</p>
          <p>คิ้ว</p>
          <p>ผม</p>
          <p>ช่วงบน</p>
        </div>
      </div>

      <Button
        size="default"
        className="w-36"
        onClick={() => setPage("summary")}
      >
        ไปต่อ
      </Button>
    </>
  );
}
