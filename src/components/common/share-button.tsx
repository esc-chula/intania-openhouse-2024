"use client";

import Departments from "@/data/departments.json";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { FiShare } from "react-icons/fi";
import Button from "../ui/button";
import Header from "./header";
import LocalAvatar from "./local-avatar";

export default function ShareButton({
  department,
}: {
  department: (typeof Departments)[number];
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    return setName(localStorage.getItem("name") || "");
  }, [name]);

  const shareRef = useRef<HTMLDivElement>(null);

  const screenshot = () => {
    if (!shareRef.current) return;
    html2canvas(shareRef.current).then((canvas) => {
      const image = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = image;
      a.download = "intania-open-house-2024.png";
      a.click();
    });
  };

  return (
    <>
      <div
        ref={shareRef}
        className="pointer-events-none fixed -top-[1000px] left-0 overflow-hidden"
      >
        <div className="relative aspect-[9/16] h-[1000px]">
          <div className="absolute z-10 flex h-full w-full flex-col pt-6">
            <Header />
            <div className="flex w-full flex-col items-center space-y-[48px] pt-6">
              <div className="relative flex h-[540px] w-full items-center justify-center">
                <div className="absolute bottom-1 left-14 right-14 top-1 z-10 flex items-end justify-center rounded-[18px] bg-[url('/assets/avatar/background.webp')] bg-cover bg-bottom">
                  <LocalAvatar
                    className="-mb-6 scale-90"
                    useLocalImage
                    hideShadow
                  />
                </div>
                <div className="absolute scale-[1.15]">
                  <picture>
                    <img
                      src={`/assets/frame/character-frame.svg`}
                      alt="frame"
                      width={580}
                      height={480}
                      className="h-full w-full backdrop-blur-md"
                    />
                  </picture>
                </div>
              </div>
              <div className="flex scale-110 flex-col items-center gap-3">
                <p className="text-3xl font-bold">
                  {name} 0.5 {department.name.short}
                </p>
                <p className="text-xl font-bold">{department.quote}</p>
              </div>
              <div className="flex scale-110 flex-col items-center space-y-2">
                <p className="text-xl font-bold opacity-80">
                  30 - 31 March 2024
                </p>
                <p className="text-sm opacity-80">
                  @Faculty of Engineering <br /> Chulalongkorn University
                </p>
              </div>
            </div>
          </div>
          <div className="absolute h-full w-full">
            <picture className="">
              <img
                src={`/assets/background/background-${department.background}.webp`}
                alt="background"
                height={1920}
                width={1080}
                className="h-full w-full"
              />
            </picture>
          </div>
        </div>
      </div>
      <Button variant="default" className="w-44" onClick={screenshot}>
        <FiShare className="mr-2.5 h-[18px] w-[18px]" />
        แชร์ลงไอจี!
      </Button>
    </>
  );
}
