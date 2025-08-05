import { useMemo } from "react";
import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";

export const useCurrentLobbyState = () => {
  const currentLobby = useAppSelector(
    (state: RootState) => state.currentLobbyId,
  );

  return useMemo(() => {
    return currentLobby ? currentLobby : "fail";
  }, [currentLobby]);
};
