import { useLocaleStore } from "../localeStore";
import { useShallow } from "zustand/shallow";

export const useCardLocalization = (packId: string, cardId: string) => {
  return useLocaleStore(
    useShallow((s) => {
      const cardData = s.localizationData?.cards?.[packId]?.[cardId];
      return {
        title: cardData?.title ?? "fail",
        desc: cardData?.desc ?? "fail",
      };
    }),
  );
};
