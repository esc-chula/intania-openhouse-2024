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
        html2canvas(document.querySelector("#sharePicture")!, {
          allowTaint: true,
          useCORS: true,
        }).then((canvas) => {
          const dataURL = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = dataURL;
          a.download = "intania-open-house-2024.png";
          a.click();
        });
      }}
    >
      <FiShare className="mr-2.5 h-[18px]  w-[18px]" />
      แชร์
    </Button>
  );
}
