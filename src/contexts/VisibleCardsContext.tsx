import { createContext, useContext, useState, type ReactNode } from "react";

type PlayersVisibleCards = {
  equipment: string[];
  hand: string[];
};

type VisibleCardsType = Record<string, PlayersVisibleCards>;

type VisibleCardsContextType = {
  visibleCards: VisibleCardsType;
  getPlayer: (playerId: string) => PlayersVisibleCards | null;
  addToHand: (playerId: string, cardId: string) => void;
  addToEquipment: (playerId: string, cardId: string) => void;
};

const VisibleCardsContext = createContext<VisibleCardsContextType | null>(null);

export function VisibleCardsProvider({ children }: { children: ReactNode }) {
  const [visibleCards, setVisibleCards] = useState<VisibleCardsType>({});

  const getPlayer = (playerId: string) => {
    if (visibleCards[playerId]) {
      return visibleCards[playerId];
    } else {
      return null;
    }
  };

  const addToHand = (playerId: string, cardId: string) => {
    setVisibleCards((prev) => {
      const player = prev[playerId] ?? {
        equipment: [],
        hand: [],
      };

      return {
        ...prev,
        [playerId]: {
          ...player,
          hand: [...player.hand, cardId],
        },
      };
    });
  };

  const addToEquipment = (playerId: string, cardId: string) => {
    setVisibleCards((prev) => {
      const player = prev[playerId] ?? {
        equipment: [],
        hand: [],
      };

      return {
        ...prev,
        [playerId]: {
          ...player,
          equipment: [...player.equipment, cardId],
        },
      };
    });
  };

  return (
    <VisibleCardsContext.Provider
      value={{ visibleCards, getPlayer, addToHand, addToEquipment }}
    >
      {children}
    </VisibleCardsContext.Provider>
  );
}

export function useVisibleCards() {
  const context = useContext(VisibleCardsContext);

  if (!context) {
    throw new Error("useVisibleCards must be used within VisibleCardsProvider");
  }

  return context;
}
