"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function BackButton({
  href
}: {
  href?: string
}) {
  const router = useRouter();

  const goBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  }

  return (
    <button
      onClick={goBack}
      className="absolute left-1 top-5 grid h-8 w-8 place-content-center rounded-full bg-transparent bg-button-glass shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 backdrop-blur-sm"
    >
      <FiChevronLeft className="text-xl" />
    </button>
  );
}
