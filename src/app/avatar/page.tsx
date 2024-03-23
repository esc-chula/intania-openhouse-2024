"use client";

import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AvatarOnboard() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    return setName(localStorage.getItem("name") ?? "");
  }, [name]);

  useEffect(() => {
    const stageTimeout = setTimeout(() => {
      setStage(1);
    }, 5000);

    const buttonTimeout = setTimeout(() => {
      setDone(true);
    }, 9000);

    return () => {
      clearTimeout(stageTimeout);
      clearTimeout(buttonTimeout);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pb-9">
      <Header />
      <div className="pb-10">
        {stage === 1 ? (
          <div className="animate-fade-in text-center text-2xl font-bold">
            ก่อนอื่นเลยมาแต่งตัวให้เหมือนกับเด็กวิศวะกันก่อนดีกว่า!
          </div>
        ) : (
          <p className="animate-fade-in text-center text-2xl font-bold">
            ยินดีต้อนรับ {name} สู่
            <br />
            รั้วปราสาทแดง
            <br />
            หรือที่เราเรียกกันว่า
            <br />
            วิศวฯจุฬาฯ!
          </p>
        )}
      </div>

      {done ? (
        <Button
          onClick={() => {
            router.push("/avatar/customize");
          }}
          className="w-36 animate-fade-in"
          disabled={!done}
        >
          ไปต่อ
        </Button>
      ) : (
        <div className="h-10"></div>
      )}
    </div>
  );
}
