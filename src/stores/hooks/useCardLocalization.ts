import { useLocaleStore } from "../localeStore";

export interface CardTranslation {
  title: string;
  desc?: string;
}

const DEFAULT_CARD: CardTranslation = {
  title: "...",
  desc: "...",
};

export const useCardLocalization = (
  packId: string,
  cardId: string,
): CardTranslation => {
  const cardData = useLocaleStore((s) => {
    const pack = s.localizationData?.cards?.[packId] as
      | Record<string, CardTranslation>
      | undefined;
    return pack?.[cardId];
  });

  return cardData ?? DEFAULT_CARD;
};
