"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("formData");
    router.push("/register");
  };

  return (
    <button
      onClick={handleClick}
      className="absolute right-6 top-5 grid h-9 w-9 place-content-center rounded-full bg-button-glass shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 backdrop-blur-sm"
    >
      <FiLogOut className="text-xl text-white" />
    </button>
  );
}
