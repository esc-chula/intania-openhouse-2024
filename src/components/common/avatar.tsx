"use client";

import { initialOption } from "@/constants/avatar";
import { cn } from "@/utils/cn";

interface AvatarProps {
  option: typeof initialOption;
  className?: string;
}

export default function Avatar({ option, className }: AvatarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {option.base && (
        <picture>
          <img
            src={`/assets/avatar/base/${option.base}.png`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[1]`}
            loading="eager"
          />
        </picture>
      )}
      {option.eyes && (
        <picture>
          <img
            src={`/assets/avatar/eyes/${`${option.eyes.split("-")[0]}-${option.eyes.split("-")[1]}`}/${option.eyes.split("-")[2]}.png`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[2]`}
            loading="eager"
          />
        </picture>
      )}
      {option.eyebrows && (
        <picture>
          <img
            src={`/assets/avatar/eyebrows/${option.eyebrows}.png`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[3]`}
            loading="eager"
          />
        </picture>
      )}
      {option.hair && (
        <picture>
          <img
            src={`/assets/avatar/hair/${`${option.hair.split("-")[0]}-${option.hair.split("-")[1]}`}/${option.hair.split("-")[2]}.png`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[4]`}
            loading="eager"
          />
        </picture>
      )}
      {option.shirt && (
        <picture>
          <img
            src={`/assets/avatar/shirt/${`${option.shirt.split("-")[0]}-${option.shirt.split("-")[1]}`}/${option.shirt.split("-")[2]}.png`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[${option.tucked ? 5 : 6}]`}
            loading="eager"
          />
        </picture>
      )}
      {option.pants && (
        <picture>
          <img
            src={`/assets/avatar/pants/${`${option.pants.split("-")[0]}-${option.pants.split("-")[1]}`}/${option.pants.split("-")[2]}.png`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[${option.tucked ? 6 : 5}]`}
          />
        </picture>
      )}
      {option.shoes && (
        <picture>
          <img
            src={`/assets/avatar/shoes/${`${option.shoes.split("-")[0]}-${option.shoes.split("-")[1]}`}/${option.shoes.split("-")[2]}.png`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[7]`}
            loading="eager"
          />
        </picture>
      )}
      {option.outer && (
        <picture>
          <img
            src={`/assets/avatar/outer/${`${option.outer.split("-")[0]}-${option.outer.split("-")[1]}`}/${option.outer.split("-")[2]}.png`}
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[8]`}
            loading="eager"
          />
        </picture>
      )}
    </div>
  );
}
