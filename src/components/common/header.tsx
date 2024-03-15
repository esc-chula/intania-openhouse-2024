import Image from "next/image";

export default function Header() {
  return (
    <div className="flex h-20 w-full items-center justify-center">
      <div className="relative h-16 w-28">
        <Image
          src="/assets/logo/intania-oph-2024.svg"
          alt="Intania Open House 2024 Logo"
          fill
          priority
          className="select-none"
        />
      </div>
    </div>
  );
}
