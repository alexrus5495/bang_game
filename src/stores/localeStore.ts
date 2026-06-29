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

interface LocaleLoaderRegistry {
  system: () => Promise<{ default: Record<string, string> }>;
  cards: Record<string, () => Promise<{ default: Record<string, unknown> }>>;
}

// Static registry containing explicit string literal imports for each locale and card pack.
// This allows the bundler to successfully apply code-splitting to JSON translation assets.
const LOCALE_REGISTRY: Record<LocaleCode, LocaleLoaderRegistry> = {
  enEN: {
    system: () => import("../locales/enEN/system.json"),
    cards: {
      base: () => import("../locales/enEN/cards.base.json"),
    },
  },
};

const loadCardsLocales = async (
  localeCode: LocaleCode,
): Promise<CardsLocalizationData> => {
  const registry = LOCALE_REGISTRY[localeCode];
  if (!registry) {
    throw new Error(
      `[Locale Error]: Static registry entry not found for locale "${localeCode}".`,
    );
  }

  const cardPacks = await Promise.all(
    CARDPACKS.map(async (pack) => {
      const loadPackJson = registry.cards[pack];

      if (!loadPackJson) {
        throw new Error(
          `[Locale Error]: Missing translation loader for pack "${pack}" in locale "${localeCode}".`,
        );
      }

      const cards = await loadPackJson();
      return { [pack]: cards.default };
    }),
  );

  return cardPacks.reduce((acc, pack) => ({ ...acc, ...pack }), {});
};

const loadLocaleFiles = async (
  localeCode: LocaleCode,
): Promise<LocalizationData> => {
  const registry = LOCALE_REGISTRY[localeCode];
  if (!registry) {
    throw new Error(
      `[Locale Error]: Static registry entry not found for locale "${localeCode}".`,
    );
  }

  // Load system translation file and cards translation files concurrently using static paths
  const [system, cards] = await Promise.all([
    registry.system(),
    loadCardsLocales(localeCode),
  ]);

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
