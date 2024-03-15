"use client";

import Header from "@/components/common/header";
import { useEffect, useState } from "react";
import Customize from "./_pages/Customize";
import Onboard from "./_pages/Onboard";
import Summary from "./_pages/Summary";

export default function Avatar() {
  const [name, setName] = useState("");
  const [page, setPage] = useState("onboard");

  useEffect(() => {
    return setName(localStorage.getItem("name") ?? "");
  }, [name]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pb-14 pt-5">
      <Header />
      {page === "onboard" && <Onboard name={name} setPage={setPage} />}
      {page === "customize" && <Customize name={name} setPage={setPage} />}
      {page === "summary" && <Summary name={name} />}
    </div>
  );
}
