"use client";

import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="flex h-full w-full flex-col items-center justify-between pb-9">
      <Header />
      {stage === 1 ? (
        <div className="animate-fade-in">
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="ชื่อเล่น"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
