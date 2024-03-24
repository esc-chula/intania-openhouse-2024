"use client";

import { optionImages } from "@/constants/avatar";
import { cn } from "@/utils/cn";

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
    <div className={cn("relative w-full", className)}>
      {option.base && (
        <picture>
          <img
            src={`/assets/avatar/base/base-${option.base}.PNG`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[1]`}
            loading="eager"
          />
        </picture>
      )}
      {option.eyes && (
        <picture>
          <img
            src={`/assets/avatar/eyes/eyes-${option.eyes}.PNG`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[2]`}
            loading="eager"
          />
        </picture>
      )}
      {option.eyebrows && (
        <picture>
          <img
            src={`/assets/avatar/eyebrows/eyebrows-${option.eyebrows}.PNG`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[3]`}
            loading="eager"
          />
        </picture>
      )}
      {option.hair && (
        <picture>
          <img
            src={`/assets/avatar/hair/hair-${option.hair}.PNG`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[4]`}
            loading="eager"
          />
        </picture>
      )}
      {option.shirt && (
        <picture>
          <img
            src={`/assets/avatar/shirt/shirt-${option.shirt}.PNG`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[5]`}
            loading="eager"
          />
        </picture>
      )}
      {option.shoes && (
        <picture>
          <img
            src={`/assets/avatar/shoes/shoes-${option.shoes}.PNG`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[6]`}
            loading="eager"
          />
        </picture>
      )}
      {option.pants && (
        <picture>
          <img
            src={`/assets/avatar/pants/pants-${option.pants}.PNG`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[7]`}
          />
        </picture>
      )}
      {option.outer && (
        <picture>
          <img
            src={`/assets/avatar/outer/outer-${option.outer}.PNG`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[8]`}
            loading="eager"
          />
        </picture>
      )}
    </div>
  );
}
