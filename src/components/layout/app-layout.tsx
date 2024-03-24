import Header from "../common/header";
import CustomBackground from "./custom-background";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh w-full justify-center">
      <div className="h-full w-full max-w-2xl lg:hidden">
        <div className="relative h-full w-full">
          <div className="absolute z-10 h-full w-full overflow-y-auto px-6">
            {children}
          </div>
          <div className="absolute z-0 h-full w-full">
            <CustomBackground />
          </div>
        </div>
      </div>
      <div className="hidden flex-col items-center justify-center space-y-10 lg:flex">
        <div className="scale-[2]">
          <Header />
        </div>
        <p className="text-xl font-bold">
          กรุณาเข้าใช้งานผ่านมือถือหรือแท็บเล็ตเท่านั้นนะ
        </p>
      </div>
    </div>
  );
}
