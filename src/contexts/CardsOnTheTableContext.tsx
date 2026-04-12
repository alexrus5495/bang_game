import { createContext, useContext, useState } from "react";

export type PlayedCard = CardInitialData & {
  offsetX: number;
  offsetY: number;
  rotation: number;
};

export type CardInitialData = {
  cardId: string;
  initialHeight: number;
  initialX: number;
  initialY: number;
};

interface CardsOnTheTableContextType {
  cardsOnTheTable: PlayedCard[];
  setCardsOnTheTable: React.Dispatch<React.SetStateAction<PlayedCard[]>>;
  addCard: (initialData: CardInitialData) => void;
}

const CardsOnTheTableContext = createContext<
  CardsOnTheTableContextType | undefined
>(undefined);

export function CardsOnTheTableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cardsOnTheTable, setCardsOnTheTable] = useState<PlayedCard[]>([]);

  const addCard = (initialData: CardInitialData) => {
    const newCard: PlayedCard = {
      ...initialData,
      offsetX: Math.floor(Math.random() * 17) - 8, //Random values from -8 to +8
      offsetY: Math.floor(Math.random() * 17) - 8,
      rotation: Math.floor(Math.random() * 17) - 8,
    };

    setCardsOnTheTable((prev) => [...prev, newCard]);
  };

  const contextValue = {
    cardsOnTheTable,
    setCardsOnTheTable,
    addCard,
  };

  return (
    <CardsOnTheTableContext.Provider value={contextValue}>
      {children}
    </CardsOnTheTableContext.Provider>
  );
}

export function useCardsOnTheTableContext() {
  const context = useContext(CardsOnTheTableContext);
  if (context === undefined) {
    throw new Error("must be used within CardsOnTheTableProvider");
  }
  return context;
}
