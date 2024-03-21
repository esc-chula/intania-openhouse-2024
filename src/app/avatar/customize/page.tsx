"use client";

import Avatar from "@/components/common/avatar";
import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tab from "../components/tab";

export default function AvatarCustomize() {
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
  const [tab, setTab] = useState("base");

  useEffect(() => {
    localStorage.setItem("option", JSON.stringify(option));
  }, [option]);

  const optionImages = {
    base: ["1", "2", "3", "4", "5"],
    eyes: [
      "1-black",
      "1-blue",
      "1-brown",
      "1-green",
      "1-grey",
      "1-pink",
      "4",
      "5",
      "6",
    ],
    eyebrows: ["1", "2", "3"],
    shirt: ["1-black", "1-grey", "1-red", "1-white"],
    outer: ["1"],
    hair: ["1-brown"],
  };

  const handleOptionChange = (tab: string, image: string) => {
    setOption({ ...option, [tab]: image });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pb-9">
      <Header />

      <div className="relative flex h-fit w-full flex-col items-center justify-center gap-6 rounded-[30px] bg-button-glass shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 backdrop-blur-sm">
        <Avatar option={option} className="h-80 w-60" />
      </div>

      <div className="flex h-72 w-full flex-col items-center rounded-[30px] bg-button-solid shadow-button-solid">
        <div className="flex w-full justify-between gap-6 px-6 py-2 text-sm font-bold text-secondary ">
          <Tab tab={tab} setTab={setTab} name="outer">
            ชุด
          </Tab>
          <Tab tab={tab} setTab={setTab} name="base">
            ร่างกาย
          </Tab>
          <Tab tab={tab} setTab={setTab} name="eyes">
            ตา
          </Tab>
          <Tab tab={tab} setTab={setTab} name="eyebrows">
            คิ้ว
          </Tab>
          <Tab tab={tab} setTab={setTab} name="hair">
            ผม
          </Tab>
          <Tab tab={tab} setTab={setTab} name="shirt">
            ช่วงบน
          </Tab>
        </div>
        <div className="flex h-full w-full flex-wrap items-start overflow-scroll">
          {optionImages[tab as keyof typeof optionImages].map(
            (optionImage: string) => (
              <button
                key={tab + optionImage}
                onClick={() => handleOptionChange(tab, optionImage)}
                className="w-1/3 object-cover"
              >
                <Image
                  src={`/assets/avatar/${tab}/${tab}-${optionImage}.PNG`}
                  key={tab + optionImage}
                  alt=""
                  width={900}
                  height={1200}
                  style={{ objectFit: "cover" }}
                />
              </button>
            ),
          )}
        </div>
      </div>

      <Link href="/avatar/confirm">
        <Button size="default" className="w-36">
          ไปต่อ
        </Button>
      </Link>
    </div>
  );
}
