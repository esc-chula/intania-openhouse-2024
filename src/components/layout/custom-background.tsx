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

  if (backgroundNumber === null) return null;

  return (
    <Image
      src={`https://firebasestorage.googleapis.com/v0/b/intania-open-house.appspot.com/o/background%2Fbackground-${backgroundNumber}.webp?alt=media`}
      alt="Background"
      fill
      className="select-none object-cover"
      priority
      loading="eager"
      sizes="100vw"
    />
  );
}
