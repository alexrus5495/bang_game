import { useAppSelector } from "../hooks/useAppSelector";
import { useMemo } from "react";
import type { RootState } from "../store/index";

export const useCardLocalization = (packId: string, cardId: string) => {
  const cardData = useAppSelector(
    (state: RootState) =>
      state.locale.localizationData?.cards?.[packId]?.[cardId],
  );

  return useMemo(() => {
    return {
      title: cardData?.title || "fail",
      desc: cardData?.desc || "fail",
    };
  }, [cardData?.title, cardData?.desc]);
};
