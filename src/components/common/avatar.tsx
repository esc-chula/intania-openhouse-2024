import { optionImages } from "@/constants/avatar";
import { cn } from "@/utils/cn";
import Image from "next/image";

interface AvatarProps {
  option: {
    base: (typeof optionImages.base)[number];
    eyes: (typeof optionImages.eyes)[number];
    eyebrows: (typeof optionImages.eyebrows)[number];
    hair: (typeof optionImages.hair)[number];
    shirt: (typeof optionImages.shirt)[number];
    shoes: (typeof optionImages.shoes)[number];
    pants: (typeof optionImages.pants)[number];
    outer: (typeof optionImages.outer)[number];
  };
  className?: string;
}

export default function Avatar({ option, className }: AvatarProps) {
  return (
    <div className={cn("relative", className)}>
      {option.base && (
        <Image
          src={`/assets/avatar/base/base-${option.base}.PNG`}
          alt="Avatar"
          fill
          className="absolute z-[1] object-contain"
        />
      )}
      {option.eyes && (
        <Image
          src={`/assets/avatar/eyes/eyes-${option.eyes}.PNG`}
          alt="Avatar"
          fill
          className="absolute z-[2] object-contain"
        />
      )}
      {option.eyebrows && (
        <Image
          src={`/assets/avatar/eyebrows/eyebrows-${option.eyebrows}.PNG`}
          alt="Avatar"
          fill
          className="absolute z-[3] object-contain"
        />
      )}
      {option.hair && (
        <Image
          src={`/assets/avatar/hair/hair-${option.hair}.PNG`}
          alt="Avatar"
          fill
          className="absolute z-[4] object-contain"
        />
      )}
      {option.shirt && (
        <Image
          src={`/assets/avatar/shirt/shirt-${option.shirt}.PNG`}
          alt="Avatar"
          fill
          className="absolute z-[5] object-contain"
        />
      )}
      {option.shoes && (
        <Image
          src={`/assets/avatar/shoes/shoes-${option.shoes}.PNG`}
          alt="Avatar"
          fill
          className="absolute z-[6] object-contain"
        />
      )}
      {option.pants && (
        <Image
          src={`/assets/avatar/pants/pants-${option.pants}.PNG`}
          alt="Avatar"
          fill
          className="absolute z-[7] object-contain"
        />
      )}
      {option.outer && (
        <Image
          src={`/assets/avatar/outer/outer-${option.outer}.PNG`}
          alt="Avatar"
          fill
          className="absolute z-[8] object-contain"
        />
      )}
    </div>
  );
}
