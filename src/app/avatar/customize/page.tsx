"use client";

import Avatar from "@/components/common/avatar";
import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import {
  canBeEmpty,
  initialOption,
  optionImages,
  optionName,
  zoomedOptions,
} from "@/constants/avatar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineStop } from "react-icons/ai";

export default function AvatarCustomize() {
  const [option, setOption] = useState(initialOption);
  const [tab, setTab] = useState<keyof typeof optionImages>("base");

  useEffect(() => {
    localStorage.setItem("option", JSON.stringify(option));
  }, [option]);

  const handleOptionChange = (tab: string, image: string) => {
    setOption({ ...option, [tab]: image });
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header />

      <div className="relative mb-8 flex h-fit w-full flex-col items-center justify-center gap-6 rounded-[30px] bg-button-glass shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 backdrop-blur-sm">
        <Avatar option={option} className="h-80 w-60" />
      </div>

      <div className="mb-8 flex w-full flex-col items-center rounded-[30px] bg-button-solid shadow-button-solid">
        <div className="max-w flex w-full justify-between gap-6 overflow-x-scroll whitespace-nowrap px-6 py-3 text-sm font-bold text-secondary shadow-md shadow-black/5">
          {Object.keys(optionImages).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key as keyof typeof optionImages)}
              className={`${tab === key ? "text-primary" : "text-secondary"}`}
            >
              {optionName[key as keyof typeof optionName]}
            </button>
          ))}
        </div>
        <div className="flex h-full w-full flex-wrap items-start overflow-hidden rounded-b-[30px]">
          {canBeEmpty.includes(tab) && (
            <button
              onClick={() => handleOptionChange(tab, "")}
              className={`-mb-1 grid aspect-[10/13] w-1/3 place-content-center ${option[tab as keyof typeof option] === "" ? "bg-black/5" : ""}`}
            >
              <AiOutlineStop className="text-3xl text-black/10" />
            </button>
          )}
          {optionImages[tab as keyof typeof optionImages].map(
            (optionImage: string) => (
              <button
                key={tab + optionImage}
                onClick={() => handleOptionChange(tab, optionImage)}
                className={`-mb-1 aspect-[10/13] w-1/3 ${option[tab as keyof typeof option] === optionImage ? "bg-black/5" : ""}`}
              >
                <div className="relative h-full">
                  <Image
                    src={`/assets/avatar/${tab}/${tab}-${optionImage}.PNG`}
                    key={tab + optionImage}
                    alt=""
                    fill
                    priority
                    loading="eager"
                    className={`object-cover ${zoomedOptions.includes(tab) ? "absolute scale-150" : ""}`}
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
