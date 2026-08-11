import { useMemo } from "react";
import { useLocaleStore } from "../stores/localeStore";

export interface CardTranslation {
  title: string;
  desc?: string;
}

export type InterpolationParams = Record<string, string | number>;

const DEFAULT_CARD: CardTranslation = {
  title: "...",
  desc: "...",
};

export type TranslateFn = ReturnType<typeof useTranslation>;

export const useTranslation = () => {
  const localizationData = useLocaleStore((s) => s.localizationData);

  const t = useMemo(() => {
    // Main function: system strings with optional interpolation
    const translate = (key: string, params?: InterpolationParams): string => {
      const template = localizationData?.system?.[key] ?? key;

      if (!params) return template;

      return template.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return paramKey in params ? String(params[paramKey]) : match;
      });
    };

    // Method for getting card localization data {title, desc?}
    translate.card = (packId: string, cardId: string): CardTranslation => {
      const pack = localizationData?.cards?.[packId] as
        | Record<string, CardTranslation>
        | undefined;

      return pack?.[cardId] ?? { ...DEFAULT_CARD, title: cardId };
    };

    // Additional method when only particular field of card localization data is needed
    translate.cardField = (
      packId: string,
      cardId: string,
      field: keyof CardTranslation,
    ): string => {
      const card = translate.card(packId, cardId);
      return card[field] ?? "";
    };

    return translate;
  }, [localizationData]);

  return t;
};
