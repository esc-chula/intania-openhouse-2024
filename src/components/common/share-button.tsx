"use client";

import html2canvas from "html2canvas";
import { FiShare } from "react-icons/fi";
import Button from "../ui/button";

export default function ShareButton() {
  return (
    <Button
      variant="ghost"
      className=" w-36"
      onClick={() => {
        html2canvas(document.querySelector("#sharePicture")!).then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL();
          link.download = "intania-open-house-2024.png";
          link.click();
        });
      }}
    >
      <FiShare className="mr-2.5 h-[18px]  w-[18px]" />
      แชร์
    </Button>
  );
}
