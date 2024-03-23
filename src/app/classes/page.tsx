"use client";

import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Classes() {
  const [name, setName] = useState("");

  useEffect(() => {
    return setName(localStorage.getItem("name") ?? "");
  }, [name]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pb-9">
      <Header />
      <div className="flex items-center justify-center text-center">
        <p className="animate-fade-in text-2xl font-bold">
          ทีนี้ {name} ก็เหมือนเด็ก
          <br />
          วิศวฯจุฬาฯแล้ว เราไปลองเรียนแบบวิศวฯกัน!
        </p>
      </div>
      <Link href="/classes/thai">
        <Button size="default" className="w-36">
          ไปต่อ
        </Button>
      </Link>
    </div>
  );
}
