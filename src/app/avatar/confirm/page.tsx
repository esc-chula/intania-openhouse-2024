"use client";

import Avatar from "@/components/common/avatar";
import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AvatarConfirm() {
  const [name, setName] = useState("");
  const [option, setOption] = useState({
    base: "1",
    eyes: "1-black",
    eyebrows: "1",
    hair: "1-brown",
    shirt: "1-black",
    shoes: "1",
    pants: "1-jeans",
    outer: "1",
  });

  useEffect(() => {
    setOption(JSON.parse(localStorage.getItem("option") ?? "{}"));
    setName(localStorage.getItem("name") ?? "");
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pb-9">
      <Header />
      <div className="relative flex h-fit w-full flex-col items-center justify-center rounded-[30px] bg-button-glass pt-8 shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 backdrop-blur-sm">
        <p className="absolute top-4 text-2xl font-bold">{name}</p>
        <Avatar option={option} className="h-96 w-72" />
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
    </div>
  );
}
