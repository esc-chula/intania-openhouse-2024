"use client";

import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Name() {
  const [name, setName] = useState("");
  const [stage, setStage] = useState(0);

  setTimeout(() => {
    setStage(1);
  }, 2000);

  const isBlank = name === "";

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pb-14 pt-5">
      <Header />
      {stage === 1 ? (
        <div className="relative animate-fade-in">
          <input
            id="name"
            name="name"
            type="text"
            className="peer h-10 w-[200px] rounded-[18px] bg-transparent bg-button-glass px-3.5 pt-1 text-[15px] font-bold text-white placeholder-transparent shadow-button-glass focus:outline-none"
            placeholder="ชื่อเล่น"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label
            htmlFor="name"
            className="absolute left-3.5 top-1.5 text-[6px] text-white transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-[15px]  peer-placeholder-shown:font-normal peer-placeholder-shown:text-white peer-placeholder-shown:opacity-50  peer-focus:top-1.5 peer-focus:text-[6px] peer-focus:text-white peer-focus:opacity-100"
          >
            ชื่อเล่น
          </label>
        </div>
      ) : (
        <p id="welcome" className="animate-fade-in text-2xl font-bold">
          ขอให้เรารู้จักชื่อคุณหน่อยย...
        </p>
      )}

      <Link href="/avatar" className={isBlank ? "pointer-events-none" : ""}>
        <Button
          size="default"
          className="w-36"
          onClick={() => {
            if (!isBlank) {
              localStorage.setItem("name", name);
            }
          }}
        >
          ไปต่อ
        </Button>
      </Link>
    </div>
  );
}
