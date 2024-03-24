"use client";

import Header from "@/components/common/header";
import LocalAvatar from "@/components/common/local-avatar";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AvatarConfirm() {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name") ?? "");
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pb-9">
      <Header />
      <div className="relative flex h-fit w-full flex-col items-center justify-center rounded-[30px] bg-button-glass pt-8 shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 backdrop-blur-sm">
        <p className="absolute top-4 text-2xl font-bold">{name}</p>
        <LocalAvatar className="h-96 w-72" />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-center text-sm font-bold">
          พร้อมแล้วใช่มั้ย ไปกันต่อ~~
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
