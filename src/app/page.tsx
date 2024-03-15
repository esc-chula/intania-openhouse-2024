import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FiInstagram } from "react-icons/fi";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-end space-y-[40%]">
      <div className="space-y-3 text-center">
        <div className="relative h-40 w-96">
          <Image
            src="/assets/logo/intania-oph-2024.svg"
            alt="Intania Open House 2024 Logo"
            fill
            className="select-none"
            priority
            loading="eager"
          />
        </div>
        <div>
          <p className="text-2xl font-bold">
            เปิดบ้านคณะวิศวกรรมศาสตร์
            <br />
            จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-9 pb-5">
        <div className="flex flex-col items-center space-y-5">
          <Link href="/name">
            <Button size="lg" className="w-52">
              เริ่มเลย!
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-40">
              Intania Tour
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-40">
              CUIIC
            </Button>
          </Link>
        </div>
        <div>
          <a
            href="https://www.instagram.com/cuintaniaopenhouse/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 font-bold"
          >
            <FiInstagram size={20} />
            <span>cuintaniaopenhouse</span>
          </a>
        </div>
      </div>
    </div>
  );
}
