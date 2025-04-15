import { TFamily, FamilyNames } from "./types";
export const familyList: TFamily[] = [
  {
    name: "Yeom Je-ho",
    role: "Father",
    color: "bg-siblings-father",
    textColor: "text-siblings-father",
    image: "/assets/cast/My_Liberation_Notes-Cheon_Ho_Jin.jpg",
    colorHex: "border-[#BF894C]",
    bio: "Yeom Je-ho is the father of the Yeom family. He is a retired factory worker who struggles with his own sense of purpose and identity after retirement. He often feels disconnected from his family and longs for a sense of belonging.",
  },
  {
    name: "Kwak Hye-suk",
    role: "Mother",
    color: "bg-siblings-mother",
    textColor: "text-siblings-mother",
    image: "/assets/cast/My_Liberation_Notes-Lee_Kyung_Sung.jpg",
    colorHex: "border-[#DA4167]",
    bio: "Kwak Hye-suk is the mother of the Yeom family. She is a traditional housewife who has dedicated her life to her family. She often feels unappreciated and struggles with her own identity outside of being a mother and wife.",
  },
  {
    name: "Yeom Ki-jeong",
    role: "First Born Daughter",
    color: "bg-siblings-sister",
    textColor: "text-siblings-sister",
    image: "/assets/cast/My_Liberation_Notes-Lee_El01.jpg",
    colorHex: "border-[#871526]",
    bio: "Yeom Ki-jeong is the eldest daughter of the Yeom family. She works at a company and is known for her strong personality and independence. She often struggles with her feelings of loneliness and the pressure to conform to societal expectations.",
  },
  {
    name: "Yeom Chang-hee",
    role: "Second Born Son",
    color: "bg-siblings-brother",
    textColor: "text-siblings-brother",
    image: "/assets/cast/My_Liberation_Notes-Lee_Min_Ki1.jpg",
    colorHex: "border-[#6DB1BF]",
    bio: "Yeom Chang-hee is the second son of the Yeom family. He is a laid-back and carefree person who often avoids responsibility. He struggles with his own sense of purpose and often feels lost in life.",
  },
  {
    name: "Yeom Mi-jeong",
    role: "Last Born",
    color: "bg-siblings-lastborn",
    textColor: "text-siblings-lastborn",
    image: "/assets/cast/My_Liberation_Notes-Kim_Ji_Won.jpg",
    colorHex: "border-[#AB6D34]",
    bio: "Yeom Mi-jeong is the youngest daughter of the Yeom family. She is a quiet and introverted person who often feels misunderstood. She struggles with her own identity and often feels like an outsider in her own family.",
  },
  {
    name: "Mr. Gu",
    role: "Worker",
    color: "bg-siblings-gu",
    textColor: "text-siblings-gu",
    image: "/assets/cast/My_Liberation_Notes-Son_Suk_Ku.jpg",
    colorHex: "border-[#3D5A6C]",
    bio: "Mr. Gu is a mysterious and enigmatic character who works at the same factory as Yeom Je-ho. He is known for his stoic demeanor and often serves as a source of wisdom for the Yeom family. He struggles with his own past and often reflects on the meaning of life.",
  },
];

export const characterPathToImage = (character: FamilyNames) => {
  switch (character) {
    case "Yeom Je-ho":
      return "/assets/cast/Father.svg";

    case "Kwak Hye-suk":
      return "/assets/cast/Mother.svg";
    case "Yeom Ki-jeong":
      return "/assets/cast/Daughter1.svg";
    case "Yeom Chang-hee":
      return "/assets/cast/Son.svg";
    case "Yeom Mi-jeong":
      return "/assets/cast/lastborm.svg";
    case "Mr. Gu":
      return "/assets/cast/gu.svg";
    default:
      return "assets/cast/Father.svg";
  }
};
