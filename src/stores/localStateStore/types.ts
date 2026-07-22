export type ClientPlayer = {
  id: string;
  isAI: boolean;
  nickname: string;
  color: string;
  role: string;
  char: string;
  hand: string[];
  weapon: {
    card: string;
    range: number;
  };
  equipment: string[];
  flags: {
    isEliminated: boolean;
    isUnderSight: boolean;
  };
  stats: {
    health: { current: number; max: number };
  };
  handValidationData: CardValidationData[] | null;
};

export type CardValidationData = {
  cardId: string;
  canPlay: boolean;
  target: "self" | "many" | "one" | "all";
  possibleTargets: string[] | null;
};
