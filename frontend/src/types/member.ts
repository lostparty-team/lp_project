export type Engraving = {
  name: string;
  grade: string;
  gradeLevel: number;
  abilityStoneLevel: number | null;
};

export type Gem = {
  [key: string]: number;
};

export type Accessories = {
  upperGeneralCount: number;
  upperSpecialCount: number;
  middleGeneralCount: number;
  middleSpecialCount: number;
  lowerGeneralCount: number;
  lowerSpecialCount: number;
};

export type Transcendence = {
  shoulder: string;
  weapon: string;
  top: string;
  gloves: string;
  helmet: string;
  pants: string;
};

export type Bracelet = string[];

export type Member = {
  name: string;
  level: number;
  itemLevel: number;
  engravings: Engraving[];
  ancientAccessoryCount: number;
  weaponLevel: string;
  gems: Gem;
  isBlacklisted: boolean;
  accessories: Accessories;
  relicAccessoryCount: number;
  classEngraving: string;
  transcendence: Transcendence;
  bracelet: Bracelet;
  arkPassivePoints: number[];
};
