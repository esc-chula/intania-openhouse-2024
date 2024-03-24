"use client";

import Avatar from "@/components/common/avatar";
import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import { initialOption } from "@/constants/avatar";
import html2canvas from "html2canvas";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiShare } from "react-icons/fi";

export default function SharePage() {
  function handleShare() {
    html2canvas(document.querySelector("#sharePicture")!).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "intania-open-house-2024.png";
      a.click();
    });
  }

  const [name, setName] = useState("");
  const [backgroundNumber, setBackgroundNumber] = useState(1);
  const [option, setOption] = useState(initialOption);

  useEffect(() => {}, []);
  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setOption(JSON.parse(localStorage.getItem("option") ?? "{}"));
    setBackgroundNumber(
      parseInt(localStorage.getItem("backgroundNumber") || "1"),
    );
  }, []);

  return (
    <>
      <div
        className="z-50 flex h-[852px] w-[480px] flex-col items-center px-7 py-3"
        id="sharePicture"
      >
        <div className="absolute top-0 -z-10 h-full w-full">
          <Image
            src={`/assets/background/background-${backgroundNumber}.webp`}
            alt="Background"
            fill
            className="select-none rounded-[18px] object-cover"
          />
        </div>
        <Header />
        <div className="relative mb-6 mt-4 flex h-[496px] w-full">
          <Image src={`/assets/frame/character-frame.svg`} alt="" fill></Image>
          <div className=" absolute m-4 flex h-[464px] w-[392px] justify-center rounded-[18px] bg-[#D9D9D9]">
            <Avatar option={option} className="h-[464px] w-[348px]" />
          </div>
        </div>
        <div className="mb-8 flex flex-col items-center gap-3">
          <p className="text-3xl font-bold">{name} 0.5 ICE</p>
          <p className="text-xl font-bold">
            ลานเกียร์ก็สะดุด ชอบเขียนโค้ดสุด ๆ ก็เราไง
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xl font-bold opacity-80">30 - 31 March 2024</p>
          <p className="text-xs opacity-80">
            @Faculty of Engineering <br /> Chulalongkorn University
          </p>
        </div>
      </div>
      <Button variant="ghost" className=" w-36" onClick={handleShare}>
        <FiShare className="mr-2.5 h-[18px]  w-[18px]" />
        แชร์
      </Button>
    </>
  );
}
