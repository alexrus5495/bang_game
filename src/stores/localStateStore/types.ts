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
};

export type CardInitialData = {
  cardId: string;
  initialHeight: number;
  initialX: number;
  initialY: number;
};

export type PlayedCard = CardInitialData & {
  offsetX: number;
  offsetY: number;
  rotation: number;
};
