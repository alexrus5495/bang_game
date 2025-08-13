import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";

export const useCardsMetaDataState = () => {
  return useAppSelector((state: RootState) => state.cardsMetaData);
};
