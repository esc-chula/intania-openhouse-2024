import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function Classes() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between pb-9">
      <Header />
      <div className="flex items-center justify-center text-center">
        <p className="animate-fade-in text-2xl font-bold">
          ทีนี้ก็เหมือนเด็กวิศวฯจุฬาฯแล้ว
          <br />
          พร้อมแล้วหรือยังที่จะมาเรียนแบบวิศวฯกัน!
        </p>
      </div>
      <Link href="/classes/thai">
        <Button size="default" className="w-36">
          ไปต่อ
        </Button>
      </Link>
    </div>
  );
}
