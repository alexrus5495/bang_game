import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CurrentPage } from "../../types";

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: "mainMenu",
  reducers: {
    setCurrentPage: (_state, action: PayloadAction<CurrentPage>) => {
      return action.payload;
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
