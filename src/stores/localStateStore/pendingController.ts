import type { StateCreator } from "zustand";
import type { LocalState } from "../localStateStore";

export type PendingController = {
  set: (id: string | null) => void;
};

export const createPendingController: StateCreator<
  LocalState,
  [],
  [],
  PendingController
> = (set) => ({
  set: (id) => set({ pendingCardId: id }),
});
