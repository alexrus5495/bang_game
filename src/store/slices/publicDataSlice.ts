import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PublicData } from "../../types";

export const publicDataSlice = createSlice({
  name: "publicData",
  initialState: null as PublicData | null,
  reducers: {
    setPublicData: (
      _state: PublicData | null,
      action: PayloadAction<PublicData>,
    ) => {
      return action.payload;
    },
  },
});

export const { setPublicData } = publicDataSlice.actions;

export default publicDataSlice.reducer;
