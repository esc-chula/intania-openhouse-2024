"use client";

import Header from "@/components/common/header";
import LocalAvatar from "@/components/common/local-avatar";
import CustomBackground from "@/components/layout/custom-background";
import Button from "@/components/ui/button";
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

  useEffect(() => {
    return setName(localStorage.getItem("name") || "");
  }, [name]);

  return (
    <>
      <div
        id="sharePicture"
        className="bg-red-5003 fixed left-0 top-0 z-50 h-[1920px] w-[1080px] overflow-hidden"
      >
        <div className="absolute z-10 flex h-full w-full scale-[2] flex-col items-center space-y-[10px] pt-[500px]">
          <Header />
          <div className="flex flex-col items-center space-y-[36px]">
            <div className="relative flex h-[540px] w-[460px] items-center justify-center p-[16px]">
              <div className="z-10 flex h-full w-full justify-center rounded-[18px] bg-gray-300">
                <LocalAvatar className="h-full w-full" />
              </div>
              <Image
                src={`/assets/frame/character-frame.svg`}
                alt=""
                fill
                className="backdrop-blur-md"
              ></Image>
            </div>
            <div className="mb-8 flex flex-col items-center gap-3">
              <p className="text-3xl font-bold">{name} 0.5 ICE</p>
              <p className="text-xl font-bold">
                ลานเกียร์ก็สะดุด ชอบเขียนโค้ดสุด ๆ ก็เราไง
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <p className="text-xl font-bold opacity-80">30 - 31 March 2024</p>
              <p className="text-xs opacity-80">
                @Faculty of Engineering <br /> Chulalongkorn University
              </p>
            </div>
          </div>
        </div>
        <CustomBackground />
      </div>
      <Button variant="ghost" className=" w-36" onClick={handleShare}>
        <FiShare className="mr-2.5 h-[18px]  w-[18px]" />
        แชร์
      </Button>
    </>
  );
}
