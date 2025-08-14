import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  CardsLocalizationData,
  LocaleCode,
  LocalizationData,
} from "../../locales/types";
import { CARDPACKS } from "../../config/cardpacks";

interface LocaleState {
  currentLocale: LocaleCode;
  localizationData: LocalizationData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LocaleState = {
  currentLocale: "enEN",
  localizationData: null,
  isLoading: false,
  error: null,
};

//Dynamically load localization files for a given locale
const loadLocaleFiles = async (
  localeCode: LocaleCode,
): Promise<LocalizationData> => {
  //NOTE: All locale files would be added below
  const system = await import(`../../locales/${localeCode}/system.json`);
  const cards = await loadCardsLocales(localeCode);

  return {
    system: system.default,
    cards,
  };
};

const loadCardsLocales = async (
  localeCode: LocaleCode,
): Promise<CardsLocalizationData> => {
  const cardPacks = await Promise.all(
    CARDPACKS.map(async (pack) => {
      const cards = await import(
        `../../locales/${localeCode}/cards.${pack}.json`
      );
      return { [pack]: cards.default };
    }),
  );

  return cardPacks.reduce((acc, pack) => ({ ...acc, ...pack }), {});
};

export const loadLocalization = createAsyncThunk(
  "locale/loadLocalization",
  async (localeCode: LocaleCode) => {
    try {
      const localizationData = await loadLocaleFiles(localeCode);
      return { localeCode, localizationData };
    } catch (error) {
      throw new Error(
        `Failed to load localization for ${localeCode}: ${error}`,
      );
    }
  },
);

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<LocaleCode>) => {
      state.currentLocale = action.payload;
    },
    clearLocalizationData: (state) => {
      state.localizationData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLocalization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadLocalization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentLocale = action.payload.localeCode;
        state.localizationData = action.payload.localizationData;
      })
      .addCase(loadLocalization.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Error while loading localization";
      });
  },
});

export const { setLocale, clearLocalizationData } = localeSlice.actions;

export default localeSlice.reducer;
