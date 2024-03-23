"use client";

import Avatar from "@/components/common/avatar";
import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiShare } from "react-icons/fi";

export default function Dept() {
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

  useEffect(() => {
    setOption(JSON.parse(localStorage.getItem("option") ?? "{}"));
  }, []);

  return (
    <>
      <Header back />
      <div className="flex flex-col space-y-8 pb-8">
        <div className="flex w-full flex-col items-center gap-7">
          <div className="flex w-full px-2">
            <div className="relative flex h-[22rem] w-full rounded-[30px] bg-button-glass p-3 shadow-button-glass ring-[1.5px] ring-white ring-opacity-30">
              <div className="relative flex h-full w-full justify-center rounded-[18px] bg-[#D9D9D9]">
                <Avatar option={option} className="h-80 w-80" />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <h1 className="text-4xl font-bold">วิชาคอมป้อก</h1>
            <h2 className="text-xl font-bold opacity-80">
              สาชาวิชาวิศวะกรรมคอมพิวเตอร์
            </h2>
          </div>
          <div>
            <p className="opacity-80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <Link href="/register">
            <Button variant="default" className="w-48">
              จอง Workshop
            </Button>
          </Link>
          <Button variant="ghost" className=" w-36">
            <FiShare className="mr-2.5 h-[18px]  w-[18px]" />
            แชร์
          </Button>
        </div>
      </div>
    </>
  );
}
