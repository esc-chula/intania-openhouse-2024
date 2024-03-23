"use client";

import Tab from "@/components/avatar/tab";
import Avatar from "@/components/common/avatar";
import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import { initialOption, optionImages } from "@/constants/avatar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AvatarCustomize() {
  const [option, setOption] = useState(initialOption);
  const [tab, setTab] = useState<keyof typeof optionImages>("base");

  useEffect(() => {
    localStorage.setItem("option", JSON.stringify(option));
  }, [option]);

  const zoomed = ["eyes", "eyebrows", "outer", "shirt"];

  const handleOptionChange = (tab: string, image: string) => {
    setOption({ ...option, [tab]: image });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <Header />

      <div className="relative mb-8 flex h-fit w-full flex-col items-center justify-center gap-6 rounded-[30px] bg-button-glass shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 backdrop-blur-sm">
        <Avatar option={option} className="h-80 w-60" />
      </div>

      <div className="mb-8 flex w-full flex-col items-center rounded-[30px] bg-button-solid shadow-button-solid">
        <div className="max-w flex w-full justify-between gap-6 overflow-x-scroll whitespace-nowrap px-6 py-3 text-sm font-bold text-secondary shadow-md shadow-black/5">
          <Tab tab={tab} setTab={setTab} name="base">
            ร่างกาย
          </Tab>
          <Tab tab={tab} setTab={setTab} name="hair">
            ผม
          </Tab>
          <Tab tab={tab} setTab={setTab} name="eyes">
            ตา
          </Tab>
          <Tab tab={tab} setTab={setTab} name="eyebrows">
            คิ้ว
          </Tab>
          <Tab tab={tab} setTab={setTab} name="outer">
            เสื้อคลุม
          </Tab>
          <Tab tab={tab} setTab={setTab} name="shirt">
            เสื้อ
          </Tab>
        </div>
        <div className="flex h-full w-full flex-wrap items-start overflow-hidden rounded-b-[30px]">
          {optionImages[tab as keyof typeof optionImages].map(
            (optionImage: string) => (
              <button
                key={tab + optionImage}
                onClick={() => handleOptionChange(tab, optionImage)}
                className={`-mb-1 h-40 w-1/3 ${option[tab as keyof typeof option] === optionImage ? "bg-black/5" : ""}`}
              >
                <div className="relative h-full">
                  <Image
                    src={`/assets/avatar/${tab}/${tab}-${optionImage}.PNG`}
                    key={tab + optionImage}
                    alt=""
                    fill
                    priority
                    loading="eager"
                    className={`object-cover ${zoomed.includes(tab) ? "scale-150" : ""}`}
                    quality={10}
                  />
                </div>
              </button>
            ),
          )}
        </div>
      </div>

      <div className="pb-9">
        <Link href="/avatar/confirm">
          <Button size="default" className="w-36">
            ยืนยัน
          </Button>
        </Link>
      </div>
    </div>
  );
}
