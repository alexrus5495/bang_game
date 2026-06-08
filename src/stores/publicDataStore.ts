import { create } from "zustand";
import type { PublicData } from "../types";

interface PublicDataState {
  data: PublicData | null;
  setPublicData: (data: PublicData) => void;
}

export const usePublicDataStore = create<PublicDataState>()((set) => ({
  data: null,
  setPublicData: (data) => set({ data }),
}));
