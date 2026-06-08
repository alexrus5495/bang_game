import { create } from "zustand";
import type { CardsMetaData } from "../types";

interface CardsMetaState {
  data: CardsMetaData | null;
  setCardsMeta: (cardsMeta: CardsMetaData) => void;
}

export const useCardsMetaStore = create<CardsMetaState>()((set) => ({
  data: null,
  setCardsMeta: (cardsMeta) => set({ data: cardsMeta }),
}));
