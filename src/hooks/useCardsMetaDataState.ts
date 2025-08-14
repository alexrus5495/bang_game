import type { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "./useAppSelector";
import { setCardsMeta as setCardsMetaAction } from "../store/slices/cardsMetaSlice";
import type { CardsMetaData } from "../types";

export const useCardsMetaDataState = (): [
  CardsMetaData | null,
  (data: CardsMetaData) => void,
] => {
  const cardsMeta = useAppSelector((state: RootState) => state.cardsMetaData);
  const dispatch = useAppDispatch();
  const setCardsMeta = (data: CardsMetaData) =>
    dispatch(setCardsMetaAction(data));

  return [cardsMeta, setCardsMeta];
};
