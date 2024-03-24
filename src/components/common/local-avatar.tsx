"use client";

import { initialOption } from "@/constants/avatar";
import { useEffect, useState } from "react";
import Avatar from "./avatar";

export default function LocalAvatar({ className }: { className?: string }) {
  const [option, setOption] = useState(initialOption);

  useEffect(() => {
    setOption(JSON.parse(localStorage.getItem("option") ?? "{}"));
  }, []);

  return <Avatar option={option} className={className} />;
}
