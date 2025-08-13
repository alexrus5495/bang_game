import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";

export const useCurrentLobbyState = () => {
  return useAppSelector((state: RootState) => state.currentLobbyId);
};
