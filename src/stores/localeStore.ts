import { create } from "zustand";
import type {
  CardsLocalizationData,
  LocaleCode,
  LocalizationData,
} from "../locales/types";
import { CARDPACKS } from "../config/cardpacks";

interface LocaleState {
  currentLocale: LocaleCode;
  localizationData: LocalizationData | null;
  isLoading: boolean;
  error: string | null;
  setLocale: (localeCode: LocaleCode) => void;
  clearLocalizationData: () => void;
  loadLocalization: (localeCode: LocaleCode) => Promise<void>;
}

const loadCardsLocales = async (
  localeCode: LocaleCode,
): Promise<CardsLocalizationData> => {
  const cardPacks = await Promise.all(
    CARDPACKS.map(async (pack) => {
      const cards = await import(`../locales/${localeCode}/cards.${pack}.json`);
      return { [pack]: cards.default };
    }),
  );
  return cardPacks.reduce((acc, pack) => ({ ...acc, ...pack }), {});
};

const loadLocaleFiles = async (
  localeCode: LocaleCode,
): Promise<LocalizationData> => {
  const system = await import(`../locales/${localeCode}/system.json`);
  const cards = await loadCardsLocales(localeCode);
  return { system: system.default, cards };
};

export const useLocaleStore = create<LocaleState>()((set) => ({
  currentLocale: "enEN",
  localizationData: null,
  isLoading: false,
  error: null,

  setLocale: (localeCode) => set({ currentLocale: localeCode }),

  clearLocalizationData: () => set({ localizationData: null }),

  loadLocalization: async (localeCode) => {
    set({ isLoading: true, error: null });
    try {
      const localizationData = await loadLocaleFiles(localeCode);
      set({
        isLoading: false,
        currentLocale: localeCode,
        localizationData,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: `Failed to load localization for ${localeCode}: ${error}`,
      });
    }
  },
}));
