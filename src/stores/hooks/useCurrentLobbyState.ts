import { useCurrentLobbyStore } from "..//currentLobbyStore";

export const useCurrentLobbyState = (): [string, (value: string) => void] => {
  const currentLobby = useCurrentLobbyStore((s) => s.lobbyId);
  const setCurrentLobby = useCurrentLobbyStore((s) => s.setCurrentLobby);

  return [currentLobby, setCurrentLobby];
};
