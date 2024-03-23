import { cn } from "@/utils/cn";
import Image from "next/image";

interface AvatarProps {
  option: {
    base: string;
    eyes: string;
    eyebrows: string;
    hair: string;
    shirt: string;
    shoes: string;
    pants: string;
    outer: string;
  };
  className?: string; // Add className property
}

export default function Avatar({ option, className }: AvatarProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={`/assets/avatar/base/base-${option.base}.PNG`}
        alt="Avatar"
        fill
        className="absolute z-[1] object-contain"
      />
      <Image
        src={`/assets/avatar/eyes/eyes-${option.eyes}.PNG`}
        alt="Avatar"
        fill
        className="absolute z-[2] object-contain"
      />
      <Image
        src={`/assets/avatar/eyebrows/eyebrows-${option.eyebrows}.PNG`}
        alt="Avatar"
        fill
        className="absolute z-[3] object-contain"
      />
      <Image
        src={`/assets/avatar/hair/hair-${option.hair}.PNG`}
        alt="Avatar"
        fill
        className="absolute z-[4] object-contain"
      />
      <Image
        src={`/assets/avatar/shirt/shirt-${option.shirt}.PNG`}
        alt="Avatar"
        fill
        className="absolute z-[5] object-contain"
      />
      <Image
        src={`/assets/avatar/shoes/shoes-${option.shoes}.PNG`}
        alt="Avatar"
        fill
        className="absolute z-[6] object-contain"
      />
      <Image
        src={`/assets/avatar/pants/pants-${option.pants}.PNG`}
        alt="Avatar"
        fill
        className="absolute z-[7] object-contain"
      />
      <Image
        src={`/assets/avatar/outer/outer-${option.outer}.PNG`}
        alt="Avatar"
        fill
        className="absolute z-[8] object-contain"
      />
    </div>
  );
}
