import Button from "@/components/ui/button";
import Link from "next/link";

export default function Selector({ select }: { select: "thai" | "inter" }) {
  return (
    <div className="mb-7 mt-5 flex w-full items-center justify-between gap-4 px-2">
      <Link href="/classes/thai">
        <Button
          size="default"
          className="w-36"
          variant={select === "thai" ? "default" : "ghost"}
        >
          ภาคไทย
        </Button>
      </Link>
      <Link href="/classes/inter">
        <Button
          size="default"
          className="w-36"
          variant={select === "thai" ? "ghost" : "default"}
        >
          ภาคอินเตอร์
        </Button>
      </Link>
    </div>
  );
}
