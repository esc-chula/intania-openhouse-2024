"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CustomBackground() {
  const newBackgroundNumber = Math.floor(Math.random() * 3) + 1;

  const [backgroundNumber, setBackgroundNumber] = useState<number | null>(null);

  useEffect(() => {
    if (backgroundNumber === 0) {
      localStorage.setItem("backgroundNumber", newBackgroundNumber.toString());
      return setBackgroundNumber(newBackgroundNumber);
    }

    return setBackgroundNumber(
      parseInt(localStorage.getItem("backgroundNumber") ?? "0"),
    );
  }, [backgroundNumber, newBackgroundNumber]);

  return (
    <Image
      src={`/assets/background/background-${backgroundNumber}.webp`}
      alt="Background"
      fill
      className="select-none object-cover"
      priority
      loading="eager"
    />
  );
}
