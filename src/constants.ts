import { TFamily, FamilyNames } from "./types";
export const familyList: TFamily[] = [
  {
    name: "Yeom Je-ho",
    role: "Father",
    color: "bg-siblings-father",
    textColor: "text-siblings-father",
    colorHexVal: "#BF894C",
    image: "/assets/cast/Father.svg",
    colorHex: "border-[#BF894C]",
    bio: "Yeom Je-ho is the father of the Yeom family. He is a retired factory worker who struggles with his own sense of purpose and identity after retirement. He often feels disconnected from his family and longs for a sense of belonging.",
  },
  {
    name: "Kwak Hye-suk",
    role: "Mother",
    color: "bg-siblings-mother",
    textColor: "text-siblings-mother",
    image: "/assets/cast/Mother.svg",
    colorHex: "border-[#DA4167]",
    colorHexVal: "#DA4167",
    bio: "Kwak Hye-suk is the mother of the Yeom family. She is a traditional housewife who has dedicated her life to her family. She often feels unappreciated and struggles with her own identity outside of being a mother and wife.",
  },
  {
    name: "Yeom Gi-Jeong",
    role: "First Born Daughter",
    color: "bg-siblings-sister",
    textColor: "text-siblings-sister",
    image: "/assets/cast/Daughter1.svg",
    colorHex: "border-[#871526]",
    colorHexVal: "#871526",
    bio: "Yeom Ki-jeong is the eldest daughter of the Yeom family. She works at a company and is known for her strong personality and independence. She often struggles with her feelings of loneliness and the pressure to conform to societal expectations.",
  },
  {
    name: "Yeom Chang-hee",
    role: "Second Born Son",
    color: "bg-siblings-brother",
    textColor: "text-siblings-brother",
    image: "/assets/cast/Son.svg",
    colorHex: "border-[#6DB1BF]",
    colorHexVal: "#6DB1BF",
    bio: "Yeom Chang-hee is the second son of the Yeom family. He is a laid-back and carefree person who often avoids responsibility. He struggles with his own sense of purpose and often feels lost in life.",
  },
  {
    name: "Yeom Mi-Jeong",
    role: "Last Born",
    color: "bg-siblings-lastborn",
    textColor: "text-siblings-lastborn",
    image: "/assets/cast/lastborm.svg",
    colorHex: "border-[#AB6D34]",
    colorHexVal: "#AB6D34",
    bio: "Yeom Mi-jeong is the youngest daughter of the Yeom family. She is a quiet and introverted person who often feels misunderstood. She struggles with her own identity and often feels like an outsider in her own family.",
  },
  {
    name: "Mr. Gu",
    role: "Worker",
    color: "bg-siblings-gu",
    textColor: "text-siblings-gu",
    image: "/assets/cast/gu.svg",
    colorHex: "border-[#3D5A6C]",
    colorHexVal: "#3D5A6C",
    bio: "Mr. Gu is a mysterious and enigmatic character who works at the same factory as Yeom Je-ho. He is known for his stoic demeanor and often serves as a source of wisdom for the Yeom family. He struggles with his own past and often reflects on the meaning of life.",
  },
];

export const characterPathToImage = (character: FamilyNames) => {
  switch (character) {
    case "Yeom Je-ho":
      return "/assets/cast/Father.svg";

    case "Kwak Hye-suk":
      return "/assets/cast/Mother.svg";
    case "Yeom Gi-Jeong":
      return "/assets/cast/Daughter1.svg";
    case "Yeom Chang-hee":
      return "/assets/cast/Son.svg";
    case "Yeom Mi-Jeong":
      return "/assets/cast/lastborm.svg";
    case "Mr. Gu":
      return "/assets/cast/gu.svg";
    default:
      return "assets/cast/Father.svg";
  }
};

export const actorSentiments = [
  {
    "Yeom Je-ho": {
      positive: 9.4,
      negative: -4.6,
      wordcount: 8,
    },
    "Kwak Hye-suk": {
      positive: 47.9,
      negative: -100.8,
      wordcount: 218,
    },
    "Yeom Gi-Jeong": {
      positive: 233,
      negative: -311.1,
      wordcount: 842,
    },
    "Yeom Chang-hee": {
      positive: 262.5,
      negative: -423.5,
      wordcount: 1078,
    },
    "Yeom Mi-Jeong": {
      positive: 144,
      negative: -137.4,
      wordcount: 358,
    },
    "Mr. Gu": {
      positive: 10,
      negative: 0,
      wordcount: 7,
    },
  },
  {
    "Yeom Je-ho": {
      positive: 13.6,
      negative: -4.8,
      wordcount: 27,
    },
    "Kwak Hye-suk": {
      positive: 52.4,
      negative: -130.2,
      wordcount: 305,
    },
    "Yeom Ki-jeong": {
      positive: 136.8,
      negative: -204.5,
      wordcount: 498,
    },
    "Yeom Chang-hee": {
      positive: 160.1,
      negative: -206,
      wordcount: 526,
    },
    "Yeom Mi-Jeong": {
      positive: 169.8,
      negative: -246.9,
      wordcount: 530,
    },
    "Mr. Gu": {
      positive: 13.2,
      negative: -10,
      wordcount: 20,
    },
  },
  {
    "Yeom Je-ho": {
      positive: 0,
      negative: 0,
      wordcount: 0,
    },
    "Kwak Hye-suk": {
      positive: 5,
      negative: -37.2,
      wordcount: 54,
    },
    "Yeom Gi-jeong": {
      positive: 326.6,
      negative: -385.9,
      wordcount: 1053,
    },
    "Yeom Chang-hee": {
      positive: 174,
      negative: -349.5,
      wordcount: 801,
    },
    "Yeom Mi-Jeong": {
      positive: 146.1,
      negative: -256.3,
      wordcount: 497,
    },
    "Mr. Gu": {
      positive: 18.3,
      negative: -82.4,
      wordcount: 127,
    },
  },
];
