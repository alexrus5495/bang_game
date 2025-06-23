import type { LOCALES } from "./locales";

export type LocaleCode = (typeof LOCALES)[number];

export type LocalizationData = {
  system: {
    [key: string]: string;
  };
  cards: CardsLocalizationData;
};

export type CardsLocalizationData = {
  [packId: string]: {
    [cardId: string]: {
      [field: string]: string;
    };
  };
};
