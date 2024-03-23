export const optionName = {
  base: "ร่างกาย",
  eyes: "ตา",
  eyebrows: "คิ้ว",
  hair: "ผม",
  shirt: "เสื้อ",
  pants: "กางเกง",
  outer: "เสื้อคลุม",
  shoes: "รองเท้า",
};

export const optionImages = {
  base: ["1", "2", "3", "4", "5"],
  hair: ["1-brown"],
  eyes: [
    "1-black",
    "1-blue",
    "1-brown",
    "1-green",
    "1-grey",
    "1-pink",
    "4",
    "5",
    "6",
  ],
  eyebrows: ["1", "2", "3"],
  shirt: ["1-black", "1-grey", "1-red", "1-white"],
  pants: ["1-jeans"],
  outer: ["1"],
  shoes: ["1"],
};

export const initialOption = {
  base: optionImages.base[0],
  hair: optionImages.hair[0],
  eyes: optionImages.eyes[0],
  eyebrows: optionImages.eyebrows[0],
  shirt: optionImages.shirt[0],
  pants: optionImages.pants[0],
  outer: optionImages.outer[0],
  shoes: optionImages.shoes[0],
};
