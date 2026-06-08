import { create } from "zustand";
import type { CurrentPage } from "../types";

interface CurrentPageState {
  page: CurrentPage;
  setCurrentPage: (page: CurrentPage) => void;
}

export const useCurrentPageStore = create<CurrentPageState>()((set) => ({
  page: "mainMenu",
  setCurrentPage: (page) => set({ page }),
}));
