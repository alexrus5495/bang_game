import { useDispatch } from "react-redux";
import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";
import { setCurrentLobby as setCurrentLobbyAction } from "../store/slices/currentLobbySlice";

export const useCurrentLobbyState = (): [string, (value: string) => void] => {
  const currentLobby = useAppSelector(
    (state: RootState) => state.currentLobbyId,
  );
  const dispatch = useDispatch();
  const setCurrentLobby = (value: string) => {
    dispatch(setCurrentLobbyAction(value));
  };

  return [currentLobby, setCurrentLobby];
};
