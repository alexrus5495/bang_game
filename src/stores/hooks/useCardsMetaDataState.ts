import { useCardsMetaStore } from "../cardsMetaStore";
import type { CardsMetaData } from "../../types";

export const useCardsMetaDataState = (): [
  CardsMetaData | null,
  (data: CardsMetaData) => void,
] => {
  const cardsMeta = useCardsMetaStore((s) => s.data);
  const setCardsMeta = useCardsMetaStore((s) => s.setCardsMeta);

  return [cardsMeta, setCardsMeta];
};
