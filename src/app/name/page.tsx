"use client";

import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Name() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stageTimeout = setTimeout(() => {
      setStage(1);
    }, 3500);

    return () => clearTimeout(stageTimeout);
  }, []);

  const isBlank = name === "";

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pb-9">
      <Header />
      {stage === 1 ? (
        <>
          <div className="animate-fade-in pb-10">
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
          <Button
            size="default"
            className="w-36"
            onClick={() => {
              localStorage.setItem("name", name);
              router.push("/avatar");
            }}
            disabled={isBlank}
          >
            ไปต่อ
          </Button>
        </>
      ) : (
        <>
          <p id="welcome" className="animate-fade-in pb-20 text-2xl font-bold">
            ขอให้เรารู้จักชื่อหน่อยสิ...
          </p>
          <div></div>
        </>
      )}
    </div>
  );
}
