import { useAppSelector } from "../hooks/useAppSelector";
import type { RootState } from "../store/index";

export const useCardLocalization = (packId: string, cardId: string) => {
  return useAppSelector((state: RootState) => {
    const cardData =
      state.locale.localizationData?.cards?.[packId]?.[cardId] || {};

    console.log(state);
    return {
      title: cardData.title || "fail",
      desc: cardData.desc || "fail",
    };
  });
};
