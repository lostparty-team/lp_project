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
  total: number;
};

export type Elixir = {
  elixir1: string;
  elixir1Level: number;
  elixir2: string;
  elixir2Level: number;
};

export type Elixirs = {
  helmet: Elixir;
  shoulder: Elixir;
  top: Elixir;
  pants: Elixir;
  gloves: Elixir;
  total: number;
};

export type Weapon = {
  level: string;
  refinement: string;
  advancedReforging: string;
};

export type MemberData = {
  itemLevel: number;
  engravings: Engraving[];
  ancientAccessoryCount: number;
  weapon: Weapon;
  gems: Gem;
  accessories: Accessories;
  relicAccessoryCount: number;
  enlightenmentStyle: string;
  transcendence: Transcendence;
  bracelet: string[];
  arkPassivePoints: number[];
  elixir: Elixirs;
};

export type Member = {
  id: number;
  name: string;
  data: MemberData;
  isBlacklisted: boolean;
};
