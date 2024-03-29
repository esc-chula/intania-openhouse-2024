import IntaniaOPH2024Logo from "@/components/common/logo";
import Button from "@/components/ui/button";
import { OPEN_REGISTRATION } from "@/constants/registration";
import Link from "next/link";
import { FiInstagram } from "react-icons/fi";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-end space-y-[40%]">
      <div className="w-full space-y-3 text-center">
        <div className="relative flex h-40 justify-center">
          <IntaniaOPH2024Logo className="sm:scale-125" />
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

          <Link href="/register">
            <Button variant="ghost" className="w-52">
              {OPEN_REGISTRATION
                ? "ลงทะเบียน Workshop"
                : "ผลลงทะเบียน Workshop"}
            </Button>
          </Link>

          <Link href="/CUIIC">
            <Button variant="ghost" className="w-52">
              ผลงาน CUIIC
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
