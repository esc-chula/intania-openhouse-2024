"use client";

import { initialOption } from "@/constants/avatar";
import { cn } from "@/utils/cn";

interface AvatarProps {
  option: typeof initialOption;
  className?: string;
  useLocalImage?: boolean;
  hideShadow?: boolean;
}

export default function Avatar({
  option,
  className,
  useLocalImage,
  hideShadow,
}: AvatarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {!hideShadow && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="173"
          height="61"
          viewBox="0 0 173 61"
          fill="none"
          className="absolute bottom-[2%] left-1/2 z-0 -translate-x-1/2 transform"
        >
          <g opacity="0.18" filter="url(#filter0_f_212_52)">
            <ellipse cx="86.5" cy="30.5" rx="74.5" ry="18.5" fill="black" />
          </g>
          <defs>
            <filter
              id="filter0_f_212_52"
              x="0"
              y="0"
              width="173"
              height="61"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="6"
                result="effect1_foregroundBlur_212_52"
              />
            </filter>
          </defs>
        </svg>
      )}
      {option.base && (
        <picture>
          <img
            src={
              useLocalImage
                ? `/assets/avatar/base/${option.base}.png`
                : `https://firebasestorage.googleapis.com/v0/b/intania-open-house.appspot.com/o/avatar%2Fbase%2F${option.base}.png?alt=media`
            }
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[1]`}
            loading="eager"
          />
        </picture>
      )}
      {option.eyes && (
        <picture>
          <img
            src={
              useLocalImage
                ? `/assets/avatar/eyes/${`${option.eyes.split("-")[0]}-${option.eyes.split("-")[1]}`}/${option.eyes.split("-")[2]}.png`
                : `https://firebasestorage.googleapis.com/v0/b/intania-open-house.appspot.com/o/avatar%2Feyes%2F${`${option.eyes.split("-")[0]}-${option.eyes.split("-")[1]}`}%2F${option.eyes.split("-")[2]}.png?alt=media`
            }
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[2]`}
            loading="eager"
          />
        </picture>
      )}
      {option.eyebrows && (
        <picture>
          <img
            src={
              useLocalImage
                ? `/assets/avatar/eyebrows/${option.eyebrows}.png`
                : `https://firebasestorage.googleapis.com/v0/b/intania-open-house.appspot.com/o/avatar%2Feyebrows%2F${option.eyebrows}.png?alt=media`
            }
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[3]`}
            loading="eager"
          />
        </picture>
      )}
      {option.hair && (
        <picture>
          <img
            src={
              useLocalImage
                ? `/assets/avatar/hair/${`${option.hair.split("-")[0]}-${option.hair.split("-")[1]}`}/${option.hair.split("-")[2]}.png`
                : `https://firebasestorage.googleapis.com/v0/b/intania-open-house.appspot.com/o/avatar%2Fhair%2F${`${option.hair.split("-")[0]}-${option.hair.split("-")[1]}`}%2F${option.hair.split("-")[2]}.png?alt=media`
            }
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[4]`}
            loading="eager"
          />
        </picture>
      )}
      {option.shirt && (
        <picture>
          <img
            src={
              useLocalImage
                ? `/assets/avatar/shirt/${`${option.shirt.split("-")[0]}-${option.shirt.split("-")[1]}`}/${option.shirt.split("-")[2]}.png`
                : `https://firebasestorage.googleapis.com/v0/b/intania-open-house.appspot.com/o/avatar%2Fshirt%2F${`${option.shirt.split("-")[0]}-${option.shirt.split("-")[1]}`}%2F${option.shirt.split("-")[2]}.png?alt=media`
            }
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 ${option.tucked ? "z-[5]" : "z-[6]"}`}
            loading="eager"
          />
        </picture>
      )}
      {option.pants && (
        <picture>
          <img
            src={
              useLocalImage
                ? `/assets/avatar/pants/${`${option.pants.split("-")[0]}-${option.pants.split("-")[1]}`}/${option.pants.split("-")[2]}.png`
                : `https://firebasestorage.googleapis.com/v0/b/intania-open-house.appspot.com/o/avatar%2Fpants%2F${`${option.pants.split("-")[0]}-${option.pants.split("-")[1]}`}%2F${option.pants.split("-")[2]}.png?alt=media`
            }
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 ${option.tucked ? "z-[6]" : "z-[5]"}`}
          />
        </picture>
      )}
      {option.shoes && (
        <picture>
          <img
            src={
              useLocalImage
                ? `/assets/avatar/shoes/${`${option.shoes.split("-")[0]}-${option.shoes.split("-")[1]}`}/${option.shoes.split("-")[2]}.png`
                : `https://firebasestorage.googleapis.com/v0/b/intania-open-house.appspot.com/o/avatar%2Fshoes%2F${`${option.shoes.split("-")[0]}-${option.shoes.split("-")[1]}`}%2F${option.shoes.split("-")[2]}.png?alt=media`
            }
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[7]`}
            loading="eager"
          />
        </picture>
      )}
      {option.outer && (
        <picture>
          <img
            src={
              useLocalImage
                ? `/assets/avatar/outer/${`${option.outer.split("-")[0]}-${option.outer.split("-")[1]}`}/${option.outer.split("-")[2]}.png`
                : `https://firebasestorage.googleapis.com/v0/b/intania-open-house.appspot.com/o/avatar%2Fouter%2F${`${option.outer.split("-")[0]}-${option.outer.split("-")[1]}`}%2F${option.outer.split("-")[2]}.png?alt=media`
            }
            alt="Avatar"
            className={`absolute bottom-0 left-0 right-0 z-[8]`}
            loading="eager"
          />
        </picture>
      )}
    </div>
  );
}
