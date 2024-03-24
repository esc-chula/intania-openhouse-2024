"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="absolute left-1 top-5 grid h-8 w-8 place-content-center rounded-full bg-transparent bg-button-glass shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 backdrop-blur-sm"
    >
      <FiChevronLeft className="text-xl" />
    </button>
  );
}
