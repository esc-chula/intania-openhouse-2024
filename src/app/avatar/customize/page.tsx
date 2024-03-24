"use client";

import Avatar from "@/components/common/avatar";
import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import {
  canBeEmpty,
  initialOption,
  optionImages as initialOptionImages,
  optionName,
  zoomedOptions,
} from "@/constants/avatar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineStop } from "react-icons/ai";

export default function AvatarCustomize() {
  const [option, setOption] = useState(initialOption);
  const [tab, setTab] = useState<keyof typeof initialOptionImages>("base");
  const [optionImages, setOptionImages] = useState(initialOptionImages);
  const [colorOptions, setColorOptions] = useState<string[]>([]);

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
        <div className="max-w flex w-full justify-between gap-6 overflow-x-scroll whitespace-nowrap rounded-t-[30px] px-6 py-3 text-sm font-bold text-secondary shadow-md shadow-black/5">
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
          {Array.isArray(optionImages[tab as keyof typeof optionImages])
            ? (optionImages[tab as keyof typeof optionImages] as string[]).map(
                (optionImage) => (
                  <button
                    key={tab + optionImage}
                    onClick={() => handleOptionChange(tab, optionImage)}
                    className={`-mb-1 aspect-[10/13] w-1/3 ${option[tab as keyof typeof option] === optionImage ? "bg-black/5" : ""}`}
                  >
                    <div className="relative h-full">
                      <Image
                        src={`/assets/avatar/${tab}/${optionImage}.png`}
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
              )
            : Object.keys(optionImages[tab as keyof typeof optionImages]).map(
                (key) => {
                  const subOptions = optionImages[
                    tab as keyof typeof optionImages
                  ][key as keyof (typeof optionImages)[typeof tab]] as string[];

                  const hasColorOptions = subOptions.length > 1;

                  return (
                    <div
                      key={tab + key}
                      className="relative aspect-[10/13] w-1/3"
                    >
                      <button
                        onClick={() => {
                          if (hasColorOptions) {
                            setColorOptions(subOptions);
                            handleOptionChange(tab, `${key}-${subOptions[0]}`);
                            return;
                          }

                          setColorOptions([]);
                          handleOptionChange(tab, `${key}-${subOptions[0]}`);
                        }}
                        className={`relative -mb-1 h-full w-full ${option[tab as keyof typeof option] === `${key}-${subOptions[0]}` ? "bg-black/5" : ""}`}
                      >
                        <div className="relative h-full">
                          <Image
                            src={`/assets/avatar/${tab}/${key}/${subOptions[0]}.png`}
                            key={tab + key}
                            alt=""
                            fill
                            priority
                            loading="eager"
                            className={`object-cover ${zoomedOptions.includes(tab) ? "absolute scale-150" : ""}`}
                            quality={10}
                          />
                        </div>
                      </button>
                      {colorOptions.length > 0 &&
                      option[tab as keyof typeof option] ===
                        `${key}-${subOptions[0]}` ? (
                        <>
                          <div className="fixed bottom-4 left-2 right-2 z-50 rounded-2xl bg-button-solid px-4 shadow-xl">
                            {colorOptions.map((colorOption) => (
                              <button
                                key={colorOption}
                                onClick={() => {
                                  handleOptionChange(
                                    tab,
                                    `${key}-${colorOption}`,
                                  );
                                  setColorOptions([]);
                                  setOptionImages({
                                    ...optionImages,
                                    [tab]: {
                                      ...optionImages[
                                        tab as keyof typeof optionImages
                                      ],
                                      [key]: [
                                        colorOption,
                                        ...subOptions.filter(
                                          (subOption) =>
                                            subOption !== colorOption,
                                        ),
                                      ],
                                    },
                                  });
                                }}
                                className={`aspect-square h-[12vh]`}
                              >
                                <div className="relative h-full">
                                  <picture>
                                    <img
                                      src={`/assets/avatar/${tab}/${key}/${colorOption}.png`}
                                      key={tab + key}
                                      alt=""
                                      loading="eager"
                                      className="object-cover"
                                    />
                                  </picture>
                                </div>
                              </button>
                            ))}
                          </div>
                          <div
                            onClick={() => setColorOptions([])}
                            className="fixed bottom-0 left-0 right-0 top-0 z-40"
                          ></div>
                        </>
                      ) : null}
                    </div>
                  );
                },
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
