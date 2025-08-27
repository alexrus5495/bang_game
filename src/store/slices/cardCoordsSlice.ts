import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CardCoords } from "../../types";

const initialCoords = {
  topCard: {
    x: null,
    y: null,
    height: null,
  },
};

export const cardCoordsSlice = createSlice({
  name: "cardCoords",
  initialState: initialCoords as CardCoords,
  reducers: {
    setCardCoords: (
      state,
      action: PayloadAction<CardCoords | ((prev: CardCoords) => CardCoords)>,
    ) => {
      if (typeof action.payload === "function") {
        return action.payload(state);
      }
      return action.payload;
    },
  },
});

export const { setCardCoords } = cardCoordsSlice.actions;

export default cardCoordsSlice.reducer;
