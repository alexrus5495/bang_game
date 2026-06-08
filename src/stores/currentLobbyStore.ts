import { create } from "zustand";

interface CurrentLobbyState {
  lobbyId: string;
  setCurrentLobby: (lobbyId: string) => void;
}

export const useCurrentLobbyStore = create<CurrentLobbyState>()((set) => ({
  lobbyId: "",
  setCurrentLobby: (lobbyId) => set({ lobbyId }),
}));
