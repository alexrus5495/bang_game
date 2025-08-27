import { useCallback } from "react";
import type { RootState } from "../store";
import { setCardCoords as setCardCoordsAction } from "../store/slices/cardCoordsSlice";
import type { CardCoords } from "../types";
import { useAppDispatch, useAppSelector } from "./useAppSelector";

export const useCardCoordsState = (): [
  CardCoords,
  (updater: (prev: CardCoords) => CardCoords) => void,
] => {
  const cardCoords = useAppSelector((state: RootState) => state.cardCoords);
  const dispatch = useAppDispatch();

  const setCardCoords = useCallback(
    (updater: (prev: CardCoords) => CardCoords) => {
      dispatch(setCardCoordsAction(updater));
    },
    [dispatch],
  );

  return [cardCoords, setCardCoords];
};
