import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CurrentLobbyId } from "../../types";

export const currentLobbySlice = createSlice({
  name: "currentLobby",
  initialState: "",
  reducers: {
    setCurrentLobby: (_state, action: PayloadAction<CurrentLobbyId>) => {
      return action.payload;
    },
  },
});

export const { setCurrentLobby } = currentLobbySlice.actions;

export default currentLobbySlice.reducer;
