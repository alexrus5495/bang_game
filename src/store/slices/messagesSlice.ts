import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Messages } from "../../types";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: null as Messages | null,
  reducers: {
    setMessages: (_state: Messages | null, action: PayloadAction<Messages>) => {
      return action.payload;
    },
  },
});

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
