import Image from "next/image";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const backgroundNumber = Math.floor(Math.random() * 3) + 1;

  return (
    <div className="flex h-svh w-full justify-center">
      <div className="h-full w-full max-w-2xl">
        <div className="relative h-full w-full">
          <div className="absolute z-10 h-full w-full overflow-y-auto px-6">
            {children}
          </div>
          <div className="absolute z-0 h-full w-full">
            <Image
              src={`/assets/background/background-${backgroundNumber}.webp`}
              alt="Background"
              fill
              className="select-none object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
