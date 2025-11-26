import { configureStore } from "@reduxjs/toolkit";

//Import of the reducers
import localeReducer from "./slices/localeSlice";
import currentPageReducer from "./slices/currentPageSlice";
import currentLobbyReducer from "./slices/currentLobbySlice.ts";
import cardsMetaSlice from "./slices/cardsMetaSlice.ts";
import publicDataSlice from "./slices/publicDataSlice.ts";
import messagesSlice from "./slices/messagesSlice.ts";

export const store = configureStore({
  reducer: {
    locale: localeReducer,
    currentPage: currentPageReducer,
    currentLobbyId: currentLobbyReducer,
    cardsMetaData: cardsMetaSlice,
    publicData: publicDataSlice,
    messages: messagesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
