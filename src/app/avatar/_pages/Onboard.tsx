import Button from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";

export default function Onboard({
  name,
  setPage,
}: {
  name: string;
  setPage: Dispatch<SetStateAction<string>>;
}) {
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);

  setTimeout(() => {
    setStage(1);
    setDone(true);
  }, 2000);

  return (
    <>
      {stage === 1 ? (
        <div className="animate-fade-in text-center text-2xl font-bold">
          ก่อนอื่นเลยมาแต่งตัวให้เหมือนกับเด็กวิศวะกันก่อนดีกว่า!
        </div>
      ) : (
        <p className="animate-fade-in text-center text-2xl font-bold">
          ยินดีต้อนรับ {name} สู่
          <br />
          ปราสาทแดง...
        </p>
      )}
      <Button
        size="default"
        className="w-36"
        onClick={() => {
          if (done) setPage("customize");
        }}
      >
        ไปต่อ
      </Button>
    </>
  );
}
