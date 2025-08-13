import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CardsMetaData } from "../../types";

export const cardsMetaSlice = createSlice({
  name: "cardsMeta",
  initialState: null as CardsMetaData | null,
  reducers: {
    setCardsMeta: (
      _state: CardsMetaData | null,
      action: PayloadAction<CardsMetaData>,
    ) => {
      return action.payload;
    },
  },
});

export const { setCardsMeta } = cardsMetaSlice.actions;

export default cardsMetaSlice.reducer;
