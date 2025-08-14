import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const currentLobbySlice = createSlice({
  name: "currentLobby",
  initialState: "",
  reducers: {
    setCurrentLobby: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setCurrentLobby } = currentLobbySlice.actions;

export default currentLobbySlice.reducer;
