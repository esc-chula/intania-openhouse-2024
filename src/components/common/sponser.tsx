import Image from "next/image";

export default function Sponser() {
  return (
    <div className="flex gap-2.5">
      <div className="relative flex h-[45px] w-[45px] items-center justify-center rounded-lg bg-white">
        <Image
          src="/assets/sponsor/sponsor-1.png"
          alt=""
          fill
          objectFit="contain"
        />
      </div>
      <div className="relative flex h-[45px] w-[45px] items-center justify-center rounded-lg bg-white">
        <Image
          src="/assets/sponsor/sponsor-2.png"
          alt=""
          fill
          objectFit="contain"
        />
      </div>
      <div className="relative flex h-[45px] w-[45px] items-center justify-center rounded-lg bg-white">
        <Image
          src="/assets/sponsor/sponsor-3.png"
          alt=""
          fill
          objectFit="contain"
        />
      </div>
    </div>
  );
}
